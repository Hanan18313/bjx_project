interface Env {
  [key: string]: any;
}

interface IApi {
  EDUAPI: string;
  HRCOMMONAPI: string;
}

const NODE_ENV: string = process.env || 'start';

const env: Env = {
  start: {
    EDUAPI: 'http://192.168.4.98:5000',
  },
  build: {
    EDUAPI: 'https://pubapi.bjx.com.cn',
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
};

const commonEnv: Env = {
  start: {
    HRCOMMONAPI: 'https://common1.bjx.com.cn', //北极星人才通用接口API
  },
  build: {
    HRCOMMONAPI: 'https://common1.bjx.com.cn', //北极星人才通用接口API
  },
};

const commonApi: Record<string, any> =
  NODE_ENV === 'build' ? commonEnv[NODE_ENV] : commonEnv['start'];

export const api: IApi = {
  ...commonApi,
  ...env[NODE_ENV],
};
