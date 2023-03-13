export interface KeyParams {
  [key: string]: any;
}

export interface OptionsKeys {
  label?: string;
  value: string | number;
  disabled?: boolean;
  children?: OptionsKeys[];
}

export interface OptionsKeys2 {
  value: string | number;
}

export interface PropsParams {
  name: string;
  type: string;
  label: string;
  options?: OptionsKeys[];
  inputConfig?: KeyParams;
  formConfig?: KeyParams;
  [key: string]: any;
}

export interface FormProps {
  columns: PropsParams[];
  data: KeyParams;
  rules?: KeyParams;
}
