<script lang="ts" setup name="AutoCompleteIndex">
import { defineProps, defineEmits, ref, toRefs, UnwrapRef, watch, Ref } from 'vue';
import { AutoComplete } from 'ant-design-vue';
import { AutoCompleteProps } from './types';

const { Option } = AutoComplete;

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<string | number | undefined>): void;
}>();

const props = defineProps<AutoCompleteProps>();
const { inputConfig, options } = toRefs(props);
const val = ref<UnwrapRef<string | number | undefined>>(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

emits('update:modelValue', val);
</script>
<template>
  <AutoComplete v-model:value="val" :placeholder="inputConfig.placeholder">
    <template #:dataSource>
      <Option v-for="item in options" :key="item.value">{{ item.label }}</Option>
    </template>
  </AutoComplete>
</template>
