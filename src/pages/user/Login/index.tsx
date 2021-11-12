import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import {PageContainer} from "@ant-design/pro-layout";
import request from "umi-request";
import {Button, Tag, Space, Menu, Dropdown, message, Tooltip, Modal, Table} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, {
  ProFormDigit,
  ModalForm,
  ProFormText,
  ProFormSelect,
}from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import Edit from './components/Edit'
import {get_after} from "@/services/myapi";





const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

//表单part

/**
 * 更新节点
 *
 * @param fields
 */


const TableList: React.FC = () => {

  //编辑part
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false)
  //控制模态框的显示和隐藏
  const isShowModalEdit = (show:boolean, id:any) => {
    setIsModalVisibleEdit(show)
    setEditId(id)
  }
  const [editId, setEditId] = useState(false)
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>()


  const onTableChange = () => {};
//表格part
  const column: ProColumns[] = [

    {
      title:'登记日期',
      dataIndex: '登记日期',
      hideInSearch:true,
      sorter: (a, b) => a.id - b.id,
      //数据库格式问题
    },
    {
      title:'登记人',
      dataIndex: '登记人',
      filters: true,
      onFilter: true,
    },
    {
      title: '店铺',
      dataIndex: '店铺',
      sorter: (a, b) => a.店铺 - b.店铺,
      hideInSearch:true,
      filters: true,
      onFilter: true,
    },
    {
      title:'订单号',
      dataIndex:'订单号',
      copyable: true,
      ellipsis: true,
      tip: '订单号过长会自动收缩',
    },
    {
      title: 'SKU',
      dataIndex: 'SKU',
    },
    {
      title:'处理方式',
      dataIndex:'处理方式',
      hideInSearch:true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        'Wait Reply': {text:'Wait Reply'},
        'Cancel Order': {text:'Cancel Order'},
        'Closed': {text:'Closed'},
        'Replacement': {text:'Replacement'},
        'Refund': {text:'Refund'},
        'Used': {text:'Used'},
        'Refund and Replacement': {text:'Refund and Replacement'},
        'Delivery Consultation': {text:'Delivery Consultation'}
      }
    },
    {
      title:'Refund',
      dataIndex:'Refund',
      hideInSearch:true,
      sorter: (a, b) => a.Refund - b.Refund,
    },
    {
      title:'Replacement',
      dataIndex:'Replacement',
      hideInSearch:true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        'RP-国外新件': {text:'RP-国外新件'},
        'RP-国外配件': {text:'RP-国外配件'},
        'RP-国外退件': {text:'RP-国外退件'},
        'RP-国内补寄配件': {text:'RP-国内补寄配件'},
      }
    },
    {
      title:'Used',
      dataIndex:'Used',
      hideInSearch:true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        '买家承担': {text:'买家承担'},
        '卖家承担-上门取件': {text:'卖家承担-上门取件'},
        '卖家承担-退货标签': {text:'卖家承担-退货标签'},
        '拦截': {text:'拦截'},
      }
    },
    {
      title:'原因',
      dataIndex:'原因',
      hideInSearch:true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        '少配件': {text:'少配件'},
        '外观问题（安装前）': {text:'外观问题（安装前）'},
        '组装问题（安装中）': {text:'组装问题（安装中）'},
        '结构问题（安装后）': {text:'结构问题（安装后）'},
        '其它质量问题': {text:'其它质量问题'},
        '质量&少配件': {text:'质量&少配件'},
        '运输破损': {text:'运输破损'},
        '仓库': {text:'仓库'},
        '快递': {text:'快递'},
        '买家': {text:'买家'},
        '销售': {text:'销售'},
      }
    },
    {
      title:'售后反馈',
      dataIndex:'售后反馈',
      ellipsis: true,
      tip: '过长会自动收缩',
      hideInSearch:true,
    },
    {
      title:'备注',
      dataIndex:'备注',
      ellipsis: true,
      tip: '备注过长会自动收缩',
      hideInSearch:true,
    },
    {
      title: '操作',
      valueType: 'option',

      render: (text, record, _, action) => [
        <a
          onClick={() => {
            isShowModalEdit(true, record.id);
          }}
        >
          编辑
        </a>
      ]
    },
  ]
  return (
    <PageContainer>
      <ProForm<{
        name: string;
        company: string;
      }
      >
        autoComplete="on"
        formRef={formRef}
        onFinish={async (values,...rest) => {
          await waitTime(1000);
          console.log(values);

          return request(`http://www.onelux.club:5000/`, {
            method: 'POST',
            data: {...values},
            requestType: 'form',
          }).then(res=>{
            //自行根据条件清除
            console.log(res)
            if (res === 'OK'){
              message.success('提交成功');
            }
            else{
              message.error('订单号已存在')
            }
            formRef.current?.resetFields();
          });
        }
        }


      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="登记人"
            label="登记人"
            placeholder="请输入名称"
            tooltip="请勿输入渠道SKU/订单号/包裹号"
            rules={[{ required: true, message: '请输入名称!' }]}
          />
          <ProFormSelect
            width="md"
            name="店铺"
            label="店铺"
            placeholder="请输入店铺"
            valueEnum={{
              赫曼:'赫曼',
              信盒:'信盒',
              宫本:'宫本',
              森月:'森月',
              维禄:'维禄',
              玲琅:'玲琅',
              信盒_法国:'信盒-法国',
              信盒_意大利:'信盒-意大利',
              信盒_西班牙:'信盒-西班牙',
              Wayfair_信盒:'Wayfair-信盒',
              Wayfair_维禄:'Wayfair-维禄',
              Walmart_优瑞斯特:'Walmart-优瑞斯特',
              Walmart_赫曼:'Walmart-赫曼',
              Walmart_信盒:'Walmart-信盒',
              Walmart_宫本:'Walmart-宫本',
              eBay_玲琅:'eBay-玲琅',
              eBay_治润:'eBay-治润',
              eBay_雅秦:'eBay-雅秦',
              Nextfur_Shopify:'Nextfur-Shopify',
            }}
            rules={[{ required: true, message: '请输入店铺!' }]}
          />
          <ProFormText width="md" name="订单号" label="订单号" rules={[{ required: true, message: '请输入订单号!' }]}/>
          <ProFormText width="md" name="SKU" label="SKU" tooltip="请勿输入渠道SKU/订单号/包裹号" placeholder="两箱包形如'USAN1018800-5,USAN1018800-6'" rules={[{ required: true, message: '两箱包的请输入两个公司SKU'}]}/>
          <ProFormSelect
            width="md"
            name="处理方式"
            label="处理方式"
            placeholder="请输入处理方式"
            valueEnum={{
              Wait_Reply:'Wait Reply',
              Cancel_Order:'Cancel Order',
              Closed:'Closed',
              Replacement:'Replacement',
              Refund:'Refund',
              Used:'Used',
              Refund_and_Replacement:'Refund and Replacement',
              Delivery_Consultation:'Delivery Consultation',
            }}
            rules={[{ required: true, message: '请输入处理方式!' }]}
          />
          <ProFormDigit
            width="md"
            name="Refund"
            label="Refund"
            placeholder=""
            initialValue="0"
            tooltip="若无退款,默认输入0"
            rules={[{ required: true, message: '若无退款,请输入0' }]}
          />
          <ProFormSelect
            width="md"
            name="原因"
            label="原因"
            placeholder="请输入原因"
            valueEnum={{
              少配件:'少配件',
              外观问题:'外观问题（安装前）',
              组装问题:'组装问题（安装中）',
              结构问题:'结构问题（安装后）',
              其它质量问题:'其它质量问题',
              质量少配件:'质量&少配件',
              运输破损:'运输破损',
              仓库:'仓库',
              快递:'快递',
              买家:'买家',
              销售:'销售',
            }}
            rules={[{ required: true, message: '请输入原因!' }]}
          />
          <ProFormSelect
            width="md"
            name="Replacement"
            label="Replacement"
            valueEnum={{
              RP_国外新件:'RP-国外新件',
              RP_国外配件:'RP-国外配件',
              RP_国外退件:'RP-国外退件',
              RP_国内补寄配件:'RP-国内补寄配件',
            }}
          />
          <ProFormSelect
            width="md"
            name="Used"
            label="退件"
            valueEnum={{
              买家承担:'买家承担',
              卖家承担_上门取件:'卖家承担-上门取件',
              卖家承担_退货标签:'卖家承担-退货标签',
              拦截:'拦截',
            }}
          />
          <ProFormText width="md" name="售后反馈" label="售后反馈" />
          <ProFormText width="xl" name="备注" label="备注" />
        </ProForm.Group>
      </ProForm>
      <br/>

      <ProTable

        search={{
        labelWidth:"auto",
        span: 10,
        defaultCollapsed:false,
        }}
        columns={column}
        actionRef={actionRef}
        onChange={onTableChange}


        request={async (params = {}) => get_after(params)}

        pagination={{
          pageSize: 100,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
      />
      {
        !isModalVisibleEdit ? '':
          <Edit
            isModalVisible={isModalVisibleEdit}
            isShowModal={isShowModalEdit}
            actionRef={actionRef}
            editId={editId}
          />
      }
    </PageContainer>
  );
}

export default TableList

