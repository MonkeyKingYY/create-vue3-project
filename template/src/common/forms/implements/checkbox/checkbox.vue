<template>
    <div>
        <span v-for="(item,i) in listRef" class="checkbox">
            <input :disabled="disabled" @click="change($event, item)" :value="item.valueCode" :id="uuid+i" type="checkbox" :checked="isChecked?isChecked:isSelected(item.valueCode)" :ref="el => elementRef[i] = el" />
            <label :for="uuid+i">{{ item.valueName }}</label>
        </span>
    </div>
</template>

<script>
    import { onMounted, ref, watchEffect } from 'vue';
    import { getKeyCodes, getUuid } from "../../util";
    import { registerValidate } from "../../form-validator";

    export default {
        props: {
            modelValue: [String,Array],
            keyCode: String,
            list: Array,
            disabled: Boolean,
            validateRule: Object,
            isChecked: {
                type: Boolean,
                default: false
            }
        },
        setup(props, { emit }) {
            const listRef = ref([]);
            const elementRef = ref([]);
            const uuid = getUuid();
            const selectedListRef = ref([]);
			let arr=[];

            registerValidate({ ref: elementRef, props })
            onMounted(async () => {

					if(typeof selectedListRef.value== "string" && selectedListRef.value!=''){
						arr= selectedListRef.value.split(',');
					}
                if (props.keyCode) {
                    listRef.value = (await getKeyCodes(props.keyCode)).data;
                } else {
                    listRef.value = props.list;
                }
                if (Array.isArray(props.modelValue) && props.modelValue.length) {
                    selectedListRef.value = props.modelValue.slice(0)
                }
            })

            watchEffect(() => {
                if (selectedListRef.value.toString() !== (props.modelValue || '').toString()) {
                    selectedListRef.value = (props.modelValue || []).slice(0);
                }
            });

            function isSelected(code) {
                return selectedListRef.value.includes(code);
            }

            function change(e, item) {
                if (e.target.checked) {
					if(typeof selectedListRef.value== "string"){
						arr.push(item.valueCode);
					}
					else
                    	selectedListRef.value.push(item.valueCode);
                } else {
                    let index;

					if(typeof selectedListRef.value== "string"){
						index = arr.indexOf(item.valueCode);
                    	arr.splice(index, 1);
					}
					else{
						index = selectedListRef.value.indexOf(item.valueCode);
                    	selectedListRef.value.splice(index, 1);
					}
                }
                emit('update:modelValue', typeof selectedListRef.value== "string"?arr.sort().join(','): selectedListRef.value.slice(0).sort());
            }

            return { listRef, change, isSelected, elementRef, uuid, selectedListRef }
        }
    }
</script>
<style scoped>
    .checkbox {
        margin-right: 10px;
    }

    .checkbox input {
        margin-right: 5px;
    }
</style>
