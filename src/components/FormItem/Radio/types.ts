import { OptionsKeys, KeyParams } from '../types';

export interface RadioProps {
  modelValue: string | number | undefined;
  options: OptionsKeys[];
  [key: string]: any;
}
