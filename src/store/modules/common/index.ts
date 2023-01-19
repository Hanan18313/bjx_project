import { ActionTree, Module, MutationTree } from 'vuex';
import { getMenu } from '@/request/common/layout';
import { IRootState } from '@/store/types';
import { ICommonState } from './types';

const state: ICommonState = {
  menu: [],
};

const mutations: MutationTree<ICommonState> = {
  SET_MENU(state: ICommonState, payload: []) {
    state.menu = [...payload];
  },
};
const actions: ActionTree<ICommonState, IRootState> = {
  async getSystemMenu({ commit }, data) {
    const res = await getMenu(data);
    commit('SET_MENU', res.data);
  },
};

export const common: Module<ICommonState, IRootState> = {
  state,
  mutations,
  actions,
};
