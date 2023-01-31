import { Axios } from '@/utils/axios';
import { KeyData } from '@/types/common';
import { api } from '@/config/api';

const { EDUAPI, HRCOMMONAPI } = api;

// 获取系统菜单
export const getMenu = async (params: KeyData) => Axios.post('/menu', params);
