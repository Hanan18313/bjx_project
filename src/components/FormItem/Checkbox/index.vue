<script lang="ts" setup name="CheckboxIndex">
import { defineEmits, defineProps, ref, Ref, toRefs, watch } from 'vue';
import { CheckboxGroup } from 'ant-design-vue';
import { CheckboxProps } from './types';

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<(string | number)[]>): void;
}>();
const props = defineProps<CheckboxProps>();
const { inputConfig } = toRefs(props);
const val = ref<(string | number)[]>(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

emits('update:modelValue', val);
</script>
<template>
  <CheckboxGroup
    :options="inputConfig?.options"
    :disabled="inputConfig?.disabled"
    @change="inputConfig?.onChange"
  >
  </CheckboxGroup>
</template>
