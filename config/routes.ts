export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/after',
    icon: 'smile',
    name: 'after',
    access: 'AllManager',
    routes: [
      {
        path: '/after/add',
        name: '售后登记',
        icon: 'smile',
        component: './After',
      },
    ],
  },
  // {
  //   path: '/match',
  //   name: '匹配表',
  //   icon: 'crown',
  //   routes: [
  //     {
  //       path: '/match/index',
  //       name: '对应信息更新',
  //       icon: 'smile',
  //       component: './match/index',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   path: '/dashboard',
  //   name: '销售预报',
  //   icon: 'crown',
  //   access: 'MatchManager',
  //   routes: [
  //     // {
  //     //   path: '/dashboard/saleTotal',
  //     //   name: '销售汇总',
  //     //   icon: 'smile',
  //     //   component: './dashboard/saleTotal/index',
  //     //   access: 'Skusaler',
  //     // },
  //     {
  //       path: '/dashboard/skuTotal',
  //       name: '各sku序号销售情况',
  //       icon: 'smile',
  //       component: './dashboard/skuTotal/index',
  //     },
  //     {
  //       path: '/dashboard/saleRank',
  //       name: '销售报表',
  //       icon: 'smile',
  //       component: './dashboard/saleRank/index',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   path: '/welcome',
  //   name: '周转表',
  //   icon: 'TableOutlined',
  //   component: './Table',
  // },
  // {
  //   path: '/inventory',
  //   name: '库存分布表',
  //   icon: 'smile',
  //   component: './inventory',
  // },
  {
    path: '/todo',
    icon: 'HeatMapOutlined',
    name: 'todo',
    component: './Todo',
  },
  {
    path: '/',
    redirect: '/todo',
  },
  {
    component: './404',
  },
];
