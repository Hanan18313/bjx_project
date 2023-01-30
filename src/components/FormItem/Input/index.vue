<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import { Input } from 'ant-design-vue';
import type { InputProps } from './types';

const emits = defineEmits(['update:modelValue']);

const props = defineProps<InputProps>();
const val = ref(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

emits('update:modelValue', val);
</script>
<template>
  <Input v-model:value="val" />
</template>
