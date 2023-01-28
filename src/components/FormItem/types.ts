export interface KeyParams {
  [key: string]: any;
}

export interface OptionsKeys {
  key: string;
  value: string | number;
}

export interface PropsParams {
  name: string;
  type?: string;
  component?: any;
  formConfig: KeyParams;
  inputConfig: KeyParams;
  options?: OptionsKeys[];
  [key: string]: any;
}
