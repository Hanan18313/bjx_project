<script lang="ts" setup name="SelectIndex">
import { defineProps, defineEmits, ref, watch, toRefs, ToRefs, Ref } from 'vue';
import { Switch } from 'ant-design-vue';
import type { SwitchProps } from './types';

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<string | number | boolean>): void;
}>();

const props = defineProps<SwitchProps>();
const { inputConfig, options } = toRefs(props);
const val = ref<string | number | boolean>(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

emits('update:modelValue', val);
</script>
<template>
  <Switch
    :disabled="inputConfig?.disabled"
    :size="inputConfig?.size"
    :checked-value="inputConfig?.checked - value"
    :un-checked-value="inputConfig?.un - checked - value"
    :un-checked-children="inputConfig?.un - checked - children"
    :checked-children="inputConfig?.checked - children"
  ></Switch>
</template>
