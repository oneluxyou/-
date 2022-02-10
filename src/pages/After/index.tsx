/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from "@ant-design/pro-layout";
import request from "umi-request";
import { Button, Tag, Space, Menu, Dropdown, message, Tooltip, Modal, Table, AutoComplete, Col, Row } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, {
  ProFormDigit,
  ModalForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import Edit from './components/Edit'
import { get_after } from "@/services/myapi";
import { useRequest } from 'umi';
import { useModel } from 'umi';

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
  const { data } = useRequest({
    url: '/api/sku/static',
    method: 'get',
  });
  //编辑part
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false)
  //控制模态框的显示和隐藏
  const isShowModalEdit = (show: boolean, id: any) => {
    setIsModalVisibleEdit(show)
    setEditId(id)
  }
  const [editId, setEditId] = useState(false)
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const onTableChange = () => { };
  //表格part
  const column: ProColumns[] = [

    {
      title: '登记日期',
      dataIndex: '登记日期',
      hideInSearch: true,
      sorter: (a, b) => a.id - b.id,
      //数据库格式问题
    },
    {
      title: '登记人',
      dataIndex: '登记人',
      filters: true,
      onFilter: true,
    },
    {
      title: '店铺',
      dataIndex: '店铺',
      sorter: (a, b) => a.店铺 - b.店铺,
      hideInSearch: true,
      filters: true,
      onFilter: true,
    },
    {
      title: '订单号',
      dataIndex: '订单号',
      copyable: true,
      ellipsis: true,
      tip: '订单号过长会自动收缩',
    },
    {
      title: 'SKU',
      dataIndex: 'SKU',
    },
    {
      title: '处理方式',
      dataIndex: '处理方式',
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        'Refund': { text: 'Refund' },
        'Replacement': { text: 'Replacement' },
        'Refund and Replacement': { text: 'Refund and Replacement' },
        'Delivery Consultation': { text: 'Delivery Consultation' },
        'Wait Reply': { text: 'Wait Reply' },
        'Return': { text: 'Return' },
        'Return and Replacement': { text: 'Return and Replacement' },
      }
    },
    {
      title: 'Refund',
      dataIndex: 'Refund',
      hideInSearch: true,
      sorter: (a, b) => a.Refund - b.Refund,
    },
    {
      title: 'Replacement',
      dataIndex: 'Replacement',
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        'RP-国外新件': { text: 'RP-国外新件' },
        'RP-国外配件': { text: 'RP-国外配件' },
        'RP-国外退件': { text: 'RP-国外退件' },
        'RP-国内补寄配件': { text: 'RP-国内补寄配件' },
        'RP-电子说明书': { text: 'RP-电子说明书' },
      }
    },
    {
      title: '物流操作',
      dataIndex: 'Used',
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        '买家承担': { text: '买家承担' },
        '卖家承担-上门取件': { text: '卖家承担-上门取件' },
        '卖家承担-退货标签': { text: '卖家承担-退货标签' },
        '拦截': { text: '拦截' },
        '拒收': { text: '拒收' },
        '修改地址': { text: '修改地址' }
      }
    },
    {
      title: '原因',
      dataIndex: '原因',
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        '少配件': { text: '少配件' },
        '外观问题（安装前）': { text: '外观问题（安装前）' },
        '组装问题（安装中）': { text: '组装问题（安装中）' },
        '结构问题（安装后）': { text: '结构问题（安装后）' },
        '其它质量问题': { text: '其它质量问题' },
        '质量&少配件': { text: '质量&少配件' },
        '运输破损': { text: '运输破损' },
        '仓库': { text: '仓库' },
        '快递': { text: '快递' },
        '买家': { text: '买家' },
        '销售': { text: '销售' },
      }
    },
    {
      title: '售后反馈',
      dataIndex: '售后反馈',
      ellipsis: true,
      tip: '过长会自动收缩',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: '备注',
      ellipsis: true,
      tip: '备注过长会自动收缩',
      hideInSearch: true,
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
  // 表单缓存
  const storage = window.localStorage;
  const temp_dict = [new Array(), new Array(), new Array(), new Array(), new Array()] as any;
  let temp_data = new Array();
  const item_dict = ['dengji', 'osku', 'shouhou', 'beizhu'];
  const form_dict = ['登记人', 'SKU', '售后反馈', '备注'];
  const renderItem = (title: string, index: number, item: string) => ({
    value: title,
    label: (
      <span>
        {title}
        <a
          style={{ float: 'right' }}
          onClick={() => {
            temp_dict[item_dict.indexOf(item)] = [];
            const item_data = eval(storage[item]).split('|');
            item_data.splice(index, 1);
            for (const key in item_data) {
              if (Object.prototype.hasOwnProperty.call(item_data, key)) {
                const element = item_data[key];
                temp_dict[item_dict.indexOf(item)].push(renderItem(element, parseInt(key), item));
              }
            }
            let temp_storage = item_data.join('|');
            temp_storage = JSON.stringify(temp_storage);
            storage[item] = temp_storage;
            //自行根据条件清除
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            if (item_dict.indexOf(item) == 0) {
              setdengji(temp_dict[0]);
            } else if (item_dict.indexOf(item) == 1) {
              setosku(temp_dict[1]);
            } else if (item_dict.indexOf(item) == 2) {
              setshouhou(temp_dict[2]);
            } else if (item_dict.indexOf(item) == 3) {
              setbeizhu(temp_dict[3]);
            }
          }}
        >
          Delete
        </a>
      </span>
    )
  }
  );
  for (const key in item_dict) {
    if (Object.prototype.hasOwnProperty.call(item_dict, key)) {
      const element = item_dict[key];
      if (element in storage) {
        temp_dict[key] = new Array();
        temp_data = eval(storage[element]).split('|');
        for (const key2 in temp_data) {
          if (Object.prototype.hasOwnProperty.call(temp_data, key2)) {
            const i = temp_data[key2];
            temp_dict[key].push(renderItem(i, parseInt(key2), item_dict[key]));
          }
        }
      }
    }
  }
  const { initialState } = useModel('@@initialState');
  const [dengji, setdengji] = useState(temp_dict[0]) as any;
  const [osku, setosku] = useState(temp_dict[1]) as any;
  const [shouhou, setshouhou] = useState(temp_dict[2]) as any;
  const [beizhu, setbeizhu] = useState(temp_dict[3]) as any;
  return (
    <PageContainer>
      <ProForm<{
        name: string;
        company: string;
      }
      >
        autoComplete="on"
        formRef={formRef}
        initialValues={{
          '登记人': initialState.currentUser?.name
        }}
        onFinish={async (values, ...rest) => {
          let sku_in = true;
          let temp_sku = values['SKU'].replace('，', ',');
          temp_sku = temp_sku.replace('	', '');
          temp_sku = temp_sku.replace(' ', '');
          const sku = temp_sku.split(',');
          sku.forEach((element: string) => {
            if (!data.sku_name.find((item: string) => item == element)) {
              sku_in = false;
              message.error('传入的SKU:' + element + '不正确(注:捆绑sku要拆成产品sku)');
            }
          });

          if (sku_in == true) {
            return request(`/api/afterinsert`, {
              method: 'POST',
              data: { ...values },
              requestType: 'form',
            }).then(res => {
              //自行根据条件清除
              console.log(res);
              message.success('提交成功');
              for (const key in item_dict) {
                temp_dict[key] = new Array();
                if (item_dict[key] in storage) {
                  temp_data = eval(storage[item_dict[key]]).split('|');
                  for (const key2 in temp_data) {
                    if (Object.prototype.hasOwnProperty.call(temp_data, key2)) {
                      const element = temp_data[key2];
                      temp_dict[key].push(renderItem(element, parseInt(key2), item_dict[key]));
                    }
                  }
                  if (temp_data.indexOf(values[form_dict[key]]) == -1) {
                    temp_data.push(values[form_dict[key]]);
                    temp_dict[key].push(renderItem(values[form_dict[key]], temp_data.length - 1, item_dict[key]));
                    console.log('提交后', temp_data)
                    let temp_storage = temp_data.join('|');
                    temp_storage = JSON.stringify(temp_storage);
                    storage[item_dict[key]] = temp_storage;
                    //自行根据条件清除
                    if (parseInt(key) == 0) {
                      setdengji(temp_dict[0]);
                    } else if (parseInt(key) == 1) {
                      setosku(temp_dict[1]);
                    } else if (parseInt(key) == 2) {
                      setshouhou(temp_dict[2]);
                    } else if (parseInt(key) == 3) {
                      setbeizhu(temp_dict[3]);
                    }
                  }
                } else {
                  temp_data = []
                  temp_data.push(values[form_dict[key]]);
                  temp_dict[key].push(renderItem(values[form_dict[key]], temp_data.length - 1, item_dict[key]));
                  let temp_storage = temp_data.join('|');
                  temp_storage = JSON.stringify(temp_storage);
                  storage[item_dict[key]] = temp_storage;
                  //自行根据条件清除
                  if (parseInt(key) == 0) {
                    setdengji(temp_dict[0]);
                  } else if (parseInt(key) == 1) {
                    setosku(temp_dict[1]);
                  } else if (parseInt(key) == 2) {
                    setshouhou(temp_dict[2]);
                  } else if (parseInt(key) == 3) {
                    setbeizhu(temp_dict[3]);
                  }
                }
              }
              formRef.current?.resetFields();
            });
          }
        }
        }

      >
        <Row>
          <Col span={5}>
            <ProForm.Item
              name="登记人"
              label="登记人"
              tooltip="请勿输入渠道SKU/订单号/包裹号"
              rules={[{ required: true, message: '请输入登记人!' }]}
            >
              <AutoComplete
                placeholder="请输入名称"
                options={dengji}
              />
            </ProForm.Item>
          </Col>
          <Col span={5} offset={1}>
            <ProForm.Item
              name="店铺"
              label="店铺"
              rules={[{ required: true, message: '请输入店铺!' }]}
            >
              <ProFormSelect
                width="md"
                valueEnum={{
                  '赫曼': '赫曼',
                  '信盒': '信盒',
                  '宫本': '宫本',
                  '森月': '森月',
                  '维禄': '维禄',
                  '玲琅': '玲琅',
                  '信盒-法国': '信盒-法国',
                  '信盒-意大利': '信盒-意大利',
                  '信盒-西班牙': '信盒-西班牙',
                  'Wayfair-信盒': 'Wayfair-信盒',
                  'Wayfair-维禄': 'Wayfair-维禄',
                  'Walmart-优瑞斯特': 'Walmart-优瑞斯特',
                  'Walmart-赫曼': 'Walmart-赫曼',
                  'Walmart-信盒': 'Walmart-信盒',
                  'Walmart-宫本': 'Walmart-宫本',
                  'eBay-玲琅': 'eBay-玲琅',
                  'eBay-治润': 'eBay-治润',
                  'eBay-雅秦': 'eBay-雅秦',
                  'Nextfur-Shopify': 'Nextfur-Shopify',
                  '旗辰': '旗辰',
                  '塞迦曼': '塞迦曼',
                  '启珊': '启珊',
                  '驰甬': '驰甬',
                  '杉绮': '杉绮',
                  '治润': '治润',
                  'Central_Power_International_Limited': 'Central_Power_International_Limited',
                }}
              />
            </ProForm.Item>
          </Col>
          <Col span={5} offset={1}>
            <ProForm.Item
              name="订单号"
              label="订单号"
              rules={[{ required: true, message: '请输入' }]}
            >
              <AutoComplete
                placeholder="请输入订单号!"
              />
            </ProForm.Item>
          </Col>
          <Col span={5} offset={1}>
            <ProForm.Item
              name="SKU"
              label="SKU"
              rules={[{ required: true, message: '两箱包的请输入两个公司SKU' }, { pattern: /[^,||^，]$/, message: '最后一位不能为,' }]}
              tooltip="例如USAN1023801-1,USAN1023801-2 (多个sku用,隔开)，捆绑SKU请拆成对应的SKU"
            >
              <AutoComplete
                placeholder="若为AB箱,A箱有问题请填A箱,B箱有问题请填B箱"
                options={osku}
              />
            </ProForm.Item>
          </Col>
        </Row>
        <Row>
          <Col span={5} >
            <ProForm.Item
              name="处理方式"
              label="处理方式"
              rules={[{ required: true, message: '请输入处理方式!' }]}
            >
              <ProFormSelect
                width="md"
                placeholder="请输入处理方式"
                valueEnum={{
                  'Refund': 'Refund(退款，无退货行为)',
                  'Replacement': 'Replacement（补发件，无退货行为）',
                  'Refund and Replacement': 'Refund and Replacement（退部分款与补发件同时存在，无退货行为）',
                  'Delivery Consultation': 'Delivery Consultation（快递咨询）',
                  'Wait Reply': 'Wait Reply（等待回复）',
                  // 'Cancel Order': 'Cancel Order',
                  // 'Closed': 'Closed',
                  'Return': 'Return（有退货行为，无发件行为）',
                  'Return and Replacement': 'Return and Replacement（有退货行为，有发件行为）',
                }}

              />
            </ProForm.Item>
          </Col>
          <Col span={5} offset={1}>
            <ProFormDigit
              width="md"
              name="Refund"
              label="Refund"
              placeholder=""
              initialValue="0"
              tooltip="若无退款,默认输入0"
              rules={[{ required: true, message: '若无退款,请输入0' }]}
            />
          </Col>
          <Col span={5} offset={1}>
            <ProForm.Item
              name="原因"
              label="原因"
              rules={[{ required: true, message: '请输入原因!' }]}
            >
              <ProFormSelect
                width="md"
                placeholder="请输入原因"
                valueEnum={{
                  '少配件': '少配件',
                  '外观问题（安装前）': '外观问题（安装前）',
                  '组装问题（安装中）': '组装问题（安装中）',
                  '结构问题（安装后）': '结构问题（安装后）',
                  '其它质量问题': '其它质量问题',
                  '质量&少配件': '质量&少配件',
                  '运输破损': '运输破损',
                  '仓库': '仓库',
                  '快递': '快递',
                  '买家': '买家',
                  '销售': '销售',
                }}
              />
            </ProForm.Item>
          </Col>
          <Col span={5} offset={1}>
            <ProForm.Item
              name="Replacement"
              label="Replacement"
            >
              <ProFormSelect
                width="md"
                valueEnum={{
                  'RP-国外新件': 'RP-国外新件',
                  'RP-国外配件': 'RP-国外配件',
                  'RP-国外退件': 'RP-国外退件',
                  'RP-国内补寄配件': 'RP-国内补寄配件',
                  'RP-电子说明书': 'RP-电子说明书',
                }}
              />
            </ProForm.Item>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <ProForm.Item
              name="Used"
              label="物流操作"
            >
              <ProFormSelect
                width="md"
                valueEnum={{
                  '买家承担': '买家承担',
                  '卖家承担-上门取件': '卖家承担-上门取件',
                  '卖家承担-退货标签': '卖家承担-退货标签',
                  '拦截': '拦截',
                  '拒收': '拒收',
                  '修改地址': '修改地址'
                }}
              />
            </ProForm.Item>
          </Col>
          <Col span={5} offset={1}>
            <ProForm.Item
              name="售后反馈" label="售后反馈"
            >
              <AutoComplete
                options={shouhou}
                placeholder="售后原因请填写详细！"
              />
            </ProForm.Item>
          </Col>
          <Col span={5} offset={1}>
            <ProForm.Item
              name="备注" label="备注"
            >
              <AutoComplete
                options={beizhu}
              />
            </ProForm.Item>
          </Col>
        </Row>
      </ProForm>
      <br />

      <ProTable

        search={{
          labelWidth: "auto",
          span: 10,
          defaultCollapsed: false,
        }}
        columns={column}
        actionRef={actionRef}
        onChange={onTableChange}
        scroll={{ x: 1500, y: 300 }}


        request={async (params = {}) => get_after(params)}

        pagination={{
          pageSize: 100,
        }}
        dateFormatter="string"
        headerTitle="售后表格"
      />
      {
        !isModalVisibleEdit ? '' :
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

