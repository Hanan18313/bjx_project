export interface KeyParams {
  [key: string]: any;
}

export interface OptionsKeys {
  label: string;
  value: string | number;
}

export interface OptionsKeys2 {
  value: string | number;
}

export interface PropsParams {
  name: string;
  type: string;
  label: string;
  options?: OptionsKeys[] | OptionsKeys2[];
  inputConfig?: KeyParams;
  formConfig?: KeyParams;
  [key: string]: any;
}

export interface FormProps {
  formColumns: PropsParams[];
  formData: KeyParams;
  formRules?: KeyParams;
}
