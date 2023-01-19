import { RouteRecordRaw } from 'vue-router';

const requireModules = import.meta.glob('@/views/*/**');
const modules: Array<RouteRecordRaw> = Object.keys(requireModules).map((filePath: string) => {
  const splitPath = filePath.toLowerCase().replace(/^\/src\/views/g, '');
  const path = splitPath.replace(/^\.|\/index\.(vue|tsx)/g, '');
  const name = path.replace(/^\//, '').replace(/\/(\w)/, ($0, $1) => $1.toUpperCase());
  return {
    name: name,
    path: path,
    component: requireModules[filePath],
  };
});
console.log(modules);
const routers: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect() {
      return '/home';
    },
    meta: {
      keepAlive: true,
    },
    children: [...modules],
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/_404.vue'),
  },
  {
    path: '/:pathMathch(.*)',
    redirect: '/404',
  },
];

export default routers;
