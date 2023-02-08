<script lang="ts" setup name="AutoCompleteIndex">
import { defineProps, defineEmits, ref, toRefs, watch, Ref } from 'vue';
import { AutoComplete } from 'ant-design-vue';
import { AutoCompleteProps } from './types';

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<string | number | undefined>): void;
}>();

const props = defineProps<AutoCompleteProps>();
const { inputConfig, options } = toRefs(props);
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
  <AutoComplete
    v-model:value="val"
    :filter-option="inputConfig?.filterOptions"
    :options="options"
    :placeholder="inputConfig?.placeholder"
    :allow-clear="inputConfig?.allowClear"
    :disabled="inputConfig?.disabled"
    @change="inputConfig?.onChange"
    @select="inputConfig?.onSelect"
  >
  </AutoComplete>
</template>
