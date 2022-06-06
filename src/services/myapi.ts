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
// 售后页面的编辑功能
export async function edit_after(editId: any) {
  console.log(editId);
  return request('/api/after/change', {
    method: 'PUT',
    data: { editId },
    requestType: 'form',
  });
}
// 其他售后页面的【售后登记】的编辑
export async function edit_after_after(editOrder: any, editSKU: any) {
  console.log(editOrder, editSKU);
  return request('/api/after/changeafter', {
    method: 'PUT',
    data: { editOrder, editSKU },
    requestType: 'form',
  });
}

// export async function edit_afterafter(editId: any) {
//   console.log(editId);
//   return request('/api/after/change', {
//     method: 'PUT',
//     data: { editId },
//     requestType: 'form',
//   });
// }
// AZ的编辑
export async function edit_after_az(editId: any) {
  console.log(editId);
  return request('/api/after/changeaz', {
    method: 'PUT',
    data: { editId },
    requestType: 'form',
  });
}

export async function edit_after_az_sku(
  editId: any,
  editOrder: any,
  editSKU: any,
  editSaler: any,
  editStore: any,
) {
  return request('/api/after/changeaz', {
    method: 'PUT',
    data: { editId, editOrder, editSKU, editSaler, editStore },
    requestType: 'form',
  });
}
// FB的编辑
export async function edit_after_fb(editId: any) {
  console.log(editId);
  return request('/api/after/changefb', {
    method: 'PUT',
    data: { editId },
    requestType: 'form',
  });
}

export async function edit_after_fb_sku(
  editId: any,
  editOrder: any,
  editSKU: any,
  editSaler: any,
  editStore: any,
) {
  return request('/api/after/changefb', {
    method: 'PUT',
    data: { editId, editOrder, editSKU, editSaler, editStore },
    requestType: 'form',
  });
}

export async function edit_after2021(editId: any) {
  console.log(editId);
  return request('/api/after/change2021', {
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
