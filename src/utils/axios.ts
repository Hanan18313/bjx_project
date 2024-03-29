import axios, { AxiosRequestConfig, Canceler, AxiosResponse, AxiosError } from 'axios';
import { message } from 'ant-design-vue';
import qs from 'qs';
import router from '@/router';
import storage from './storage';
import { deleteSearchFormUndef } from './method';

const { CancelToken } = axios;

export const APP_TOKEN_KEY = 'APP_TOKEN_KEY';

export interface Env {
  [key: string]: string;
}

interface ISources {
  [key: string]: Canceler;
}

interface Config extends AxiosRequestConfig {
  type?: string;
  headers?: any;
}

const sources: ISources = {};

const Toast = (msg: string) => {
  message.destroy();
  message.error(msg, 3);
};

// 如果需要请求json格式的接口，在请求时配置这个传入参数
export const typeJson = {
  _JSONTYPE_: 'json',
};

export const emptyJson = {
  _JSONEMPTY_: true,
};

// 请求列表
const requestList: string[] = [];

// 允许重复请求列表
const agreeRequestAgain: string[] = [];
// 不需要token的url
const notNeedTokenUrlList: string[] = [
  '/api/Geetest/GetSign',
  '/api/Sms/SendWithSign',
  '/api/v1/User/GetChannelTokne',
];
// 取消网络超时时间
const agreeTimeOut: string[] = [];

const requestConfig = (config: Config): Config => {
  const newConfig = config;
  if (config.data && config.data._JSONEMPTY_) {
    newConfig.data = config.data;
    delete newConfig.data._JSONEMPTY_;
  } else {
    newConfig.data = deleteSearchFormUndef(config.data);
  }
  if (config.data && config.data._JSONTYPE_ === 'json') {
    newConfig.headers!['Content-Type'] = 'application/json;charset=utf-8';
    delete newConfig.data._JSONTYPE_;
  } else {
    newConfig.data = qs.stringify(newConfig.data);
  }

  const request =
    JSON.stringify(newConfig.url) + JSON.stringify(newConfig.data) + JSON.stringify(config.params);
  const token = storage.get(APP_TOKEN_KEY);
  newConfig.cancelToken = new CancelToken((cancel: Canceler) => {
    sources[request] = cancel;
  });

  let isNotNeedTokenUrl = false;
  notNeedTokenUrlList.forEach(url => {
    if (config.url?.includes(url)) {
      isNotNeedTokenUrl = true;
    }
  });

  if (requestList.includes(request)) {
    if (!agreeRequestAgain.includes(config.url as string)) {
      console.error(`提示：${config.url}重复请求，已取消`);
      sources[request]('取消重复请求');
    }
  } else if (!isNotNeedTokenUrl && !token) {
    // 在没有token的情况下，取消请求且返回登陆页面
    router.replace('/login');
    sources[request]('没有token');
  } else {
    requestList.push(request);
  }

  if (token) {
    newConfig.headers!.Authorization = token;
  }

  if (agreeTimeOut.includes(config.url as string)) {
    newConfig.timeout = 0;
  }
  return newConfig;
};

// 请求拦截出错配置
const requestError = (error: any) => {
  Toast(error.data.Error.trim() || error.trim() || '未知错误');
  return Promise.reject(error.data.Error || '');
};

// 响应拦截器通常配置
const responseConfig = (res: AxiosResponse) => {
  const request =
    JSON.stringify(res.config.url) +
    JSON.stringify(res.config.data) +
    JSON.stringify(res.config.params);
  requestList.splice(
    requestList.findIndex((item: string) => item === request),
    1,
  );
  if (!res.data) {
    res.data = {};
  }
  const { HttpStatusCode, IsError, Error } = res.data;
  // 根据后台返回的HttpStatusCode做处理
  switch (HttpStatusCode) {
    case '200':
    case 200: // 成功
      if (IsError) {
        Toast(Error);
      }
      return !IsError ? res.data : Promise.reject(res.data);
    case '50001':
    case '50002':
      Toast('登录失效');
      router.replace('/login');
      return Promise.reject();
    case '-1':
    case '500':
      Toast(Error);
      return Promise.reject();
    default:
      Toast(Error);
      return Promise.reject(res.data);
  }
};

const responseError = (error: AxiosError) => {
  if (axios.isCancel(error)) {
    requestList.length = 0;
    new axios.Cancel('cancel request');
  } else {
    Toast('网络不佳，请检查网络链接');
  }
  return Promise.reject(error);
};

const exportError = (res: any) => {
  const readFile = new FileReader();
  let resultObj: Env = {};
  readFile.onload = () => {
    const result: string = readFile.result?.toString() || '';
    resultObj = JSON.parse(result);
    Toast(resultObj.message);
  };
  readFile.readAsText(res.data);
  return Promise.reject(res.data);
};

// 响应拦截器下载正常配置
const responseDownloadConfig = (res: any) => {
  // 将成功请求从列表中删除
  const request = JSON.stringify(res.config.url) + JSON.stringify(res.config.data);
  requestList.splice(
    requestList.findIndex((item: string) => item === request),
    1,
  );
  if (!res.data) {
    res.data = {};
  }
  const { status } = res;
  // 根据后台返回的code做处理
  switch (status) {
    case '200':
    case 200: // 成功
      return res.data.type === 'application/json' ? exportError(res) : res;
    default:
      return Toast('导出失败');
  }
};

export const Axios = axios.create({
  // baseURL: BASEURL,
  timeout: 6000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'x-app-token': window['x-app-token'],
  },
});

// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  (config: AxiosRequestConfig) => requestConfig(config),
  (err: AxiosError) => requestError(err),
);

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  (res: AxiosResponse) => responseConfig(res),
  (err: any) => responseError(err),
);

// 下载文件请求
export const DownloadAxios = axios.create({
  // baseURL: BASEURL,
  timeout: 60000,
  responseType: 'blob',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

// POST传参序列化(添加请求拦截器)
DownloadAxios.interceptors.request.use(
  config => requestConfig(config),
  error => requestError(error),
);

// 返回状态判断(添加响应拦截器)
DownloadAxios.interceptors.response.use(
  res => responseDownloadConfig(res),
  error => responseError(error),
);
