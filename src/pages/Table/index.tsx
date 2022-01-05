import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { get_zhouzhuan_data } from "@/services/myapi";
import { useRequest } from "@@/plugin-request/request";



const App: React.FC = () => {

  const onTableChange = () => { };
  const { data } = useRequest({
    url: '/api/zhouzhuan/columns',
    method: 'get',
  });
  const actionRef = useRef<ActionType>();
  const arr = [];
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      arr.push({
        title: data[key].title,
        dataIndex: data[key].dataIndex,
        width: data[key]?.width || '',
        fixed: data[key]?.fixed || '',
        hideInSearch: data[key]?.hideInSearch || '',
        ellipsis: data[key]?.ellipsis || '',
        valueEnum: data[key]?.valueEnum || ''
      })
    }
  }

  return (
    <PageContainer>
      <ProTable
        columns={arr}
        request={async (params = {}) => get_zhouzhuan_data(params)}

        search={{
          labelWidth: "auto",
          span: 8,
          defaultCollapsed: false,
        }}

        actionRef={actionRef}
        onChange={onTableChange}

        pagination={{
          pageSize: 100,
        }}

        scroll={{ x: 1000, y: 400 }}

        headerTitle='SKU序号周转表'

      />
    </PageContainer>
  )
}

export default App
