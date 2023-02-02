import { Dayjs } from 'dayjs';

export interface KeyParams {
  [key: string]: any;
}

export interface RangePickerProps {
  modelValue: [Dayjs, Dayjs];
  inputConfig?: KeyParams;
  [key: string]: any;
}
