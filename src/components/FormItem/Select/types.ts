export interface OptionsKeys {
  key: string;
  value: string | number;
}

export interface SelectProps {
  modelValue: string | number | undefined;
  options: OptionsKeys[];
}
