﻿export default [
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
    path: '/welcome',
    name: '周转表',
    icon: 'TableOutlined',
    component: './Table',
  },
  {
    path: '/todo',
    icon: 'HeatMapOutlined',
    name: 'todo',
    component: './Todo',
  },
  {
    path: '/after',
    icon: 'smile',
    name: 'after',
    routes: [
      {
        path: '/after/add',
        name: '售后登记',
        icon: 'smile',
        component: './After',
      },
    ],
  },
  {
    path: '/match',
    name: '匹配表',
    icon: 'crown',
    access: 'MatchManager',
    routes: [
      {
        path: '/match/index',
        name: '对应信息更新',
        icon: 'smile',
        component: './match/index',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '仪表盘',
    icon: 'crown',
    routes: [
      {
        path: '/dashboard/saleTotal',
        name: '销售汇总',
        icon: 'smile',
        component: './dashboard/saleTotal/index',
        access: 'Skusaler',
      },
      // {
      //   path: '/dashboard/skuTotal',
      //   name: 'sku汇总',
      //   icon: 'smile',
      //   component: './dashboard/skuTotal/index',
      // },
      // {
      //   path: '/dashboard/saleRank',
      //   name: '组别销售情况',
      //   icon: 'smile',
      //   component: './dashboard/saleRank/index',
      // },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/todo',
  },
  {
    component: './404',
  },
];
