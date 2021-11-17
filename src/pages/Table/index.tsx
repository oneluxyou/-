import React from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {get_zhouzhuan_data} from "@/services/myapi";
import {useRequest} from "@@/plugin-request/request";



const App: React.FC = () => {

  const { data } = useRequest({
    url: 'http://www.onelux.club:5000/zhouzhuan/columns',
    method: 'get',
  });

  const arr = [];
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      arr.push({
        title: data[key].title,
        dataIndex: data[key].dataIndex,
        width: data[key]?.width || '',
        fixed: data[key]?.fixed || '',
        hideInSearch: data[key]?.hideInSearch || ''
      })
    }
  }

  return(
    <PageContainer>
      <ProTable
        columns = {arr}

        scroll={{ x: 1000, y: 400 }}
        request={async () => get_zhouzhuan_data()}
        search={{
          labelWidth:"auto",
          span: 8,
          defaultCollapsed:false,
        }}
        bordered
        title={() => 'SKU序号周转表'}
      />
    </PageContainer>
  )
}

export default App
