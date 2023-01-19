import mockjs from 'mockjs';

// 在使用mockJs的情况下 设置withCredentials = true，且未被拦截的跨域请求丢失cookies的问题
mockjs.XHR.prototype.proxy_send = mockjs.XHR.prototype.send;
mockjs.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false;
  }
  this.proxy_send(...arguments);
};

mockjs.mock(/\/menu/, {
  code: 200,
  data: [
    {
      name: '线索管理',
      icon: 'Clue',
      path: '/clue',
      key: '1',
      children: [
        {
          name: '培训线索',
          icon: '',
          path: '/clue/train',
          key: '1-1',
          children: [],
        },
        {
          name: '媒体线索',
          icon: '',
          path: '/clue/media',
          key: '1-2',
          children: [],
        },
        {
          name: 'RPO线索',
          icon: '',
          path: '/clue/rpo',
          key: '1-3',
          children: [],
        },
        {
          name: '公共线索池',
          icon: '',
          path: '/clue/pond',
          key: '1-4',
          children: [],
        },
      ],
    },
    {
      name: '系统管理',
      icon: 'System',
      path: '/system',
      key: '2',
      children: [
        {
          name: '字典管理',
          icon: '',
          path: '/system/dictionary',
          key: '2-1',
          children: [],
        },
        {
          name: '权限设置',
          icon: '',
          path: '/system/auth',
          key: '2-2',
          children: [],
        },
        {
          name: '菜单管理',
          icon: '',
          path: '/system/menu',
          key: '2-3',
          children: [],
        },
        {
          name: '其他设置',
          icon: '',
          path: '/system/other',
          key: '2-4',
          children: [],
        },
      ],
    },
  ],
  message: '操作成功',
  success: true,
});

mockjs.mock(/\/table\/list/, {
  code: 200,
  data: {
    current: 1,
    pages: 15,
    size: 10,
    total: 285,
    'records|10': [
      {
        'data1|+100000000': 1710518400000,
        'data2|+1': 10,
        data3: '北京 xx 有限公司',
        'data4|+2': 0,
        data5: '销售一组',
        data6: '北京',
        data7: '月结',
        data8: '20%',
        data9: '折扣备注',
        data10: '备注',
        data11: '是',
      },
    ],
  },
  message: '操作成功',
  success: true,
});
