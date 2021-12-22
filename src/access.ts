/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  // console.log(currentUser && currentUser.authority === 'leader');
  // console.log(currentUser?.authority);
  return {
    // 销售汇总页面权限
    Skusaler: () =>
      currentUser && (currentUser.authority === 'admin' || currentUser.authority === 'leader'),
    // 匹配表页面权限
    MatchManager: () =>
      currentUser && (currentUser.authority === 'admin' || currentUser.authority === 'manager'),
  };
}
