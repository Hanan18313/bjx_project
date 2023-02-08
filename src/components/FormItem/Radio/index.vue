<script lang="ts" setup name="RadioIndex">
import { defineProps, defineEmits, ref, watch, Ref, toRefs } from 'vue';
import { Radio } from 'ant-design-vue';
import type { RadioProps } from './types';

const { Group } = Radio;

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<string | number | undefined>): void;
}>();

const props = defineProps<RadioProps>();
const { inputConfig } = toRefs(props);
const val = ref<string | number | undefined>(props.modelValue);
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
  <Group
    v-model:value="val"
    v-bind="$attrs"
    :disabled="inputConfig?.disabled"
    @select="inputConfig?.onSelect"
  >
    <Radio v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</Radio>
  </Group>
</template>
