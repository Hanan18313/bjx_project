<script lang="ts" setup name="SelectIndex">
import { defineProps, defineEmits, ref, watch, toRefs, Ref } from 'vue';
import { Select } from 'ant-design-vue';
import type { SelectProps } from './types';

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<string | number | undefined>): void;
}>();

const props = defineProps<SelectProps>();
const { inputConfig, options } = toRefs(props);
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
  <Select
    v-model:value="val"
    v-bind="$attrs"
    :placeholder="inputConfig?.placeholder"
    @select="inputConfig.onSelect"
  >
    <Select.Option v-for="item in options" :key="item.value" :value="item.value">{{
      item.label
    }}</Select.Option>
  </Select>
</template>
