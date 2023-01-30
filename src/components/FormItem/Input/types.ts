export interface KeyParams {
  [key: string]: any;
}

export interface InputProps {
  modelValue: string | number | undefined;
  inputConfig?: KeyParams;
  [key: string]: any;
}
