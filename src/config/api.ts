import { SECRET_KEYS } from './secretKey';

interface Env {
  [key: string]: any;
}

interface IApi {
  EDUAPI: string;
  HRCOMMONAPI: string;
}

const NODE_ENV: string = process.env || 'start';

const MULTI_ENV: Env = {
  start: {
    EDUAPI: 'http://192.168.4.98:5000',
  },
  release3000: {
    EDUAPI: 'http://192.168.4.98:5001',
  },
  release4000: {
    EDUAPI: 'http://192.168.4.98:5002',
  },
  release5000: {
    EDUAPI: 'http://192.168.4.98:5003',
  },
  build: {
    EDUAPI: 'https://pubapi.bjx.com.cn',
  },
};

const ENV: Env = {
  start: {
    HRCOMMONAPI: 'https://common1.bjx.com.cn', //北极星人才通用接口API
    ...SECRET_KEYS,
  },
  build: {
    HRCOMMONAPI: 'https://common1.bjx.com.cn', //北极星人才通用接口API
    ...SECRET_KEYS,
  },
};

const ENV_API: Record<string, any> = NODE_ENV === 'build' ? ENV[NODE_ENV] : ENV['start'];

export const api: IApi = {
  ...ENV_API,
  ...MULTI_ENV[NODE_ENV],
};

export const UpAction = 'https://up.bjx.com.cn/api/UploadFile/';
