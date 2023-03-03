import MD5 from 'md5';

const OS = 1;
const BA = 'admin';
const BP = '';
const Ver = '500';
const XAppId = 'bjx.project.admin';

export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .toUpperCase();
};
//获取设备ID
export const getEQP = () => {
  let _guid = window.localStorage.getItem('EQP');
  if (!_guid) {
    _guid = guid().toString();
    window.localStorage.setItem('EQP', _guid);
  }
  return _guid;
};
//延迟5分钟
function getTs() {
  return new Date().valueOf() + 300000;
}
export const getSign = (data: any) => {
  const eqp = getEQP();
  const ts = getTs();
  const text =
    'EQP=' +
    eqp +
    '&OS=' +
    OS +
    '&BA=' +
    BA +
    '&BP=' +
    BP +
    '&Ver=' +
    Ver +
    '&TS=' +
    ts +
    '&XAppId=' +
    XAppId +
    '+%SiGn2021!@#';
  const sign = MD5(text);

  data = data || {};

  data.EQP = eqp;
  data.OS = OS;
  data.BA = BA;
  data.BP = BP;
  data.Ver = Ver;
  data.TS = ts;
  data.XAppId = XAppId;
  data.Sign = sign;
  return data;
};

export const HrSign = (data: any) => {
  let EQP = window.localStorage.getItem('EQP');
  if (!EQP) {
    try {
      EQP = window['x-app-token'].split('-')[6] || '121212121212';

      window.localStorage.setItem('EQP', EQP);
    } catch {}
  }

  data.EQP = EQP;
  data.OS = 5;
  data.BA = '';
  data.BP = '';
  data.Ver = '0.9.0';
  data.Ts = new Date().getTime() / 1000;
  var str = `EQP=${data.EQP}&OS=${data.OS}&BA=${data.BA}&BP=${data.BP}&Ver=${data.Ver}}&TS=${data.Ts}`;

  data.Sign = MD5(str);
  return data;
};
