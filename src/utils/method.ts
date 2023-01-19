import { KeyData } from '@/types/common';

export const deleteSearchFormUndef = (searchForm: KeyData): Record<string, any> => {
  if (searchForm) {
    const keys = Object.keys(searchForm);
    const val = Object.create(null);
    keys.forEach((item: string) => {
      if (searchForm[item] !== undefined && String(searchForm[item]).trim() !== '') {
        if (typeof searchForm[item] === 'string') {
          val[item] = searchForm[item].trim();
        } else {
          val[item] = searchForm[item];
        }
      }
    });

    return val;
  }
  return {};
};
