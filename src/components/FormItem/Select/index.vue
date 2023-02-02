<script lang="ts" setup name="SelectIndex">
import { defineProps, defineEmits, ref, watch, toRefs, ToRefs, UnwrapRef } from 'vue';
import { Select } from 'ant-design-vue';
import type { SelectProps } from './types';

const emits = defineEmits(['update:modelValue']);

const props = defineProps<SelectProps>();
const { inputConfig, options } = toRefs<ToRefs>(props);
const val = ref<UnwrapRef<string | number | undefined>>(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

emits('update:modelValue', val);
</script>
<template>
  <Select v-model:value="val" v-bind="$attrs" :placeholder="inputConfig?.placeholder" @select="inputConfig.onSelect">
    <Select.Option v-for="item in options" :key="item.key" :value="item.value">{{ item.key }}</Select.Option>
  </Select>
</template>
