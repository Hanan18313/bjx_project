<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Form, Button, FormInstance } from 'ant-design-vue';
import FormComponent from '@/components/FormItem/index.vue';
import { PropsParams } from '@/components/FormItem/types';

interface State {
  name: string;
  gender: number;
  education: string;
}

const state = reactive<State>({
  name: '',
  gender: 1,
  education: '',
});

const formColumns: PropsParams[] = [
  {
    name: 'name',
    type: 'Input',
    label: '姓名',
    options: [],
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

const baseForm = ref<HTMLElement | null>(null);

const handleSubmit = (formEl: FormInstance | unknown) => {
  console.log(formEl);
};
</script>
<template>
  <span>媒体线索</span>
  <FormComponent ref="baseForm" :form-columns="formColumns" :form-data="state">
    <template #Actions>
      <Form.Item>
        <Button type="primary" @click="handleSubmit(baseForm)">提交</Button>
      </Form.Item>
    </template>
  </FormComponent>
</template>
