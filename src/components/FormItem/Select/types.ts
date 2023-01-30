export interface KeyParams {
  [key: string]: any;
}

export interface OptionsKeys {
  key: string;
  value: string | number;
}

export interface SelectProps {
  modelValue: string | number | undefined;
  inputConfig?: KeyParams;
  options: OptionsKeys[];
}
