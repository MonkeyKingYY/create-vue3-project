<template>
    <div class="mouse-show-pic" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <slot/>
        <div class="mouse-show-pic-img" v-if="show">
            <img :src="`${src}.500x370.jpg`" draggable="false"
                 class="" alt="" width="500" height="375">
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';

export default {
    props: ['src'],
    setup() {
        const show = ref(false);

        const mouseenter = () => {
            show.value = true;
        };
        const mouseleave = () => {
            show.value = false;
        };

        return {
            show, mouseenter, mouseleave
        }
    }
}
</script>

<style scoped lang="less">
.mouse-show-pic {
    position: relative;

    .mouse-show-pic-img {
        position: absolute;
        bottom: 0;
        left: 100%;
        border: 1px solid #000;
        background: #ffffff;
    }
}
</style>
