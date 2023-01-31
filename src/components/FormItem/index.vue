<script lang="ts" setup>
import { defineProps, markRaw, toRefs } from 'vue';
import { Form, Row, Col } from 'ant-design-vue';
import Input from './Input/index.vue';
import Select from './Select/index.vue';
import Radio from './Radio/index.vue';
import type { Props } from './types';

const props = defineProps<Props>();
const { formColumns, formData, formRules } = toRefs(props);

const componentsType: Record<string, any> = markRaw({
  Input,
  Select,
  Radio,
});

// const formRef = ref<FormInstance>();
// defineExpose({ formRef });
</script>
<template>
  <Form ref="formRef" :model="formData" v-bind="$attrs">
    <Row style="text-align: start">
      <template v-for="column in formColumns" :key="column.name">
        <Col :span="8" :offset="2">
          <Form.Item :label="column.label" :name="column.name" v-bind="formRules[column.name!!]">
            <component :is="componentsType[column.type!!]" v-model="formData[column.name!!]" v-bind="column"></component>
          </Form.Item>
        </Col>
      </template>
      <slot name="Actions"></slot>
    </Row>
  </Form>
</template>
<style lang="less" scoped></style>
