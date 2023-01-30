export interface OptionsKeys {
  key: string;
  value: string | number;
}

export interface RadioProps {
  modelValue: string | number | undefined;
  options: OptionsKeys[];
}
