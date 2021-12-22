// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function login(values: any) {
  return request('/receive', {
    method: 'POST',
    data: { ...values },
    requestType: 'form',
  });
}
export async function queryafter(): Promise<{ data: any }> {
  return request('/after/change');
}

export async function updateRule(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/rule', {
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
  return request('http://192.168.1.115:5000/after/change', {
    method: 'PUT',
    data: { editId },
    requestType: 'form',
  });
}

/*
 *获取按照订单搜索的售后
 */
export async function get_after(params: any) {
  console.log(params);
  return request('/aftersale', {
    method: 'POST',
    data: { ...params },
    requestType: 'form',
  });
}

/*
周转的data数据
 */
export async function get_zhouzhuan_data(params: any) {
  console.log(params);
  return request('http://192.168.1.115:5000/zhouzhuan/data', {
    method: 'POST',
    data: { ...params },
    requestType: 'form',
  });
}

export async function edit_sku(editId: any) {
  console.log(editId);
  return request('http://192.168.1.115:5000/sku/change', {
    method: 'PUT',
    data: { editId },
    requestType: 'form',
  });
}
