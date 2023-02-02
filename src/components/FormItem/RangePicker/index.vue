<script lang="ts" setup name="RangePickerIndex">
import { defineEmits, defineProps, ref, toRefs, ToRefs, watch, Ref } from 'vue';
import { RangePicker } from 'ant-design-vue';
import moment, { Dayjs } from 'dayjs';
import { RangePickerProps } from './types';

const disabledDate = (current: Dayjs): boolean => {
  return current && current < moment().endOf('day');
};

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<[Dayjs, Dayjs]>): void;
}>();

const props = defineProps<RangePickerProps>();
const { inputConfig } = toRefs<ToRefs>(props);
const val = ref<[Dayjs, Dayjs]>(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

emits('update:modelValue', val);
</script>
<template>
  <RangePicker v-model:value="val" :disabled-date="disabledDate" :format="inputConfig?.format"></RangePicker>
</template>
