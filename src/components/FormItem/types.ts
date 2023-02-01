export interface KeyParams {
  [key: string]: any;
}

export interface OptionsKeys {
  key: string;
  value: string | number;
}

export interface OptionsKeys2 {
  value: string | number;
}

export interface PropsParams {
  name?: string;
  type?: string;
  options?: OptionsKeys[] | OptionsKeys2[];
  inputConfig?: KeyParams;
  formConfig?: KeyParams;
  [key: string]: any;
}

export interface Props {
  formColumns: PropsParams[];
  formData: KeyParams;
  formRules?: KeyParams;
}
