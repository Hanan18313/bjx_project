<script lang="ts" setup>
import { defineProps, defineEmits, defineExpose, markRaw, ref, toRefs } from 'vue';
import { Form, Row, Col, FormInstance } from 'ant-design-vue';
import Input from './Input/index.vue';
import Select from './Select/index.vue';
import type { Props } from './types';

const props = defineProps<Props>();
const { formColumns, formData, formRules } = toRefs(props);
console.log(formColumns.value);

const componentsType: Record<string, any> = markRaw({
  Input,
  Select,
});

const formRef = ref<FormInstance>();
defineExpose({ formRef });
</script>
<template>
  <Form ref="formRef" :model="formData" :rules="formRules" v-bind="$attrs">
    <Row style="text-align: start">
      <template v-for="(column, index) in formColumns" :key="index">
        <Col v-if="column.slotName" :span="8" :offset="2">
          {{ column.slotName }}
          <template>
            <slot :name="column.slotName"></slot>
          </template>
        </Col>
        <Col v-else :span="8" :offset="2">
          <Form.Item :label="column.label" :name="column.name">
            <component :is="componentsType[column.type!!]" v-model="formData[column.name!!]" v-bind="column"></component>
          </Form.Item>
        </Col>
      </template>
    </Row>
  </Form>
</template>
<style lang="less" scoped></style>
