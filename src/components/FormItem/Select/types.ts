import { OptionsKeys, KeyParams } from '../types';

export interface SelectProps {
  modelValue: string | number | undefined;
  inputConfig: KeyParams;
  options: OptionsKeys[];
  [key: string]: any;
}
