### pic-viewer 图片预览组件

该组件不需要页面单独引入，已安装到全局

基础用法
```vue
<template>
        <pic-viewer :src="imgUrl">
            点击预览
        </pic-viewer>
</template>
<script setup>
export const imgUrl = 'http://path/to/a.jpg';
</script>
```

 - 组件内部使用 slot ，将用a标签包裹
