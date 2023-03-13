import { KeyParams } from '../types';

export interface SwitchProps {
  modelValue: string | number | boolean;
  inputConfig?: KeyParams;
  [key: string]: any;
}
