<script lang="ts" setup name="CascaderIndex">
import { defineProps, ref, Ref, toRefs, watch } from 'vue';
import { Cascader } from 'ant-design-vue';
import { CascaderProps } from './types';

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<(string | number)[]>): void;
}>();

const props = defineProps<CascaderProps>();
const { inputConfig } = toRefs(props);
const val = ref<(string | number)[]>(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

emits('update:modelValue', val);
</script>
<template>
  <Cascader
    :allow-clear="inputConfig?.allowClear"
    :options="inputConfig?.options"
    :disabled="inputConfig?.disabled"
    :placeholder="inputConfig?.placeholder"
    :size="inputConfig?.size"
  ></Cascader>
</template>
