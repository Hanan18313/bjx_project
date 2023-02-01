<script lang="ts" setup>
import { defineProps, defineEmits, ref, toRefs, ToRefs, UnwrapRef, watch } from 'vue';
import { AutoComplete, AutoCompleteOption, Select } from 'ant-design-vue';
import { AutoCompleteProps } from './types';

const { Option } = AutoComplete;

const emits = defineEmits(['update:modelValue']);

const props = defineProps<AutoCompleteProps>();
const { inputConfig, options } = toRefs(props);
console.log(props);
const val = ref<UnwrapRef<string | number | undefined>>(props.modelValue);

// watch(
//   () => props.modelValue,
//   () => {
//     val.value = props.modelValue;
//   },
// );

emits('update:modelValue', val);
</script>
<template>
  <AutoComplete v-model:value="val" :placeholder="inputConfig.placeholder">
    <template #:dataSource>
      <Option v-for="item in options" :key="item.value">{{ item.key }}</Option>
    </template>
  </AutoComplete>
</template>
