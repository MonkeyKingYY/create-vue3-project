<template>
    <div class="container">
        <div class="top">
            <i>爱家 - VUE3组件库</i>
        </div>
        <div class="body" flex>
            <div class="left">
                <ul v-for="(item,idx) in list">
                    <li @click="currIndex = idx">{{item}}</li>
                </ul>
            </div>
            <div class="main">
                <component :is="'cpnt'+currIndex" />
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    ul,
    li {
        text-align: center;
        line-height: 26px;
    }
</style>






<script>
    import {
        onMounted,
        ref,
        reactive,
        computed,
        watch,
        watchEffect
    } from 'vue'
    import dateRanger from './components/datepicker.vue'
    import {
        modal
    } from "../common/modal/modal";
    import {
        useRoute,
        useRouter
    } from 'vue-router';
    import validates from "../common/forms/validates";

    import {
        get,
        fileUpload,
        post,
        singleThreadWrapFn
    } from "../util";
    import {
        dateCompare,
        deepClone,
        fun_date,
        groupBy
    } from "./common";

    export default {
        components: {
            cpnt0: dateRanger
        },

        setup() {

            let currIndex = 0;
            let list = ['日历控件'];
            return {
                currIndex,
                list
            }
        }
    }
</script>










<style scoped lang="less">
    i {
        font-style: normal;
    }

    div {
        background: #fff;

    }

    .top {
        padding: 12px 24px;
        border-bottom: 1px #dcdfe6 solid;

        i {
            font-size: 24px;
            line-height: 24px;
        }
    }

    .container {
        height: 100vh;
    }

    .body {
        display: flex;

        .left {
            width: 240px;
            border-right: 1px aliceblue solid;

            ul {
                li {
                    line-height: 42px;
                    cursor: pointer;
                    font-size: 14px;
                }

                li:hover {
                    color: #409eff;
                }
            }
        }

        .main {
            width: 100%;
            padding: 0 12px;
        }
    }
</style>
<style>
    h3 {
        display: block;
    }

    /**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

    code[class*="language-"],
    pre[class*="language-"] {
        color: black;
        background: none;
        text-shadow: 0 1px white;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 1em;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;

        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;

        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
    }

    pre[class*="language-"]::-moz-selection,
    pre[class*="language-"] ::-moz-selection,
    code[class*="language-"]::-moz-selection,
    code[class*="language-"] ::-moz-selection {
        text-shadow: none;
        background: #b3d4fc;
    }

    pre[class*="language-"]::selection,
    pre[class*="language-"] ::selection,
    code[class*="language-"]::selection,
    code[class*="language-"] ::selection {
        text-shadow: none;
        background: #b3d4fc;
    }

    @media print {

        code[class*="language-"],
        pre[class*="language-"] {
            text-shadow: none;
        }
    }

    /* Code blocks */
    pre[class*="language-"] {
        padding: 1em;
        margin: .5em 0;
        overflow: auto;
    }

    :not(pre)>code[class*="language-"],
    pre[class*="language-"] {
        background: #f5f2f0;
    }

    /* Inline code */
    :not(pre)>code[class*="language-"] {
        padding: .1em;
        border-radius: .3em;
        white-space: normal;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: slategray;
    }

    .token.punctuation {
        color: #999;
    }

    .token.namespace {
        opacity: .7;
    }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: #905;
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
        color: #690;
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
        color: #9a6e3a;
        /* This background color was intended by the author of this theme. */
        background: hsla(0, 0%, 100%, .5);
    }

    .token.atrule,
    .token.attr-value,
    .token.keyword {
        color: #07a;
    }

    .token.function,
    .token.class-name {
        color: #DD4A68;
    }

    .token.regex,
    .token.important,
    .token.variable {
        color: #e90;
    }

    .token.important,
    .token.bold {
        font-weight: bold;
    }

    .token.italic {
        font-style: italic;
    }

    .token.entity {
        cursor: help;
    }
</style>