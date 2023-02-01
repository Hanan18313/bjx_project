<script lang="ts" setup>
import { defineProps, defineEmits, ref, toRefs, watch, ToRefs, Ref, UnwrapRef } from 'vue';
import { Input } from 'ant-design-vue';
import type { InputProps } from './types';

const emits = defineEmits(['update:modelValue']);

const props = defineProps<InputProps>();
const { inputConfig } = toRefs<ToRefs>(props);
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
  <Input v-model:value="val" :placeholder="inputConfig?.placeholder" />
</template>
