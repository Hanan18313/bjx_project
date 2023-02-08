<script lang="ts" setup name="AddMedia">
import { reactive, ref } from 'vue';
import { Form, Button, FormInstance, Col } from 'ant-design-vue';
import FormComponent from '@/components/FormItem/index.vue';
import { PropsParams } from '@/components/FormItem/types';

interface FormEl {
  formRef: FormInstance;
}

interface State {
  name: string;
  gender: number | string;
  education: number | string | null;
  [key: string]: any;
}

interface Option {
  value: string;
}

const baseForm = ref<FormEl>();

const state = reactive<State>({
  name: '',
  gender: '',
  education: null,
  auto: null,
  date: [],
});

const formRules = reactive({
  name: [{ required: true, message: 'Please Input name', trigger: 'blur' }],
  gender: [{ required: true, message: 'Please select gender', trigger: 'blur' }],
  education: [{ required: true, message: 'Please select education', trigger: 'blur' }],
});

const handleOnSelect = (value: any, option: Option) => {
  console.log(value);
  console.log(option);
};

const formColumns: PropsParams[] = [
  {
    name: 'name',
    type: 'Input',
    label: '姓名',
    inputConfig: {
      placeholder: '请输入姓名',
      disabled: false,
    },
  },
  {
    name: 'gender',
    type: 'Radio',
    label: '性别',
    options: [
      { label: '女', value: 0 },
      { label: '男', value: 1 },
    ],
  },
  {
    name: 'education',
    type: 'Select',
    label: '学历',
    inputConfig: {
      placeholder: '请选择学历',
      onSelect: handleOnSelect,
    },
    options: [
      { label: '大专及以下学历', value: 1 },
      { label: '本科学历', value: 2 },
      { label: '硕士研究生学历', value: 3 },
      { label: '博士研究生学历', value: 4 },
    ],
  },
  {
    name: 'auto',
    type: 'AutoComplete',
    label: '自动完成',
    inputConfig: {
      placeholder: '请输入关键字',
      filterOptions: (input: string, option: Option) => {
        // 动态筛选
        console.log(input);
        console.log(option);
      },
    },
    options: [{ value: '一二三' }, { value: '四五六' }],
  },
  {
    name: 'date',
    type: 'DatePicker',
    label: '日期',
    inputConfig: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    name: 'cover',
    type: 'Upload',
    label: '封面',
    inputConfig: {},
  },
];

const handleSubmit = (formEl: FormEl | undefined) => {
  formEl?.formRef
    .validate()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const handleReset = (formEl: FormEl | undefined) => {
  formEl?.formRef.resetFields();
};
</script>
<template>
  <FormComponent
    ref="baseForm"
    :form-columns="formColumns"
    :form-data="state"
    :form-rules="formRules"
  >
    <template #Actions>
      <Col :span="14" :offset="10">
        <Form.Item>
          <Button type="primary" @click="handleSubmit(baseForm)">提交</Button>
          <Button style="margin-left: 80px" @click="handleReset(baseForm)">重置</Button>
        </Form.Item>
      </Col>
    </template>
  </FormComponent>
</template>
