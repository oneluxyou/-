// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function login(values: any) {
  return request('/api/receive', {
    method: 'POST',
    data: { ...values },
    requestType: 'form',
  });
}
export async function queryafter(): Promise<{ data: any }> {
  return request('/api/after/change');
}

export async function updateRule(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/api/rule', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/*
 * 更新售后
 * @param params
 * @returns
 */
export async function edit_after(editId: any) {
  console.log(editId);
  return request('/api/after/change', {
    method: 'PUT',
    data: { editId },
    requestType: 'form',
  });
}

/*
周转的data数据
 */
export async function get_zhouzhuan_data(params: any) {
  console.log(params);
  return request('/api/zhouzhuan/data', {
    method: 'POST',
    data: { ...params },
    requestType: 'form',
  });
}

export async function edit_sku(editId: any) {
  console.log(editId);
  return request('/api/sku/change', {
    method: 'PUT',
    data: { editId },
    requestType: 'form',
  });
}
