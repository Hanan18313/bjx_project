/// <reference types="vite/client" />
// interface Process {
//   readonly process: Record<string, any>;
// }

// 创建全局变量
const process: Record<string, any> = {};
const initGeetest: any;
interface Window {
  'x-app-token': string;
}
