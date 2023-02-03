<script lang="ts" setup name="FormIndex">
import { defineProps, markRaw, ref, toRefs } from 'vue';
import { Form, Row, Col, FormInstance } from 'ant-design-vue';
import Input from './Input/index.vue';
import Select from './Select/index.vue';
import Radio from './Radio/index.vue';
import AutoComplete from './AutoComplete/index.vue';
import DatePicker from './RangePicker/index.vue';
import Cascader from './Cascader/index.vue';
import Checkbox from './Checkbox/index.vue';
import Swtich from './Switch/index.vue';
import InputNumber from './InputNumber/index.vue';
import type { FormProps } from './types';

const props = defineProps<FormProps>();
const { formColumns, formData, formRules } = toRefs(props);

const componentsType: Record<string, any> = markRaw({
  Input,
  Select,
  Radio,
  AutoComplete,
  DatePicker,
  Cascader,
  Checkbox,
  Swtich,
  InputNumber,
});

const formRef = ref<FormInstance>();
defineExpose({ formRef });
</script>
<template>
  <Form ref="formRef" :model="formData" v-bind="$attrs" :rules="formRules">
    <Row style="text-align: start">
      <template v-for="column in formColumns" :key="column.name">
        <Col :span="8" :offset="2">
          <Form.Item :label="column.label" :name="column.name">
            <component
              :is="componentsType[column.type!!]"
              v-model="formData[column.name]"
              v-bind="column"
            ></component>
          </Form.Item>
        </Col>
      </template>
      <slot name="Actions"></slot>
    </Row>
  </Form>
</template>
<style lang="less" scoped></style>
