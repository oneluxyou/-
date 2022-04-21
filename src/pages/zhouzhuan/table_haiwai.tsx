import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";

import request from "umi-request";



const App: React.FC = () => {

  const onTableChange = () => { };
  const actionRef = useRef<ActionType>();
  let arr: ProColumns<Record<string, any>, "text">[] | { title: never; dataIndex: never; fixed?: string; width: number; ellipsis?: boolean; hideInSearch?: boolean; }[] | undefined = [];
  const [dataname, setdataname] = useState([]);
  if (dataname.length == 0) {
    arr = [
      {
        title: 'SKU序号',
        dataIndex: 'SKU序号',
      },
      {
        title: 'SKU',
        dataIndex: 'SKU',
      },
    ]
  } else {
    arr = [
      {
        title: 'SKU序号',
        dataIndex: 'SKU序号',
        fixed: 'left',
        width: 50
      }, {
        title: 'SKU',
        dataIndex: 'SKU',
        fixed: 'left',
        ellipsis: true,
        width: 100
      }, {
        title: 'x',
        dataIndex: 'x',
        fixed: 'left',
        width: 100,
        hideInSearch: true,
      }, {
        title: 'xxx',
        dataIndex: 'xxx',
        fixed: 'left',
        width: 80,
        hideInSearch: true,
      }
    ]
  }
  for (const key in dataname) {
    if (Object.prototype.hasOwnProperty.call(dataname, key)) {
      if (key > 3) {
        arr.push({
          title: dataname[key],
          dataIndex: dataname[key],
          width: 70,
          hideInSearch: true,
        })
      }


    }
  }

  return (
    <PageContainer>
      <ProTable
        columns={arr}
        request={async (params = {}) => {
          const result = request('/api/zhouzhuan/tableouthaiwai', {
            method: 'post',
            data: { ...params },
            requestType: 'form',
          });

          const resultdata = await result
          setdataname(resultdata.dataname)
          return result
        }}
        search={{
          labelWidth: "auto",
          span: 8,
          defaultCollapsed: false,
        }}



        actionRef={actionRef}
        onChange={onTableChange}

        pagination={{
          pageSize: 20,
        }}

        scroll={{ x: 1000, y: 400 }}

        headerTitle='SKU序号周转表-海外仓'

      />
    </PageContainer>
  )
}

export default App
