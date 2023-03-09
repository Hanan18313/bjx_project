import { Axios, typeJson, emptyJson } from '@/utils/axios';
import { KeyData } from '@/types/common';
import { api } from '@/config/api';
import { getSign, HrSign } from '@/service/sign';

const { EDUAPI, HR_USER_BASEURL } = api;

export const GtInit = () => {
  return Axios.post(HR_USER_BASEURL + '/api/Geetest/GetSign', {
    ...HrSign({
      ClientType: 'web',
    }),
    ...typeJson,
  });
};

export const sendSms = async (params: any) => {
  return await Axios.post(HR_USER_BASEURL + '/api/Sms/SendWithSign', {
    ...getSign({
      Phone: params.phone,
      FunctionType: 190,
      OtherSign: {
        SignType: 'geetest',
        Param: {
          clientType: 'web',
          fnGeetestChallenge: params.challenge,
          fnGeetestValidate: params.validate,
          fnGeetestSeccode: params.seccode,
        },
      },
      SignName: '一起21',
      RegionCode: '',
    }),
    ...typeJson,
  });
};

export const getToken = async (params: any): Promise<any> => {
  return await Axios.get(
    EDUAPI +
      `/api/v1/User/GetChannelTokne?phone=${params.phone}&code=${params.code}&EQP=${params.eqp}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
