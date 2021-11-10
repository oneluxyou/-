import React from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Button,Alert} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {getTodoLists} from "@/services/todo";

const status = [
    <Alert message="已完成" type="success" showIcon />,
    <Alert message="待办" type="info" showIcon />,
    <Alert message="已取消" type="error" showIcon />,
]

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render:(_,record) => {return status[record.status]}
  },
  {
    title: '修改状态',
    render:() => [
      <a>待办 </a>,
      <a>已完成 </a>,
      <a>已取消 </a>,
    ]
  },
]



const Todo = () => {
  let [data, setData] = useState([])
  useEffect(async () => {
    const resData = await getTodoLists()
    setData(resData)
  }, [])

  return (
    <ProTable
      columns={columns}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={false}
      dateFormatter="string"
      headerTitle="待办事项列表"
      //dataSource={data}
      request={async () => ({data: await getTodoLists()})}
      toolBarRender={() => [
        <Button type="primary" key="primary">
          <PlusOutlined />新建
        </Button>,
      ]}
    />
  );
};

export default Todo;
