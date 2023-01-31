<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue';
import { Form, Button, FormInstance, Col } from 'ant-design-vue';
import FormComponent from '@/components/FormItem/index.vue';
import { PropsParams } from '@/components/FormItem/types';
import { api } from '@/config/api';

const useForm = Form.useForm;

interface State {
  name: string;
  gender: number | string;
  education: number | string | undefined;
  [key: string]: any;
}

const state = reactive<State>({
  name: '',
  gender: '',
  education: undefined,
});

const formRules = {
  name: [{ required: true, message: 'Please Input name' }],
  gender: [{ required: true, message: 'Please select gender' }],
  education: [{ required: true, message: 'Please select education' }],
};

const formColumns: PropsParams[] = [
  {
    name: 'name',
    type: 'Input',
    label: '姓名',
    inputConfig: {
      placeholder: '请输入姓名',
    },
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
    inputConfig: {
      placeholder: '请选择学历',
    },
    options: [
      { key: '大专及以下学历', value: 1 },
      { key: '本科学历', value: 2 },
      { key: '硕士研究生学历', value: 3 },
      { key: '博士研究生学历', value: 4 },
    ],
  },
];

const { resetFields, validate, validateInfos } = useForm(state, formRules);

const handleSubmit = () => {
  console.log(api);
  validate()
    .then(() => {
      console.log(toRaw(state));
    })
    .catch(err => {
      console.log(err);
    });
};

const handleReset = () => {
  resetFields();
};
</script>
<template>
  <FormComponent :form-columns="formColumns" :form-data="state" :form-rules="validateInfos">
    <template #Actions>
      <Col :span="14" :offset="10">
        <Form.Item>
          <Button type="primary" @click="handleSubmit()">提交</Button>
          <Button style="margin-left: 80px" @click="handleReset()">重置</Button>
        </Form.Item>
      </Col>
    </template>
  </FormComponent>
</template>
