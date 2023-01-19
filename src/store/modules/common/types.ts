import { IconType } from '@icon-park/vue-next/lib/all';

interface IMenu {
  icon: IconType;
  name: string;
  path: string;
  key: string;
  children?: IMenu[];
}
export interface ICommonState {
  menu: IMenu[];
}
