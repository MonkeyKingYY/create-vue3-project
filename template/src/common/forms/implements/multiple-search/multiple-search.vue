<template>
	<div class="container" tabindex="1" @focus="containerFocus" @blur="inutBlur">
		<div class="wrap" layout="row">
			<div layout="row" layout-wrap>
				<div class="select-item" v-for="item in selectedListRef" :key="item.valueCode">
					{{ item.valueName }}
					<a href="javascript:" class="remove-select-item" @click="removeSelect(item)"></a>
				</div>
			</div>
			<div flex style="min-width: 150px">
				<input
					type="search"
					:disabled="disabled"
					:readonly="disabled"
					@input="inputChange"
					:value="valueRef"
					@keydown.enter.prevent
					class="form-control"
					:placeholder="placeholder"
					ref="elementRef"
				/>
			</div>
		</div>
		<transition-group name="slide-down">
			<ul class="content-view no-result" v-if="showNoResultRef">
				<li>没有搜索到结果</li>
			</ul>
			<ul class="content-view" v-if="showContentRef && listRef.length" ref="viewRef" @scroll="handleScroll">
				<li
					v-for="(item, index) in listRef"
					:key="item.valueCode + index"
					:class="{ active: isSelected(item.valueCode) }"
					:ref="(el) => valueRef === item.valueName && scrollToSelfFn(el)"
					@click="chooseItem(item)"
				>
					<div class="checkbox">
						<input type="checkbox" :checked="isSelected(item.valueCode)" />
						<label>{{ item.valueName }}</label>
					</div>
				</li>
			</ul>
		</transition-group>
	</div>
</template>

<script>
import { nextTick, ref } from 'vue'
import { clone, get, post } from '../../../../util'
import { debounce } from '../../util'
import { registerValidate } from '../../form-validator'

export default {
	props: {
		id: [String, Number],
		name: String,
		url: String,
		modelValue: Object,
		searchContent: String,
		method: String,
		pageSize: Number,
		params: Object,
		beforeSend: Function,
		placeholder: {
			type: String,
			default: '请输入查询内容...',
		},
		responseHandler: Function,
		disabled: Boolean,
		readonly: Boolean,
		validateRule: Object,
	},
	setup(props, { emit }) {
		const valueRef = ref('') // 输入框内容
		const showContentRef = ref(false) // 是否显示容器的控制器
		const listRef = ref([]) // 数据列表
		const selectedListRef = ref([]) // 选择的数据列表
		const codeListRef = ref([]) // 选择的code列表
		const viewRef = ref() // 容器
		const showNoResultRef = ref(false) // 没有搜索结果的的控制器
		const elementRef = ref({})
		let currentPage = 1
		let _cacheParams = {}
		let canNext = true
		let canBlur = true

		registerValidate({ ref: elementRef, props, valueKey: 'id' }, 'name', valueRef)

		function inputChange(e) {
			valueRef.value = e.target.value
			if (valueRef.value !== '') {
				initQuery()
			} else {
				blur()
			}
		}

		const initQuery = debounce(function () {
			currentPage = 1
			listRef.value = []
			_cacheParams = {}
			selectScrollTop = liveScrollTop = 0
			let param = props.params || {}
			if (props.searchContent) {
				param[props.searchContent] = valueRef.value
			}

			query(param, currentPage, (searchTime = Date.now()))
		}, 200)

		let liveScrollTop, selectScrollTop

		function handleScroll(e) {
			let target = e.target
			if (target.scrollHeight - (target.scrollTop + target.clientHeight) < 10 && canNext) {
				canNext = false
				nextPage()
			}
			liveScrollTop = target.scrollTop
		}

		function chooseItem(item) {
			selectScrollTop = liveScrollTop
			if (isSelected(item.valueCode)) {
				removeSelect(item)
			} else {
				setValue(item)
			}
		}

		function nextPage() {
			return query(_cacheParams, currentPage + 1, (searchTime = Date.now()))
		}

		function setValue(value) {
			if (value) {
				selectedListRef.value.push(value)
				codeListRef.value.push(value.valueCode)
			}
			emit('update:modelValue', selectedListRef.value)
			emit('change', selectedListRef.value)
		}

		function removeSelect(item) {
			selectedListRef.value.map((listItem, index) => {
				if (listItem.valueCode === item.valueCode) {
					selectedListRef.value.splice(index, 1)
				}
			})
			codeListRef.value.splice(codeListRef.value.indexOf(item.valueCode), 1)
			emit('update:modelValue', selectedListRef.value)
			emit('change', selectedListRef.value)
		}

		function blur() {
			showContentRef.value = false
			showNoResultRef.value = false
		}

		function inutBlur(e) {
			valueRef.value = ''
			setTimeout(() => blur(), 100)
		}

		function containerFocus() {
			canBlur = false
		}

		function focus() {
			canBlur = true
			nextTick(() => {
				if (viewRef.value && selectScrollTop) {
					// 根据记录的位置信息，将打开的ul滚动条位置还原
					viewRef.value.scrollTop = selectScrollTop
				}
			})
		}

		let searchTime

		async function query(params, pageIndex = 1, now) {
			params = clone(params || {}) // clone
			params.pageSize = props.pageSize || 15
			showNoResultRef.value = false
			let getData
			if (props.url) {
				const ajax = props.method === 'get' ? get : post
				getData = (data) => ajax(props.url, data)
			} else if (typeof props.getData === 'function') {
				getData = props.getData
			}
			pageIndex = Math.abs(pageIndex)
			// params.currPage = pageIndex
			params.pageIndex = pageIndex
			if (typeof props.beforeSend === 'function') {
				params = props.beforeSend(params) || params
			}

			let result = await Promise.resolve(getData(params))

			if (typeof props.responseHandler === 'function') {
				result = props.responseHandler(result) || result
			}
			if (now !== searchTime) {
				return result
			}
			if (+result.code === 0) {
				showContentRef.value = true
				_cacheParams = params // 缓存参数
				const { rows, totalcount } = result.data || {}
				let totalPage = Math.ceil(totalcount / params.pageSize)
				// 设置组件数据
				listRef.value = [...listRef.value, ...(rows || [])]
				showNoResultRef.value = !listRef.value.length
				currentPage = pageIndex
				canNext = pageIndex < totalPage // 如果当前页还不是最后一页，则还可以允许继续请求
			} else {
				alert(result.msg)
			}

			return result
		}

		function scrollToSelfFn(el) {
			nextTick(() => {
				el && el.scrollIntoViewIfNeeded()
			})
		}

		// 还原重新初始化组件
		function rollback() {
			listRef.value = []
			codeListRef.value = []
			selectedListRef.value = []
			setValue()
		}

		function isSelected(code) {
			return codeListRef.value.includes(code)
		}

		return {
			valueRef,
			listRef,
			selectedListRef,
			viewRef,
			showContentRef,
			showNoResultRef,
			elementRef,
			scrollToSelfFn,
			chooseItem,
			blur,
			focus,
			inutBlur,
			inputChange,
			handleScroll,
			containerFocus,
			rollback,
			isSelected,
			removeSelect,
		}
	},
}
</script>
<style scoped lang="less">
ul,
li {
	padding: 0;
	margin: 0;
	list-style: none;
}

.container {
	position: relative;
	border: none;
	outline: none;

	.wrap {
		min-height: 30px;
		background: rgba(255, 255, 255, 1);
		border-radius: 3px;
		border: 1px solid rgba(226, 229, 242, 1);
		box-sizing: border-box;
		padding: 7px 15px 3px;
	}

	.form-control {
		display: block;
		width: 100%;
		height: 17px;
		font-size: 13px;
		line-height: 17px;
		border: none;
		outline: none;
		box-shadow: none;
		background: none;
		box-sizing: border-box;
	}

	.form-control:focus {
		outline: none;
	}

	.select-item {
		display: block;
		cursor: pointer;
		font-size: 13px;
		line-height: 17px;
		padding: 0 8px;
		background: rgba(243, 243, 244, 1);
		border-radius: 2px;
		margin-right: 4px;
		margin-bottom: 4px;
		color: #666666;
		white-space: nowrap;

		.remove-select-item {
			display: inline-block;
			background: url('/src/assets/del-icon.png') no-repeat;
			background-size: contain;
			width: 9px;
			height: 9px;
		}
	}
}

.content-view {
	width: 100%;
	max-height: 280px;
	overflow: auto;
	position: absolute;
	left: 0;
	top: 100%;
	margin-top: -1px;
	background: #fff;
	z-index: 9999;
	border: 1px solid #ccc;
	box-sizing: border-box;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
	border-radius: 0 0 5px 5px;

	&.no-result {
		pointer-events: none;
	}

	li {
		width: 100%;
		height: 32px;
		line-height: 32px;
		text-indent: 10px;
		cursor: pointer;

		&:hover {
			background: #e8e8e8;
		}

		&.active {
			color: #4377de;
		}

		.checkbox {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			label {
				cursor: pointer;
			}
		}

		input[type='checkbox'] {
			pointer-events: none;
			vertical-align: middle;
		}
	}
}
</style>
