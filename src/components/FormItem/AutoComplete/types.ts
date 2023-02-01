import { KeyParams, OptionsKeys } from '../types';

export interface AutoCompleteProps {
  modelValue: string | number | undefined;
  options: OptionsKeys[];
  inputConfig: KeyParams;
  [key: string]: any;
}
