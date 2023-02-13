import { UploadFile } from 'ant-design-vue';

export interface KeyParams {
  [key: string]: any;
}

export interface UploadProps {
  modelValue: UploadFile[];
  inputConfig?: KeyParams;
  [key: string]: any;
}
