<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import { Input } from 'ant-design-vue';
import type { InputProps } from './types';

const emits = defineEmits(['update:value']);

const props = defineProps<InputProps>();
const val = ref(props.value);

watch(
  () => props.value,
  () => {
    val.value = props.value;
  },
);

emits('update:value', val);
</script>
<template>
  <Input v-model:value="val" />
</template>
