<template>
    <a href="javascript:" @click="openViewerFn(src)">
        <slot/>
    </a>
</template>

<script>
    import {onUnmounted} from 'vue';

    export default {
        props: ['src'],
        setup() {
            let removeViewer;

            async function openViewerFn(src) {
                const picViewer = await import('./pic-viewer.js');
                removeViewer = picViewer.initViewer(src);
            }

            onUnmounted(() => {
                removeViewer && removeViewer();
            });

            return {
                openViewerFn
            }
        }
    }
</script>
