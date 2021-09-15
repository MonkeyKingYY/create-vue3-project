<template>

        <h3>日期控件</h3>
        <form @submit.prevent="doQuery(dataRef)" ref="form">
            <div class="form-box" layout="row" layout-wrap>
               
                <form-interface label="date：">
                    <form-item type="date" v-model="dataRef.date" @change="change"/>
                </form-interface>
                <form-interface label="date-range：" flex="33">
                    <form-item type="date-range" v-model:start="dataRef.start" v-model:end="dataRef.end"
                               @change="change" :validate-rule="{required:true}"/>
                </form-interface>
            </div>
        </form>
		<h3>说明</h3>
		<pre class="line-numbers"><code class="language-javascript">
		组件参数:
	    start: 开始日期,
        end: 结束日期,
        startConfig: min:最小可选日期；
        endConfig: max: 最大可选日期；
        disabled: 是否可用,
        validateRule: 正则
	</code></pre>
<h3>JS</h3>
		<pre class="line-numbers"><code class="language-javascript" v-html="jsCode"></code></pre>
<h3>HTML</h3>
		<pre class="line-numbers"><code class="language-html" >{{htmlCode}}</code></pre>
</template>

<script>
import {reactive, ref, onMounted} from "vue";
import {singleThreadWrapFn} from "../../util";
import Prism from 'prismjs';
//import pcss from 'prismjs/themes/prism.css';

export default {
    setup() {
        const form = ref({});
        const pagingRef = ref({});
        const dataRef = reactive({
            text: "111",
            select: "3",
            select2: "",
            number: 123.12,
            "date": "",
            "start": "2020-07-18",
            "end": "",
            checkbox: ['1'],
            radio: "1",
            id: "3232",
            name: "name",
            pageSize: 20
        });
		
		let jsCode=`        const form = ref({});
        const pagingRef = ref({});
        const dataRef = reactive({
            text: "111",
            select: "3",
            select2: "",
            number: 123.12,
            "date": "",
            "start": "2020-07-18",
            "end": "",
            checkbox: ['1'],
            radio: "1",
            id: "3232",
            name: "name",
            pageSize: 20
        });
        return {
            dataRef, form, change, jsCode, htmlCode
        }`;
		
		let htmlCode=`
<form-interface label="date：">
	<form-item type="date" v-model="dataRef.date" @change="change"/>
</form-interface>
<form-interface label="date-range：" flex="33">
	<form-item type="date-range" v-model:start="dataRef.start" v-model:end="dataRef.end" @change="change" :validate-rule="{required:true}"/>
</form-interface>`;
		
		onMounted(()=>{
			htmlCode=Prism.highlight(htmlCode,Prism.languages.html,"html");
			jsCode=Prism.highlight(jsCode,Prism.languages.javascript,"javascript");
		});
        function change() {
        }

        // 触发查询
        const doQuery = singleThreadWrapFn(async (data) => {
            await pagingRef.value.query(data);
        });

        function changeParam() {
            dataRef.text = "已经发生改变";
            dataRef.number = 2;
            dataRef.checkbox = ["1", "4"];
            dataRef.select = "1";
            dataRef.radio = "1";
            dataRef.date = "2020-3-4";
            dataRef.start = "2020-5-6";
            dataRef.end = "2020-6-7";
            dataRef.id = "3232";
            dataRef.name = "name";
        }


        return {
            dataRef, form, change, jsCode, htmlCode
        }
    }
}
</script>

<style scoped lang="less">
	i{
		font-style: normal;
	}
	div{
		background: #fff;
		
	}
	.top{
		padding: 12px 24px;
		border-bottom: 1px #dcdfe6 solid;
		i{
			font-size: 24px;
			line-height: 24px;
		}
	}
	
.form-item {
    padding: 10px 15px;

    label {
        display: block;
        width: 100px;
        text-align: right;
    }

    .split {
        padding: 0 5px;
    }
}
</style>
