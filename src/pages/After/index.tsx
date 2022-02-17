/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from "@ant-design/pro-layout";
import request from "umi-request";
import { Button, Tag, Space, Menu, Dropdown, message, Tooltip, Modal, Table, AutoComplete, Col, Row, Input, Cascader } from 'antd';
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
import { values } from 'lodash';

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
      title: '状态',
      dataIndex: '订单状态',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        已解决: {
          text: '已解决',
          status: 'Default',
        },
        解决中: {
          text: '解决中',
          status: 'error',
        },
      },
    },
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
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueEnum: {
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
      }
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
      copyable: true,
      ellipsis: true,
    },
    {
      title: '顾客反馈',
      dataIndex: '顾客反馈',
      hideInSearch: true,
      copyable: true,
      ellipsis: true,
    },
    {
      title: '客服操作',
      dataIndex: '客服操作',
      hideInSearch: true,
      copyable: true,
      ellipsis: true,
    },
    {
      title: 'Refund',
      dataIndex: 'Refund',
      hideInSearch: true,
      sorter: (a, b) => a.Refund - b.Refund,
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
      fixed: 'right',

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
  // 订单记录
  const [order_name, setorder_name] = useState([]);
  // 表单缓存
  const storage = window.localStorage;
  const temp_dict = [new Array(), new Array(), new Array()] as any;
  let temp_data = new Array();
  const item_dict = ['dengji', 'osku', 'beizhu'];
  const form_dict = ['登记人', 'SKU', '备注'];
  const { TextArea } = Input;
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
            } else if (item_dict.indexOf(item) == 3) {
              setbeizhu(temp_dict[2]);
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
  // 历史记录
  const { initialState } = useModel('@@initialState');
  const [dengji, setdengji] = useState(temp_dict[0]) as any;
  const [osku, setosku] = useState(temp_dict[1]) as any;
  const [beizhu, setbeizhu] = useState(temp_dict[2]) as any;
  // 联动添加
  const [peijian, setpeijian] = useState([]) as any;
  const [detailitem, setdetailitem] = useState([]) as any;
  const [yuanying, setyuanying] = useState([]) as any;
  const [detailreason, setdetailreason] = useState([]) as any;
  const [refund, setrefund] = useState(0) as any;
  const [renew, setrenew] = useState(0) as any;
  // 判断联动是否有一项只选了大类
  const [fankuierror, setfankuierror] = useState(false) as any;
  const [yuanyingerror, setyuanyingerror] = useState(false) as any;
  const fankuionChange = (value: any) => {
    const temp_peijian = [];
    const temp_item = [];
    let temp_fankuierror = false;
    console.log(value);
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        if (element.length > 1) {
          if ((element[0] == '5-0') ||
            (element[0] == '6-0') || (element[0] == '7-0')) {
            temp_peijian.push(element[1]);
            temp_item.push(element[1]);
          }
        } else {
          temp_fankuierror = true;
        }
      }
    }
    setfankuierror(temp_fankuierror);
    setdetailitem(temp_item);
    setpeijian(temp_peijian);
  };
  const getfankuipeijianFields = () => {
    const children = [];
    for (let i = 0; i < detailitem.length; i++) {
      children.push(
        <Col span={5} offset={1} key={peijian[i]}>
          <ProForm.Item
            label={detailitem[i]}
            name={peijian[i]}
            tooltip="输入多个请用逗号隔开，第一位为大写字母，第二位为非0数字，第三位为数字或空"
            rules={[{ pattern: /(^[A-Z][1-9]{1}$)|(^[A-Z][1-9][0-9]{1}$)|((^[A-Z][1-9]{1}((,[A-Z][1-9]{1})|(,[A-Z][1-9][0-9]{1})){1,}$)|(^[A-Z][1-9][0-9]{1}(((,[A-Z][1-9]{1})$|(,[A-Z][1-9][0-9]{1})){1,}$)))/, message: '请以大写字母+数字+数字的形式输入' }]}
          >
            <Input
              style={{ width: 150 }}
              name={peijian[i]}
              placeholder="请输入配件"
            />
          </ProForm.Item>
        </Col >,
      )
    }
    return children;
  }
  const yuanyingChange = (value: any) => {
    const temp_yuanying = [];
    const temp_reason = [];
    // 判断是否填写了大类
    let temp_yuanyingerror = false;
    let temp_refund = 0;
    let temp_renew = '0';
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        if (element.length > 1) {
          // 判断配件
          if ((element[1] == '3-4') ||
            (element[1] == '3-5')) {
            temp_yuanying.push(element[1]);
            temp_reason.push(element[1]);
          }
          // 判断refund
          if ((element[1] == '1-1') || (element[1] == '1-2')) {
            temp_refund = 1;
          }
          // 判断补寄新件
          if ((element[1] == '3-1')) {
            temp_renew = '3-1';
          }
        } else {
          temp_yuanyingerror = true;
        }
      }
    }
    setyuanyingerror(temp_yuanyingerror);
    setrefund(temp_refund);
    setrenew(temp_renew);
    setdetailreason(temp_reason);
    setyuanying(temp_yuanying);
  };
  const getyuanyingFields = () => {
    const children = [];
    for (let i = 0; i < detailreason.length; i++) {
      children.push(
        <Col span={5} offset={1} key={yuanying[i]}>
          <ProForm.Item
            label={detailreason[i]}
            name={yuanying[i]}
            tooltip="输入多个请用逗号隔开，第一位为大写字母，第二位为非0数字，第三位为数字或空"
            rules={[{ pattern: /(^[A-Z][1-9]{1}$)|(^[A-Z][1-9][0-9]{1}$)|((^[A-Z][1-9]{1}((,[A-Z][1-9]{1})|(,[A-Z][1-9][0-9]{1})){1,}$)|(^[A-Z][1-9][0-9]{1}(((,[A-Z][1-9]{1})$|(,[A-Z][1-9][0-9]{1})){1,}$)))/, message: '请以大写字母+数字+数字的形式输入' }]}
          >
            <Input
              style={{ width: 150 }}
              name={yuanying[i]}
              placeholder="请输入配件"
            />
          </ProForm.Item>
        </Col >,
      )
    }
    let temp_refund = 0;
    if (refund == 1) {
      temp_refund = 1;
      children.push(
        <Col span={5} offset={1} key={'Refund'} >
          <ProFormDigit
            width="md"
            name="Refund"
            label="Refund"
            placeholder=""
            initialValue="0"
            tooltip="若无退款,默认输入0"
            rules={[{ required: true, message: '若无退款,请输入0' }]}
          />
        </Col >
      )
    }
    let temp_renew = 0;
    if (renew != '0') {
      temp_renew = 1;
      children.push(
        <Col span={5} offset={1} key={'补寄新件'} >
          <ProForm.Item
            label='补寄新件'
            name='补寄新件'
            tooltip="若为空，则为记录订单号填写的sku"
            rules={[{ pattern: /[^,||^，]$/, message: '最后一位不能为,' }]}
          >
            <Input
              width="md"
              placeholder="请填写具体补寄sku"

            />
          </ProForm.Item>
        </Col >
      )
    }
    if ((temp_refund == 1) && (refund == 0)) {
      children.pop();
      temp_refund = 0;
    }
    if ((temp_renew == 1) && (renew == '0')) {
      children.pop();
      temp_renew = 0;
    }
    return children;
  }
  // 联动表单数值
  const fankuicol = [
    {
      label: '未收到',
      value: '1-0',
      children: [
        {
          label: '未上网',
          value: '1-1-C',
        },
        {
          label: '缺货',
          value: '1-2-X',
        },
        {
          label: '显示签收',
          value: '1-3-K',
        },
        {
          label: '快递停滞/送错州/要求自提',
          value: '1-4-K',
        },
        {
          label: '快递中途破损/退回',
          value: '1-5-K',
        },
        {
          label: '未录入自发货',
          value: '1-6-X',
        },
      ],
    },
    {
      label: '发错货',
      value: '2-0',
      children: [
        {
          label: '包装SKU和自发货一致',
          value: '2-1-C',
        },
        {
          label: '包装SKU和自发货不一致',
          value: '2-2-Z',
        },
      ],
    },
    {
      label: '改地址',
      value: '3-0',
      children: [
        {
          label: '未发出',
          value: '3-1-M',
        },
        {
          label: '已发出',
          value: '3-2-M',
        },
      ],
    },
    {
      label: '不想要',
      value: '4-0',
      children: [
        {
          label: '无理由退货',
          value: '4-1-M',
        },
        {
          label: '网页描述与实物不符',
          value: '4-2-X',
        },
        {
          label: '不符合预期/不满意',
          value: '4-3-M',
        },
        {
          label: '超时送达',
          value: '4-4-K',
        },
        {
          label: '有异味',
          value: '4-5-Z',
        },
        {
          label: '重复下单',
          value: '4-6-M',
        },
        {
          label: '价格贵',
          value: '4-7-F',
        },
        {
          label: '无法安装/不会用',
          value: '4-8-F',
        },
        {
          label: '未授权购买/不小心购买',
          value: '4-9-M',
        },
        {
          label: '快递态度恶劣',
          value: '4-10-K',
        },
        {
          label: '需要床箱/床垫不适合',
          value: '4-11-F',
        },
        {
          label: '尺寸买错',
          value: '4-12-M',
        },
        {
          label: '更换付款方式',
          value: '4-13-M',
        },
        {
          label: '其他',
          value: '4-14-M',
        },
      ],
    },
    {
      label: '包装破损，缺少零部件/损坏/错位/无法使用',
      value: '5-0',
      children: [
        {
          label: '断裂',
          value: '5-1-Y',
        },
        {
          label: '弯折/开裂/变形',
          value: '5-2-Y',
        },
        {
          label: '破损/破洞',
          value: '5-3-Y',
        },
        {
          label: '松动/掉落',
          value: '5-4-Y',
        },
        {
          label: '腐蚀/发霉/生虫/生锈/污渍',
          value: '5-5-Y',
        },
        {
          label: '划痕/凹痕/凸痕/压痕/褶皱',
          value: '5-6-Y',
        },
        {
          label: '少件',
          value: '5-7-Y',
        },
      ],
    },
    {
      label: '包装未破损，缺少零部件/损坏/错位/无法使用',
      value: '6-0',
      children: [
        {
          label: '断裂',
          value: '6-1-Z',
        },
        {
          label: '弯折/开裂/变形',
          value: '6-2-Z',
        },
        {
          label: '破损/破洞',
          value: '6-3-Z',
        },
        {
          label: '松动/掉落',
          value: '6-4-Z',
        },
        {
          label: '腐蚀/发霉/生虫/生锈/污渍',
          value: '6-5-Z',
        },
        {
          label: '划痕/凹痕/凸痕/压痕/褶皱',
          value: '6-6-Z',
        },
        {
          label: '少件',
          value: '6-7-S',
        },
        {
          label: '错件',
          value: '6-8-S',
        },
        {
          label: '异味',
          value: '6-9-Z',
        },
        {
          label: '走线不均',
          value: '6-10-Z',
        },
        {
          label: '孔位错误',
          value: '6-11-Z',
        },
        {
          label: '色差',
          value: '6-12-Z',
        },
        {
          label: '配件功能失效（如无螺母，螺丝拧不进去，无法安装）',
          value: '6-13-Z',
        },
        {
          label: '缺少编号',
          value: '6-14-S',
        },
      ],
    },
    {
      label: '使用后故障',
      value: '7-0',
      children: [
        {
          label: '断裂',
          value: '7-1-Z',
        },
        {
          label: '弯折/开裂/变形/破损',
          value: '7-2-Z',
        },
        {
          label: '配件松脱',
          value: '7-3-Z',
        },
        {
          label: '功能故障（灯/电机/遥控/抽屉等）',
          value: '7-4-Z',
        },
        {
          label: '产品不稳固',
          value: '7-5-Z',
        },
        {
          label: '腐蚀/发霉/生虫/生锈',
          value: '7-6-Z',
        },
        {
          label: '异味',
          value: '7-7-Z',
        },
        {
          label: '噪音',
          value: '7-8-Z',
        },
      ],
    },
    {
      label: '差评',
      value: '8-0',
      children: [
        {
          label: '问题已反馈未解决',
          value: '8-1-M',
        },
        {
          label: '问题未反馈',
          value: '8-2-M',
        },
      ],
    },
  ];
  const yuanyingcol = [
    {
      label: '退款',
      value: '1-0',
      children: [
        {
          label: '退全款',
          value: '1-1',
        },
        {
          label: '退部分款',
          value: '1-2',
        },
      ],
    },
    {
      label: '退货',
      value: '2-0',
      children: [
        {
          label: '截包退货',
          value: '2-1',
        },
        {
          label: '拦截退货',
          value: '2-2',
        },
        {
          label: '拒收退货',
          value: '2-3',
        },
        {
          label: '地址不明/错误退货',
          value: '2-4',
        },
        {
          label: '买家自行退货',
          value: '2-5',
        },
        {
          label: '买家使用我司Return label退货',
          value: '2-6',
        },
        {
          label: '买家使用Amazon Return label退货',
          value: '2-7',
        },
        {
          label: '买家使用仓库Return label退货',
          value: '2-8',
        },
        {
          label: '买家上门取件退货',
          value: '2-9',
        },
      ],
    },
    {
      label: '补发',
      value: '3-0',
      children: [
        {
          label: '海外仓补寄新件',
          value: '3-1',
        },
        {
          label: '海外仓补寄退件',
          value: '3-2',
        },
        {
          label: '海外仓补寄破损件',
          value: '3-3',
        },
        {
          label: '海外仓补寄配件',
          value: '3-4',
        },
        {
          label: '国内补寄配件',
          value: '3-5',
        },
        {
          label: '国内补寄电子说明书',
          value: '3-6',
        },
      ],
    },
    {
      label: '改地址',
      value: '4-0',
      children: [
        {
          label: '发货前改地址',
          value: '4-1',
        },
        {
          label: '发货后改地址',
          value: '4-2',
        },
      ],
    },
    {
      label: '等待进一步处理',
      value: '5-0',
      children: [
        {
          label: '等待买家补充信息',
          value: '5-1',
        },
        {
          label: '等待开发提供方案',
          value: '5-2',
        },
        {
          label: '目前方案买家不满意',
          value: '5-3',
        },
      ],
    },
  ];
  // 导出表格
  const [tableData, settableData] = useState([]) as any;
  // 导出报表
  const downloadExcel = () => {
    const excel_datas = tableData.data;
    console.log(excel_datas);

    // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
    let str = `id,登记日期,登记人,店铺,订单号,SKU,订单状态,顾客反馈,客服操作,Refund,备注\n`;
    // 增加\t为了不让表格显示科学计数法或者其他格式
    for (let i = 0; i < excel_datas.length; i++) {
      // console.log(excel_datas[i])
      for (const key in excel_datas[i]) {
        console.log(excel_datas[i].SKU);
        const temp_dict_but = excel_datas[i].SKU.split(',');
        excel_datas[i].公司SKU = temp_dict_but.join('a');
        if (Object.prototype.hasOwnProperty.call(excel_datas[i], key)) {
          str += `${excel_datas[i][key]},`;
        }
      }
      str += '\n';
    }
    // encodeURIComponent解决中文乱码
    const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    // 通过创建a标签实现
    const link = document.createElement('a');
    link.href = uri;
    // 对下载的文件命名
    link.download = '售后登记.csv';
    link.click();
  };
  // 订单重复弹窗设置
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 保存表单信息
  const [temp_values, settemp_values] = useState([]);
  const handleOk = () => {
    setIsModalVisible(false);
    console.log(temp_values);
    if ((yuanyingerror == true) || (fankuierror == true)) {
      message.error('顾客反馈和客服操作不能只选大类');
    } else {
      // 规范数据
      let sku_in = true;
      temp_values['SKU'] = temp_values['SKU'].replace(new RegExp('，', ("gm")), ',');
      temp_values['SKU'] = temp_values['SKU'].replace(new RegExp(' ', ("gm")), '');
      temp_values['SKU'] = temp_values['SKU'].replace(new RegExp('  ', ("gm")), '');
      const sku = temp_values['SKU'].split(',');
      // 判断sku是否含有
      sku.forEach((element: string) => {
        if (!data.sku_name.find((item: string) => item == element)) {
          sku_in = false;
          message.error('传入的SKU:' + element + '不正确(注:捆绑sku要拆成产品sku)');
        }
      });
      if ('补寄新件' in temp_values) {
        // 如果不为空，则重新判断是否正确
        temp_values['补寄新件'] = temp_values['补寄新件'].replace(new RegExp('，', ("gm")), ',');
        temp_values['补寄新件'] = temp_values['补寄新件'].replace(new RegExp(' ', ("gm")), '');
        temp_values['补寄新件'] = temp_values['补寄新件'].replace(new RegExp('  ', ("gm")), '');
        const temp_newsku = temp_values['补寄新件'].split(',');
        temp_newsku.forEach((element: string) => {
          if (!data.sku_name.find((item: string) => item == element)) {
            sku_in = false;
            message.error('传入的补寄新件SKU:' + element + '不正确(注:捆绑sku要拆成产品sku)');
          }
        });
      }
      // 顾客反馈做处理
      for (const key in temp_values['顾客反馈']) {
        if (Object.prototype.hasOwnProperty.call(temp_values['顾客反馈'], key)) {
          const element = temp_values['顾客反馈'][key];
          if ((element[0] == '5-0') ||
            (element[0] == '6-0') || (element[0] == '7-0')) {
            if (element[1] in temp_values) {
              temp_values['顾客反馈'][key][1] += '$' + temp_values[element[1]].replace(',', '#');
            }
          }
          if (temp_values['顾客反馈'][key].length > 1) {
            temp_values['顾客反馈'][key].splice(0, 1);
          }
        }
      }
      temp_values['顾客反馈'] = temp_values['顾客反馈'].join('&');
      // 客服操作做处理
      for (const key in temp_values['客服操作']) {
        if (Object.prototype.hasOwnProperty.call(temp_values['客服操作'], key)) {
          const element = temp_values['客服操作'][key];
          // 判断配件
          if ((element[1] == '3-4') ||
            (element[1] == '3-5')) {
            if (element[1] in temp_values) {
              temp_values['客服操作'][key][1] += '$' + temp_values[element[1]].replace(',', '#');
            }
          }
          // 判断补寄新件
          if ((element[1] == '3-1')) {
            if ('补寄新件' in temp_values) {
              temp_values['客服操作'][key][1] += '$' + temp_values['补寄新件'].replace(',', '#');
            }
          }
          if (temp_values['客服操作'][key].length > 1) {
            temp_values['客服操作'][key].splice(0, 1);
          }
        }
      }
      temp_values['客服操作'] = temp_values['客服操作'].join('&');
      if (sku_in == true) {
        return request(`/api/afterinsert`, {
          method: 'POST',
          data: { ...temp_values },
          requestType: 'form',
        }).then(res => {
          //自行根据条件清除
          console.log(res);
          setorder_name(res);
          message.success('提交成功');
          // 储存历史记录
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
              if (temp_data.indexOf(temp_values[form_dict[key]]) == -1) {
                temp_data.push(temp_values[form_dict[key]]);
                temp_dict[key].push(renderItem(temp_values[form_dict[key]], temp_data.length - 1, item_dict[key]));
                console.log('提交后', temp_data)
                let temp_storage = temp_data.join('|');
                temp_storage = JSON.stringify(temp_storage);
                storage[item_dict[key]] = temp_storage;
                //自行根据条件清除
                if (parseInt(key) == 0) {
                  setdengji(temp_dict[0]);
                } else if (parseInt(key) == 1) {
                  setosku(temp_dict[1]);
                } else if (parseInt(key) == 3) {
                  setbeizhu(temp_dict[2]);
                }
              }
            } else {
              temp_data = []
              temp_data.push(temp_values[form_dict[key]]);
              temp_dict[key].push(renderItem(temp_values[form_dict[key]], temp_data.length - 1, item_dict[key]));
              let temp_storage = temp_data.join('|');
              temp_storage = JSON.stringify(temp_storage);
              storage[item_dict[key]] = temp_storage;
              //自行根据条件清除
              if (parseInt(key) == 0) {
                setdengji(temp_dict[0]);
              } else if (parseInt(key) == 1) {
                setosku(temp_dict[1]);
              } else if (parseInt(key) == 3) {
                setbeizhu(temp_dict[2]);
              }
            }
          }
          formRef.current?.resetFields();
          setdetailitem([]);
          setdetailreason([]);
          setrefund(0);
          setrenew(0);
        });
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <PageContainer>
      <ProForm
        autoComplete="on"
        formRef={formRef}
        initialValues={{
          '登记人': initialState.currentUser?.name
        }}
        onFinish={async (values, ...rest) => {
          const temp_order_name = order_name?.length > 0 ? order_name : data?.order_name;
          if ((yuanyingerror == true) || (fankuierror == true)) {
            message.error('顾客反馈和客服操作不能只选大类');
          } else if (temp_order_name.indexOf(values['订单号']) > -1) {
            settemp_values(values);
            setIsModalVisible(true);
          }
          else {
            // 规范数据
            let sku_in = true;
            values['SKU'] = values['SKU'].replace(new RegExp('，', ("gm")), ',');
            values['SKU'] = values['SKU'].replace(new RegExp(' ', ("gm")), '');
            values['SKU'] = values['SKU'].replace(new RegExp('  ', ("gm")), '');
            const sku = values['SKU'].split(',');
            // 判断sku是否含有
            sku.forEach((element: string) => {
              if (!data.sku_name.find((item: string) => item == element)) {
                sku_in = false;
                message.error('传入的SKU:' + element + '不正确(注:捆绑sku要拆成产品sku)');
              }
            });
            if ('补寄新件' in values) {
              // 如果不为空，则重新判断是否正确
              values['补寄新件'] = values['补寄新件'].replace(new RegExp('，', ("gm")), ',');
              values['补寄新件'] = values['补寄新件'].replace(new RegExp(' ', ("gm")), '');
              values['补寄新件'] = values['补寄新件'].replace(new RegExp('  ', ("gm")), '');
              const temp_newsku = values['补寄新件'].split(',');
              temp_newsku.forEach((element: string) => {
                if (!data.sku_name.find((item: string) => item == element)) {
                  sku_in = false;
                  message.error('传入的补寄新件SKU:' + element + '不正确(注:捆绑sku要拆成产品sku)');
                }
              });
            }
            // 顾客反馈做处理
            for (const key in values['顾客反馈']) {
              if (Object.prototype.hasOwnProperty.call(values['顾客反馈'], key)) {
                const element = values['顾客反馈'][key];
                if ((element[0] == '5-0') ||
                  (element[0] == '6-0') || (element[0] == '7-0')) {
                  if (element[1] in values) {
                    values['顾客反馈'][key][1] += '$' + values[element[1]].replace(',', '#');
                  }
                }
                if (values['顾客反馈'][key].length > 1) {
                  values['顾客反馈'][key].splice(0, 1);
                }
              }
            }
            values['顾客反馈'] = values['顾客反馈'].join('&');
            // 客服操作做处理
            for (const key in values['客服操作']) {
              if (Object.prototype.hasOwnProperty.call(values['客服操作'], key)) {
                const element = values['客服操作'][key];
                // 判断配件
                if ((element[1] == '3-4') ||
                  (element[1] == '3-5')) {
                  if (element[1] in values) {
                    values['客服操作'][key][1] += '$' + values[element[1]].replace(',', '#');
                  }
                }
                // 判断补寄新件
                if ((element[1] == '3-1')) {
                  if ('补寄新件' in values) {
                    values['客服操作'][key][1] += '$' + values['补寄新件'].replace(',', '#');
                  }
                }
                if (values['客服操作'][key].length > 1) {
                  values['客服操作'][key].splice(0, 1);
                }
              }
            }
            values['客服操作'] = values['客服操作'].join('&');
            if (sku_in == true) {
              return request(`/api/afterinsert`, {
                method: 'POST',
                data: { ...values },
                requestType: 'form',
              }).then(res => {
                //自行根据条件清除
                console.log(res);
                setorder_name(res);
                message.success('提交成功');
                // 储存历史记录
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
                      } else if (parseInt(key) == 3) {
                        setbeizhu(temp_dict[2]);
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
                    } else if (parseInt(key) == 3) {
                      setbeizhu(temp_dict[2]);
                    }
                  }
                }
                formRef.current?.resetFields();
                setdetailitem([]);
                setdetailreason([]);
                setrefund(0);
                setrenew(0);
              });
            }
          }

        }
        }

      >
        <Row>
          <Col span={3}>
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
          <Col span={3} offset={1}>
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
                placeholder="若为AB箱,哪箱有问题请填哪箱"
                options={osku}
              />
            </ProForm.Item>
          </Col>
          <Col span={3} offset={1}>
            <ProForm.Item
              name="订单状态"
              label="订单状态"
              rules={[{ required: true, message: '请输入状态!' }]}
            >
              <ProFormSelect
                width="md"
                valueEnum={{
                  '已解决': '已解决',
                  '解决中': '解决中',
                }}
              />
            </ProForm.Item>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <ProForm.Item
              name="顾客反馈"
              label="顾客反馈"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Cascader
                multiple
                maxTagCount="responsive"
                onChange={fankuionChange}
                style={{ width: '100%' }}
                options={fankuicol}
              />


            </ProForm.Item>
          </Col>
          {getfankuipeijianFields()}
        </Row>
        <Row>
          <Col span={5}>
            <ProForm.Item
              name="客服操作"
              label="客服操作"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Cascader
                multiple
                maxTagCount="responsive"
                onChange={yuanyingChange}
                style={{ width: '100%' }}
                options={yuanyingcol}
              />

            </ProForm.Item>
          </Col>
          {getyuanyingFields()}
        </Row>

        <Row>
          <Col span={20}>
            <ProForm.Item
              name="备注" label="备注"
            >
              <AutoComplete
                options={beizhu}
              >
                <TextArea
                  placeholder="请填写详细"
                  className="custom"
                  style={{ height: 50 }}
                  maxLength={150}
                />
              </AutoComplete>
            </ProForm.Item>
          </Col>
        </Row>
      </ProForm>
      <br />

      <ProTable
        toolbar={{
          actions: [
            <Button key="primary" type="primary" onClick={() => downloadExcel()}>
              导出为excel
            </Button>,
          ],
        }}
        search={{
          labelWidth: "auto",
          span: 4,
          defaultCollapsed: false,
        }}
        rowKey="key"
        columns={column}
        actionRef={actionRef}
        onChange={onTableChange}
        scroll={{ x: 1500, y: 300 }}
        request={async (params = {}) => {
          const result = request('/api/aftersale', {
            method: 'POST',
            data: { ...params },
            requestType: 'form',
          });
          settableData(await result);
          return result;
        }}

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
      {/* 订单重复提示 */}
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>记录中已含有该订单号，确认是否提交？</p>
      </Modal>
    </PageContainer >
  );
}

export default TableList

