/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  // console.log(currentUser && currentUser.authority === 'leader');
  // console.log(currentUser?.authority);
  return {
    Skusaler: () =>
      currentUser && (currentUser.authority === 'admin' || currentUser.authority === 'leader'),
  };
}
