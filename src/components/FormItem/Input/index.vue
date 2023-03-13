<script lang="ts" setup name="InputIndex">
import { defineProps, defineEmits, ref, toRefs, watch, Ref } from 'vue';
import { Input } from 'ant-design-vue';
import type { InputProps } from './types';

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<string | number | undefined>): void;
}>();

const props = defineProps<InputProps>();
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
  <Input
    v-model:value="val"
    :placeholder="inputConfig?.placeholder"
    :maxlength="inputConfig?.maxlength"
    :size="inputConfig?.size"
    :allow-clear="inputConfig?.allowClear"
    :disabled="inputConfig?.disabled"
  />
</template>
