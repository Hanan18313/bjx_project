<script lang="ts" setup name="RadioIndex">
import { defineProps, defineEmits, ref, watch, UnwrapRef } from 'vue';
import { Radio } from 'ant-design-vue';
import type { RadioProps } from './types';

const { Group } = Radio;

const emits = defineEmits(['update:modelValue']);

const props = defineProps<RadioProps>();
const val = ref<UnwrapRef<string | number | undefined>>(props.modelValue);
const options = ref(props.options);

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

emits('update:modelValue', val);
</script>
<template>
  <Group v-model:value="val" v-bind="$attrs">
    <Radio v-for="item in options" :key="item.value" :value="item.value">{{ item.key }}</Radio>
  </Group>
</template>
