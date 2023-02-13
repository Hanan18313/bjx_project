<script lang="ts" setup name="UploadIndex">
import { ref, defineEmits, Ref, defineProps, toRefs, onMounted, watch } from 'vue';
import {
  Upload,
  Button,
  UploadFile,
  message,
  UploadChangeParam,
  TypographyText,
} from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { UpAction } from '@/config/api';
import { UploadProps } from './types';

const fileTypeList: any = [
  'doc',
  'docx',
  'pdf',
  'jpeg',
  // 'jpg',
  'png',
  'zip',
  'z7',
  'rar',
];

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<UploadFile[]>): void;
}>();

const uploadUrl = ref<string>(UpAction);
const props = defineProps<UploadProps>();

const { inputConfig } = toRefs(props);
const fileList = ref<UploadFile[]>(props.modelValue);

const handleBeforeUpload = (file: UploadFile): Promise<any> => {
  const fileStuffix = file.name.split('.')[file.name.split('.').length - 1];
  const index = fileTypeList.indexOf(fileStuffix);
  const limitSize = file.size! / 1024 / 1024 < 2;
  return new Promise((resolve, reject) => {
    if (index === -1) {
      message.error('请您选择正确的文件格式');
      return reject(new Error('请您选择正确的文件格式'));
    }
    if (!limitSize) {
      message.error('文件大小不能大于2MB');
      return reject(new Error('文件大小不能大于2MB'));
    }
    return resolve(true);
  });
};

watch(
  () => props.modelValue,
  () => {
    fileList.value = props.modelValue;
  },
);

const handleChangeUpload = (info: UploadChangeParam) => {
  if (info.file.status === 'error') {
    return message.error('上传失败');
  }
  if (info.file.status === 'done') {
    if (info.file.response.code == 200) {
      // 上传完成
      emits('update:modelValue', fileList);
    } else {
      return message.error(info.file.response.msg);
    }
  }

  if (info.file.status === 'removed') {
  }
};

const handlePreviewUpload = () => {
  console.log('handlePreviewUpload');
};
</script>
<template>
  <Upload
    v-model:file-list="fileList"
    :disabled="inputConfig?.disabled"
    name="file"
    :multiple="inputConfig?.multiple"
    accept=".png,.jpg,.pdf,.doc,.docx,.zip,.rar,.z7"
    :action="uploadUrl"
    :directory="false"
    :before-upload="handleBeforeUpload"
    :show-upload-list="{ showPreviewIcon: true, showRemoveIcon: true, showDownloadIcon: true }"
    @change="handleChangeUpload"
    @preview="handlePreviewUpload"
  >
    <Button><UploadOutlined></UploadOutlined>上传</Button>
  </Upload>
  <TypographyText type="secondary">支持格式：png、jpg、pdf、doc、docx、zip、rar、z7</TypographyText>
</template>
