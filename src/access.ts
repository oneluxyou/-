/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  // console.log(currentUser && currentUser.authority === 'leader');
  // console.log(currentUser?.authority);
  return {
    // 匹配表页面权限
    MatchPage: () =>
      currentUser &&
      (currentUser.authority == 'admin' ||
        currentUser.authority == 'manager' ||
        currentUser.authority == 'leader' ||
        currentUser.authority == 'saler' ||
        currentUser.authority == 'after_saler' ||
        currentUser.authority == 'after_sale_manager' ||
        currentUser.authority == 'after_sale_leader'),
    // 匹配表页面修改
    MatchManager: () =>
      currentUser &&
      (currentUser.authority == 'admin' ||
        currentUser.authority == 'manager' ||
        currentUser.authority == 'leader'),
    // 匹配表导出权限
    MatchExcel: () =>
      currentUser &&
      (currentUser.authority == 'admin' ||
        currentUser.authority == 'manager' ||
        currentUser.authority == 'leader' ||
        currentUser.authority == 'after_sale_leader' ||
        currentUser.authority == 'after_sale_manager'),
    // 售后导出权限
    AfterExcel: () =>
      currentUser &&
      (currentUser.authority == 'admin' ||
        currentUser.authority == 'leader' ||
        currentUser.authority == 'after_sale_leader' ||
        currentUser.authority == 'after_sale_manager'),
    // 售后页面修改
    AfterManager: () =>
      currentUser &&
      (currentUser.authority == 'admin' ||
        currentUser.authority == 'manager' ||
        currentUser.authority == 'leader' ||
        currentUser.authority == 'saler' ||
        currentUser.authority == 'after_saler' ||
        currentUser.authority == 'after_sale_manager' ||
        currentUser.authority == 'after_sale_leader'),
    // 销售预报页面权限
    SalerManager: () =>
      currentUser &&
      (currentUser.authority == 'admin' ||
        currentUser.authority == 'manager' ||
        currentUser.authority == 'leader'),
    // 售后原因销售权限
    SalerAuth: () =>
      currentUser &&
      (currentUser.authority == 'admin' ||
        currentUser.authority == 'manager' ||
        currentUser.authority == 'leader' ||
        currentUser.authority == 'after_saler' ||
        currentUser.authority == 'after_sale_manager' ||
        currentUser.authority == 'saler'),
    // 售后原因非销售权限权限
    NotSalerAuth: () =>
      currentUser &&
      (currentUser.authority == 'develop' ||
        currentUser.authority == 'developmanager' ||
        currentUser.authority == 'after_sale_leader'),
    // 售后页面权限
    AfterPage: () =>
      currentUser &&
      (currentUser.authority == 'admin' ||
        currentUser.authority == 'manager' ||
        currentUser.authority == 'saler' ||
        currentUser.authority == 'develop' ||
        currentUser.authority == 'developmanager' ||
        currentUser.authority == 'after_sale' ||
        currentUser.authority == 'after_sale_manager' ||
        currentUser.authority == 'after_sale_leader'),
  };
}
