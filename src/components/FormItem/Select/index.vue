<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import { Select } from 'ant-design-vue';
import type { SelectProps } from './types';

const { Option } = Select;

const emits = defineEmits(['update:value']);

const props = defineProps<SelectProps>();
console.log(props);
const val = ref(props.value);
const options = ref(props.options);

watch(
  () => props.value,
  () => {
    val.value = props.value;
  },
);

emits('update:value', val);
</script>
<template>
  <Select v-model:value="val" v-bind="$attrs">
    <Option v-for="item in options" :key="item.value" :value="item.value">{{ item.key }}</Option>
  </Select>
</template>
