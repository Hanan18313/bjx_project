import { RouteRecordRaw } from 'vue-router';

const requireModules = import.meta.glob('@/views/**');
console.log(requireModules);
const modules: Array<RouteRecordRaw> = Object.keys(requireModules).map((filePath: string) => {
  console.log(filePath);
  const match: RegExpMatchArray | any = filePath.match(/[\w]+(?=.vue)/);
  return {
    name: match[0],
    path: filePath,
    component: requireModules[filePath],
  };
});

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
