<script lang="ts" setup>
import { defineProps, defineEmits, ref, toRefs, ToRefs, UnwrapRef, watch } from 'vue';
import { AutoComplete, Select } from 'ant-design-vue';
import { AutoCompleteProps } from './types';

const emits = defineEmits(['update:autoValue']);

const props = defineProps<AutoCompleteProps>();
const { inputConfig, options } = toRefs(props);
const val = ref<UnwrapRef<string | number | undefined>>(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

emits('update:autoValue', val);
</script>
<template>
  <AutoComplete v-model:value="val" :placeholder="inputConfig.placeholder">
    <Select.Option v-for="item in options" :key="item.value" :value="item.value">{{ item.key }}</Select.Option>
  </AutoComplete>
</template>
