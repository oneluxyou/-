import {request} from "umi";

export const getTodoLists = async () => {
  return request('/api/todolists')
}
