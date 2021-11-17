// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function login(values: any) {
  return request('http://www.onelux.club:5000/receive', {
    method: 'POST',
    data: {...values},
    requestType:'form',
  });
}
export async function queryafter(): Promise<{ data: any }> {
  return request('http://www.onelux.club:5000/after/change');
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
export async function edit_after(editId:any) {
  console.log(editId)
  return request( 'http://www.onelux.club:5000/after/change',{
    method:'PUT',
    data: {editId},
    requestType: 'form',
  })
}


/*
*获取按照订单搜索的售后
 */
export async function get_after(params:any){
  console.log(params)
  return request('http://www.onelux.club:5000/aftersale', {
    method:'POST',
    data: {...params},
    requestType: 'form',
  });
}


/*
周转的data数据
 */
export async function get_zhouzhuan_data(params:any){
  console.log(params)
  return request('http://www.onelux.club:5000/zhouzhuan/data',{
    method:'POST',
    data:{...params},
    requestType: 'form',
  })
}


