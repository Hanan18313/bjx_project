<script lang="ts" setup>
import FormItem from '@/components/FormItem/index.vue';
import { PropsParams } from '@/components/FormItem/types';

const formField: PropsParams[] = [
  {
    name: '',
    type: '',
    component: '',
    formConfig: {},
    inputConfig: {},
    options: [],
  },
];
</script>
<template>
  <span>媒体线索</span>
  <FormItem></FormItem>
</template>
