import { KeyParams, OptionsKeys } from '../types';

export interface CheckboxProps {
  modelValue: (string | number)[];
  options: OptionsKeys[];
  inputConfig?: KeyParams;
  [key: string]: any;
}
