import { Axios } from '@/utils/axios';
import { KeyData } from '@/types/common';

// 获取系统菜单
export const getMenu = async (params: KeyData) => Axios.post('/menu', params);
