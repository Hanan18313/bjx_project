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

export const debounce = (fn: Function, delay: number) => {
  let timer: NodeJs.Timer | null = null;
  return (...args: []) => {
    if (timer) clearInterval(timer);
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
};

export const throttle = (fn: Function, delay: number) => {
  let valid = true;
  return (...agrs: []) => {
    if (!valid) return false;
    valid = false;
    setTimeout(() => {
      fn.call(this, ...agrs);
      valid = true;
    }, delay);
  };
};
