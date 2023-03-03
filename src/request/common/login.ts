import { Axios } from '@/utils/axios';
import { KeyData } from '@/types/common';
import { api } from '@/config/api';
import { getSign, HrSign } from '@/config/sign';

const { EDUAPI, HR_USER_BASEURL } = api;

export const GtInit = () => {
  return Axios.post(HR_USER_BASEURL + '/api/Geetest/GetSign', {
    ...HrSign({
      ClientType: 'web',
    }),
  });
};

export const sendSms = async (data: any) => {
  return await Axios.post(EDUAPI + '/api/Sms/SendWithSign', {
    ...getSign({
      Phone: data.phone,
      FunctionType: 190,
      OtherSign: {
        SignType: 'geetest',
        Param: {
          clientType: 'web',
          fnGeetestChallenge: data.challenge,
          fnGeetestValidate: data.validate,
          fnGeetestSeccode: data.seccode,
        },
      },
      SignName: '一起21',
      RegionCode: '',
    }),
  });
};
