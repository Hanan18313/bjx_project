import { KeyParams } from '../types';

export interface InputProps {
  modelValue: string | number | undefined;
  inputConfig?: KeyParams;
  [key: string]: any;
}
