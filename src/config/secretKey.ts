const NODE_ENV: string = process.env || 'start';

interface Env {
  [key: string]: any;
}

const env: Env = {
  start: {
    PASSPORTAPISCOPE: 'openid profile offline_access auth.api school.api middle.api gl', //用户中心授权权限
    PASSPORTAPICLIENTID: 'dev.mt.receipt', //用户中心client_id
  },
  build: {},
};

export const SECRET_KEYS: Record<string, any> = NODE_ENV === 'build' ? env[NODE_ENV] : env['start'];
