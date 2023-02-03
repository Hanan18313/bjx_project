import { KeyParams, OptionsKeys } from '../types';

export interface CascaderProps {
  modelValue: (string | number)[];
  options: OptionsKeys[];
  inputConfig?: KeyParams;
  [key: string]: any;
}
