<script lang="ts" setup name="InputNumber">
import { defineProps, defineEmits, Ref, watch, toRefs, ref } from 'vue';
import { InputNumber } from 'ant-design-vue';
import { InputNumberProps } from './types';
const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<string | number | undefined>): void;
}>();

const props = defineProps<InputNumberProps>();
const { inputConfig } = toRefs(props);
const val = ref<string | number | undefined>(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

emits('update:modelValue', val);
</script>
<template>
  <InputNumber
    :disabled="inputConfig?.disabled"
    :formatter="inputConfig?.formatter"
    :parser="inputConfig?.parser"
    :max="inputConfig?.max"
    :min="inputConfig?.min"
    :precision="inputConfig?.precision"
    :step="inputConfig?.step"
    :size="inputConfig?.size"
    @change="inputConfig?.change"
  ></InputNumber>
</template>
