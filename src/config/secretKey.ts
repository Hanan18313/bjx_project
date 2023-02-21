const NODE_ENV: string = process.env || 'start';

interface Env {
  [key: string]: any;
}

const env: Env = {
  start: {
    geetest: {
      acc: '',
      pwd: '',
    },
  },
  build: {
    geetest: {
      acc: '',
      pwd: '',
    },
  },
};

export const SECRET_KEYS: Record<string, any> = NODE_ENV === 'build' ? env[NODE_ENV] : env['start'];
