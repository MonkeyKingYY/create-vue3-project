#### multiple-search 带多选功能的搜索框框组件 文档

基本使用

- `type="multiple-search"` 必传
- `url` 接口路径，必传
- `searchContent` 模糊查询接口所需的查询参数，这里的值为查询接口时，接口的查询参数 key 值，必传
- `:response-handler="responseHandler"` 必传 responseHandler 为接口响应后的数据处理函数，valueCode 为选择框的唯一 key，一般对应数据的 id，valueName 为选择框的名称，一般对应数据的 name

```vue
<template>
	<form-item
		type="multiple-search"
		search-content="name"
		url="/sales/building/directory/selectBuildingListByName"
		:response-handler="responseHandler"
		v-model="dataRef.list"
	/>
</template>

<script>
export default {
	setup() {
		const dataRef = reactive({
			list: [],
		})

		function responseHandler(result) {
			// result 为接口返回的数据
			// 组件不关注接口的数据结构，只需result.data.rows为 [{valueCode:'',valueName: ''}]，对象里的其他属性根据具体的业务场景可添加
			result.data.rows = result.data.list.map((item) => {
				return {
					valueCode: item.id, // 必传
					valueName: item.name, // 必传
					bizid: item.bizid, // 可选
				}
			})
			return result
		}
		return { dataRef, responseHandler }
	},
}
</script>
```

基本使用

- `method`请求方式，默认 get，可选择 get|post

```vue
<template>
	<form-item
		type="multiple-search"
		method="get"
		search-content="name"
		url="/sales/building/directory/selectBuildingListByName"
		:response-handler="responseHandler"
		v-model="dataRef.list"
	/>
</template>

<script>
export default {
	setup() {
		const dataRef = reactive({
			list: [],
		})

		function responseHandler(result) {
			// result 为接口返回的数据
			// 组件不关注接口的数据结构，只需result.data.rows为 [{valueCode:'',valueName: ''}]，对象里的其他属性根据具体的业务场景可添加
			result.data.rows = result.data.list.map((item) => {
				return {
					valueCode: item.id, // 必传
					valueName: item.name, // 必传
					bizid: item.bizid, // 可选
				}
			})
			return result
		}
		return { dataRef, responseHandler }
	},
}
</script>
```

基本使用

- `params` 接口所需的额外参数

```vue
<template>
	<form-item
		type="multiple-search"
		:params="{ type: 2, time: tiemRef }"
		search-content="name"
		url="/sales/building/directory/selectBuildingListByName"
		:response-handler="responseHandler"
		v-model="dataRef.list"
	/>
</template>

<script>
export default {
	setup() {
		const dataRef = reactive({
			list: [],
		})

		function responseHandler(result) {
			// result 为接口返回的数据
			// 组件不关注接口的数据结构，只需result.data.rows为 [{valueCode:'',valueName: ''}]，对象里的其他属性根据具体的业务场景可添加
			result.data.rows = result.data.list.map((item) => {
				return {
					valueCode: item.id, // 必传
					valueName: item.name, // 必传
					bizid: item.bizid, // 可选
				}
			})
			return result
		}

		const tiemRef = ref('2020-2-2')
		return { dataRef, responseHandler, tiemRef }
	},
}
</script>
```

基本使用

- `page-size` 每次返回的条数限制 ，默认 15

```vue
<template>
	<form-item
		type="multiple-search"
		page-size="20"
		method="get"
		search-content="name"
		url="/sales/building/directory/selectBuildingListByName"
		:response-handler="responseHandler"
		v-model="dataRef.list"
	/>
</template>

<script>
export default {
	setup() {
		const dataRef = reactive({
			list: [],
		})
		return { dataRef }
	},
}
</script>
```

基本使用

- `before-send` 发送请求前的处理，返回请求的参数，以 json 格式返回
- `change` 绑定 change 事件

```vue
<template>
	<form-item
		type="multiple-search"
		method="get"
		search-content="name"
		:before-send="beforeSend"
		page-size="20"
		@change="change"
		url="/sales/building/directory/selectBuildingListByName"
		:response-handler="responseHandler"
		v-model="dataRef.list"
	/>
</template>

<script>
export default {
	setup() {
		const dataRef = reactive({
			list: [],
		})

		function beforeSend(param) {
			console.log(param) //当前请求的参数 -- 可作出改变
			return param //将改变后的请求参数return
		}

		function change(data) {
			console.log(data) //{valueCode:"123",valueName:"显示名字"}
		}

		return { dataRef, beforeSend, change }
	},
}
</script>
```

基本使用

- `liveSearchRef.rollback()` 清空组件状态

```vue
<template>
	<form-item type="live-search" url="/bdc/search/buildNames" v-model:id="dataRef.id" @load="liveSearchRef = $event" />

	<button type="button" @click="restoreLiveSearchFn">重新初始化动态搜索组件</button>
</template>

<script>
export default {
	setup() {
		const dataRef = reactive({})

		const liveSearchRef = ref({})

		const restoreLiveSearchFn = () => {
			liveSearchRef.value.rollback()
		}

		return { dataRef, liveSearchRef, restoreLiveSearchFn }
	},
}
</script>
```

基本使用

- `responseHandler` 处理请求回来的数据

如果后台接口返回的数据不是如下格式的数据,需要通过`responseHandler`函数进行转换

```
{
    code:0,
    data:{
        rows:[{valueCode:"123",valueName:"显示名字"}],
        totalcount: 1000
    },
    msg:""
}
```

```vue
<template>
	<form-item
		type="multiple-search"
		method="get"
		search-content="name"
		:before-send="beforeSend"
		page-size="20"
		method="get"
		@change="change"
		url="/sales/building/directory/selectBuildingListByName"
		:response-handler="responseHandler"
		v-model="dataRef.list"
	/>
</template>

<script>
export default {
	setup() {
		const dataRef = reactive({
			id: '123',
			name: 'abc',
		})

		function beforeSend(param) {
			console.log(param) //当前请求的参数 -- 可作出改变
			return param //将改变后的请求参数return  --注意:格式不能发生变化
		}

		function responseHandler(responseData) {
			console.log(param) //接口返回的数据 -- 可作出改变
			return responseData //将改变后的数据return   --注意:格式不能发生变化
		}

		return { dataRef, beforeSend, responseHandler }
	},
}
</script>
```
