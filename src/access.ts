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
      (currentUser.authority === 'admin' ||
        currentUser.authority === 'manager' ||
        currentUser.authority === 'saler' ||
        currentUser.authority === 'after_sale'),
    // 匹配表页面修改
    MatchManager: () =>
      currentUser &&
      (currentUser.authority === 'admin' ||
        currentUser.authority === 'manager' ||
        currentUser.authority === 'after_sale'),
    // 销售预报页面权限
    SalerManager: () =>
      currentUser && (currentUser.authority === 'admin' || currentUser.authority === 'manager'),
    // 售后页面权限
    AfterPage: () =>
      currentUser &&
      (currentUser.authority === 'admin' ||
        currentUser.authority === 'manager' ||
        currentUser.authority === 'saler' ||
        currentUser.authority === 'develop' ||
        currentUser.authority === 'developmanager' ||
        currentUser.authority === 'after_sale'),
  };
}
