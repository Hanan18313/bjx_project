import { InjectionKey } from 'vue';
import { createStore, createLogger, Store } from 'vuex';
import { IRootState } from './types';

const debug = import.meta.env.MODE === 'development';
const plugins = debug ? [createLogger({})] : [];
const modules: Record<string, any> = {};

const requireModules = import.meta.globEager('@/store/modules/**/index.ts');
Object.keys(requireModules).forEach((filePath: string) => {
  const path = filePath.toLowerCase().replace(/^\/src\/store\/modules\//g, '');
  const name = path.replace(/\.\/|\/index.(js|ts)/g, '');
  const modular: any = requireModules[filePath];
  modules[name] = {
    namespaced: true,
    ...modular[name],
  };
});

export const key: InjectionKey<Store<IRootState>> = Symbol('');

const store = createStore<IRootState>({
  plugins,
  strict: process.env.NODE_ENV === 'development',
  modules: {
    ...modules,
  },
});

export default store;
