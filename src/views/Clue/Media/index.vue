<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Form, Button, FormInstance, Col } from 'ant-design-vue';
import FormComponent from '@/components/FormItem/index.vue';
import { PropsParams } from '@/components/FormItem/types';

interface State {
  name: string;
  gender: number;
  education: number;
}

const state = reactive<State>({
  name: '111',
  gender: 1,
  education: 1,
});

const formRules = reactive({
  name: [{ required: true, message: 'Please Input name' }],
  gender: [{ required: true, message: 'Please select gender' }],
  education: [{ required: true, message: 'Please select education' }],
});

const formColumns: PropsParams[] = [
  {
    name: 'name',
    type: 'Input',
    label: '姓名',
    options: [],
  },
  {
    name: 'gender',
    type: 'Radio',
    label: '性别',
    options: [
      { key: '女', value: 0 },
      { key: '男', value: 1 },
    ],
  },
  {
    name: 'education',
    type: 'Select',
    label: '学历',
    options: [
      { key: '大专及以下学历', value: 1 },
      { key: '本科学历', value: 2 },
      { key: '硕士研究生学历', value: 3 },
      { key: '博士研究生学历', value: 4 },
    ],
  },
  {
    slotName: 'Actions',
  },
];

const useForm = Form.useForm;
const { resetFields, validate, validateInfos } = useForm(state, formRules);

const baseForm = ref<HTMLElement | null>(null);

const handleSubmit = () => {
  validate()
    .then(val => {
      console.log(val);
    })
    .catch(err => {
      console.log(err);
    });
};
</script>
<template>
  <FormComponent ref="baseForm" :form-columns="formColumns" :form-data="state" :form-rules="validateInfos">
    <template #Actions>
      <Col :span="14" :offset="10">
        <Form.Item>
          <Button type="primary" @click="handleSubmit()">提交</Button>
          <Button style="margin-left: 80px">返回</Button>
        </Form.Item>
      </Col>
    </template>
  </FormComponent>
</template>
