<template>
    <div layout="row" layout-align="start center" flex>
        <form-item :disabled="disabled" type="date" :config="startConfig" placeholder="开始时间"
                   :model-value="start"
                   @update:modelValue="changeStart"
                   :validate-rule="validateRule" flex/>
        <span class="split">-</span>
        <form-item :disabled="disabled" type="date" :config="endConfig" placeholder="结束时间"
                   :model-value="end"
                   @update:modelValue="changeEnd"
                   :validate-rule="validateRule" flex/>
    </div>
</template>

<script>
import {reactive, watchEffect} from 'vue';

export default {
    props: {
        start: String,
        end: String,
        startConfig: Object,
        endConfig: Object,
        disabled: Boolean,
        validateRule: Object
    },
    setup(props, {emit}) {
        const startConfigRef = reactive({})
        const endConfigRef = reactive({})

        watchEffect(() => {
            endConfigRef.min = props.start;
            startConfigRef.max = props.end;
        })

        function changeStart(date) {
            emit('update:start', date);
            emit('change', date);
        }

        function changeEnd(date) {
            emit('update:end', date);
            emit('change', date);
        }

        return {changeStart, changeEnd, startConfigRef, endConfigRef, }
    }
}
</script>

