export interface OptionsKeys {
  key: string;
  value: string | number;
}

export interface SelectProps {
  value: string;
  options: OptionsKeys[];
}
