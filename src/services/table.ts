import {request} from "umi";

export const gettable = async () => {
  return request('/api/table')
}
