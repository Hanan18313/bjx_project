<script lang="ts" setup name="UploadIndex">
import { ref, defineEmits, Ref, defineProps, toRefs, onMounted } from 'vue';
import { Upload, Button, UploadFile, message, UploadChangeParam } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { UpAction } from '@/config/api';
import { UploadProps } from './types';

const fileTypeList: any = [];

const emits = defineEmits<{
  (event: 'update:modelValue', val: Ref<string | number | boolean>): void;
}>();

const uploadUrl = ref<string>(UpAction);
const props = defineProps<UploadProps>();

const { inputConfig } = toRefs(props);
const fileList = ref<UploadFile[]>(props.fileList);

const handleBeforeUpload = (file: UploadFile): Promise<any> => {
  console.log(file);
  return new Promise((resolve, reject) => {
    if (!fileTypeList) {
      const index = fileTypeList.indexOf(file.type as string);
      if (index > 0) {
        message.error(`您只能上传${fileTypeList[index]}文件`);
      }
    }
    const limitSize = file.size! / 1024 / 1024 < 2;
    if (!limitSize) {
      message.error('文件大小不能大于2MB');
      return reject(new Error('文件大小不能大于2MB'));
    }
    return resolve(true);
  });
};

const handleChangeUpload = (info: UploadChangeParam) => {
  console.log(info);
  if (info.file.status === 'error') {
  }
  if (info.file.status === 'done') {
    if (info.file.response.code == 200) {
      // 上传完成
      // emits('update:modelValue', );
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
    :accept="inputConfig?.accept"
    :action="uploadUrl"
    :before-upload="handleBeforeUpload"
    :show-upload-list="{ showPreviewIcon: true, showRemoveIcon: true, showDownloadIcon: true }"
    @change="handleChangeUpload"
    @preview="handlePreviewUpload"
  >
    <Button><UploadOutlined></UploadOutlined>上传</Button>
  </Upload>
</template>
