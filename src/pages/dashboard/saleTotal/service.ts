import { request } from 'umi';

export async function fakeChartData() {
  return request('/test');
}
