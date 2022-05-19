/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from "@ant-design/pro-layout";
import request from "umi-request";
import { Button, Tag, Space, Menu, Dropdown, message, Tooltip, Modal, Table, AutoComplete, Col, Row, Input, Cascader } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, {
  ProFormDigit,
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import Edit from './components/Edit'
import styles from './index.less'
import { useRequest, useAccess, Access, useModel } from 'umi';

//表单part

/**
 * 更新节点
 *
 * @param fields
 */


const TableList: React.FC = () => {
  const access = useAccess();
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
      valueEnum: {
        "已解决": {
          text: '已解决',
          status: 'Default',
        },
        "解决中": {
          text: '解决中',
          status: 'error',
        },
        "已校对": { text: '已校对', status: 'Success' },
      },
      width: 75
    },
    {
      title: '登记日期',
      dataIndex: '登记日期',
      hideInSearch: true,
      sorter: (a, b) => a.id - b.id,
      //数据库格式问题
      width: 90
    },
    {
      title: '更新日期',
      dataIndex: '更新日期',
      hideInSearch: true,
      sorter: (a, b) => a.id - b.id,
      //数据库格式问题
      width: 90
    },
    {
      title: '登记人',
      dataIndex: '登记人',
      filters: true,
      onFilter: true,
      width: 70,
      ellipsis: true,
    },
    {
      title: '店铺',
      dataIndex: '店铺',
      // hideInSearch: true,
      filters: true,
      onFilter: true,
      width: 80,
      ellipsis: true,
      valueEnum: {
        'amazon尚铭': '尚铭',
        'amazon优瑞斯特': '优瑞斯特',
        'amazon赫曼': '赫曼',
        'amazon信盒': '信盒',
        'amazon宫本': '宫本',
        'amazon森月': '森月',
        'amazon维禄': '维禄',
        'amazon玲琅': '玲琅',
        'amazon信盒法国': '信盒-法国',
        'amazon信盒意大利': '信盒-意大利',
        'amazon信盒西班牙': '信盒-西班牙',
        'wayfair信盒': 'Wayfair-信盒',
        'wayfair维禄': 'Wayfair-维禄',
        'walmart优瑞斯特': 'Walmart-优瑞斯特',
        'walmart赫曼': 'Walmart-赫曼',
        'walmart信盒': 'Walmart-信盒',
        'walmart宫本': 'Walmart-宫本',
        'ebay玲琅': 'eBay-玲琅',
        'ebay治润': 'eBay-治润',
        'ebay雅秦': 'eBay-雅秦',
        'shopifynextfur': 'Nextfur-Shopify',
        'amazon旗辰': '旗辰',
        'amazon赛迦曼': '赛迦曼',
        'amazon启珊': '启珊',
        'amazon驰甬': '驰甬',
        'amazon杉绮': '杉绮',
        'amazon治润': '治润',
        'amazoncpower': 'Central_Power_International_Limited',
      }
    },
    {
      title: '订单号',
      dataIndex: '订单号',
      width: 100,
      tip: '订单号过长会自动收缩',
    },
    {
      title: 'SKU',
      dataIndex: 'SKU',
      width: 100,
    },
    {
      title: '序号',
      dataIndex: '序号',
      hideInSearch: true,
      width: 50,
    },
    {
      title: '顾客反馈',
      dataIndex: '顾客反馈',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '客服操作',
      dataIndex: '客服操作',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '退款',
      dataIndex: 'Refund',
      width: 60,
      hideInSearch: true,
      sorter: (a, b) => a.Refund - b.Refund,
    },
    {
      title: '备注',
      dataIndex: '备注',
      width: 100,
      tip: '备注过长会自动收缩',
      hideInSearch: true,
    },
    {
      title: '登记开始日期',
      dataIndex: '登记开始日期',
      valueType: 'date',
      hideInTable: true,
      //数据库格式问题
      width: 90
    },
    {
      title: '登记结束日期',
      dataIndex: '登记结束日期',
      valueType: 'date',
      hideInTable: true,
      //数据库格式问题
      width: 90
    },
    {
      title: '更改开始日期',
      dataIndex: '更改开始日期',
      valueType: 'date',
      hideInTable: true,
      //数据库格式问题
      width: 90
    },
    {
      title: '更改结束日期',
      dataIndex: '更改结束日期',
      valueType: 'date',
      hideInTable: true,
      //数据库格式问题
      width: 90
    },
    {
      title: '是否上传图片',
      dataIndex: '是否上传图片',
      hideInSearch: true,
      //数据库格式问题
      width: 90,
      fixed: 'right',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 50,
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
              setbeizhu([]);
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
  const [peijianchina, setpeijianchina] = useState([]) as any;
  const [yuanying, setyuanying] = useState([]) as any;
  const [detailreason, setdetailreason] = useState([]) as any;
  const [yuanyinchina, setyuanyinchina] = useState([]) as any;
  // 退款显示
  const [refund, setrefund] = useState(0) as any;
  // 补寄sku显示
  const [resku, setresku] = useState([]) as any;
  // 补寄sku翻译显示
  const [reskuchina, setreskuchina] = useState([]) as any;
  // 退货次数显示
  const [returnsku, setreturnsku] = useState([]) as any;

  // 判断联动是否有一项只选了大类
  const [fankuierror, setfankuierror] = useState(false) as any;
  const [yuanyingerror, setyuanyingerror] = useState(false) as any;
  const fankuionChange = (value: any, selectOptions: any) => {
    const temp_peijian = [];
    const temp_item = [];
    const temp_peijianchina = [];
    let temp_fankuierror = false;
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        if (element.length > 1) {
          if ((element[0] == '5-0') ||
            (element[0] == '6-0') || (element[0] == '7-0')) {
            temp_peijian.push(element[1]);
            temp_item.push(element[1]);
            temp_peijianchina.push(selectOptions[key][1]['label']);
          }
        } else {
          temp_fankuierror = true;
          message.error('不能只选大类');
        }
      }
    }
    setfankuierror(temp_fankuierror);
    setdetailitem(temp_item);
    setpeijian(temp_peijian);
    setpeijianchina(temp_peijianchina);
  };
  const getfankuipeijianFields = () => {
    const children = [];
    for (let i = 0; i < detailitem.length; i++) {
      children.push(
        <Col span={4} key={peijian[i]}>
          <ProForm.Item
            label={peijianchina[i]}
            name={peijian[i]}
            tooltip="输入多个请用逗号隔开，第一位为大写字母，第二位为非0数字，第三位为数字或空,例：允许A，A1，A10，不允许1A，A01，a1。特例 编号标贴-B99 螺丝包-L99 排骨条-P99 说明书-S99 五金盒-W99 配件未知-U99"
            rules={[{ pattern: /(^[A-Z]{1}$)|(^[A-Z][1-9]{1}$)|(^[A-Z][1-9][0-9]{1}$)|((^[A-Z]{1}((,[A-Z]{1})|(,[A-Z][1-9]{1})|(,[A-Z][1-9][0-9]{1})){1,}$)|(^[A-Z][1-9]{1}((,[A-Z]{1})|(,[A-Z][1-9]{1})|(,[A-Z][1-9][0-9]{1})){1,}$)|(^[A-Z][1-9][0-9]{1}(((,[A-Z]{1})|(,[A-Z][1-9]{1})$|(,[A-Z][1-9][0-9]{1})){1,}$)))/, message: '请以大写字母+数字+数字的形式输入' }]}
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
  const yuanyingChange = (value: any, selectOptions: any) => {
    const temp_yuanying = [];
    const temp_reason = [];
    const temp_yuanyinchina = [];
    const temp_returnsku = [];
    // 判断是否填写了大类
    let temp_yuanyingerror = false;
    let temp_refund = 0;
    let count_0 = 0;
    let count_1 = 0;
    let count_2 = 0;
    let count_3 = 0;
    const temp_renew = [];
    const temp_renewchina = [];
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        if (element.length > 1) {
          // 判断小类是否有两个
          if (element[0] == '1-0') {
            count_0 = count_0 + 1;
            if (count_0 > 1)
              message.error('退款只能含一个小类');
          } else if (element[0] == '2-0') {
            count_1 = count_1 + 1;
            if (count_1 > 1)
              message.error('退货只能含一个小类');
          } else if (element[0] == '4-0') {
            count_2 = count_2 + 1;
            if (count_2 > 1)
              message.error('发货后改地址只能含一个小类');
          } else if (element[0] == '5-0') {
            count_3 = count_3 + 1;
            if (count_3 > 1)
              message.error('等待进一步操作只能含一个小类');
          }
          // 判断配件
          if ((element[1] == '3-4-0') ||
            (element[1] == '3-5-0')) {
            temp_yuanying.push(element[1]);
            temp_reason.push(element[1]);
            temp_yuanyinchina.push(selectOptions[key][1]['label']);
          } else
            // 判断refund
            if ((element[1] == '1-1-0') || (element[1] == '1-2-0')) {
              temp_refund = 1;
            } else
              // 判断补寄sku
              if ((element[1] == '3-1-0') || (element[1] == '3-2-0') || (element[1] == '3-3-0')) {
                temp_renew.push(element[1]);
                temp_renewchina.push(selectOptions[key][1]['label']);
              } else
                if ((element[1] == '2-1-0') || (element[1] == '2-2-0') || (element[1] == '2-3-0')
                  || (element[1] == '2-4-0') || (element[1] == '2-5-0') || (element[1] == '2-6-0')
                  || (element[1] == '2-7-0') || (element[1] == '2-8-0') || (element[1] == '2-9-0')) {
                  temp_returnsku.push(element[1]);
                }
        } else {
          temp_yuanyingerror = true;
          message.error('不能只选大类');
        }
      }
    }
    setreturnsku(temp_returnsku);
    setyuanyingerror(temp_yuanyingerror);
    setyuanyinchina(temp_yuanyinchina);
    setrefund(temp_refund);
    setresku(temp_renew);
    setreskuchina(temp_renewchina);
    setdetailreason(temp_reason);
    setyuanying(temp_yuanying);
  };
  const getyuanyingFields = () => {
    const children = [];
    for (let i = 0; i < detailreason.length; i++) {
      children.push(
        <>
          <Col span={4} key={yuanying[i]}>
            <ProForm.Item
              label={yuanyinchina[i]}
              name={yuanying[i]}
              tooltip="输入多个请用逗号隔开，第一位为大写字母，第二位为非0数字，第三位为数字或空,例：允许A，A1，A10，不允许1A，A01，a1。特例 编号标贴-B99 螺丝包-L99 排骨条-P99 说明书-S99 五金盒-W99 配件未知-U99"
              rules={[{ pattern: /(^[A-Z]{1}$)|(^[A-Z][1-9]{1}$)|(^[A-Z][1-9][0-9]{1}$)|((^[A-Z]{1}((,[A-Z]{1})|(,[A-Z][1-9]{1})|(,[A-Z][1-9][0-9]{1})){1,}$)|(^[A-Z][1-9]{1}((,[A-Z]{1})|(,[A-Z][1-9]{1})|(,[A-Z][1-9][0-9]{1})){1,}$)|(^[A-Z][1-9][0-9]{1}(((,[A-Z]{1})|(,[A-Z][1-9]{1})$|(,[A-Z][1-9][0-9]{1})){1,}$)))/, message: '请以大写字母+数字+数字的形式输入' }]}
            >
              <Input
                style={{ width: 150 }}
                name={yuanying[i]}
                placeholder="请输入配件"
              />
            </ProForm.Item>
          </Col >
          <Col span={4} key={yuanying[i] + '数量'} >
            <ProFormDigit
              width="md"
              name={yuanying[i] + '补寄次数'}
              label={yuanyinchina[i] + '补寄次数'}
              placeholder=""
              initialValue={1}
              tooltip="默认为1"
              rules={[{ required: true, message: '请输出数量' }]}
            />
          </Col >
        </>
      )
    }
    let temp_refund = 0;
    if (refund == 1) {
      temp_refund = 1;
      children.push(
        <Col span={3} key={"refund"} >
          <ProFormDigit
            width="md"
            name="Refund"
            label="退款金额"
            placeholder=""
            tooltip="若无退款,默认输入0"
            rules={[{ required: true, message: '若无退款,请输入0' }]}
          />
        </Col >
      )
    }
    if (returnsku.length >= 0) {
      for (let i = 0; i < returnsku.length; i++) {
        children.push(
          <>
            <Col span={4} key={returnsku[i] + '退货次数'} >
              <ProFormDigit
                width="md"
                name={returnsku[i] + '退货次数'}
                label={'退货次数'}
                placeholder=""
                initialValue={1}
                tooltip="默认为1"
                rules={[{ required: true, message: '请输出数量' }]}
              />
            </Col >
          </>
        )
      }
    }
    if (resku.length >= 0) {
      for (let i = 0; i < resku.length; i++) {
        children.push(
          <>
            <Col span={4} key={resku[i]} >
              <ProForm.Item
                label={reskuchina[i]}
                name={resku[i]}
                tooltip="若为空，则为记录订单号填写的sku"
                rules={[{ pattern: /[^,||^，]$/, message: '限填一个' }]}
              >
                <Input
                  width="md"
                  placeholder="请填写具体补寄sku"

                />
              </ProForm.Item>
            </Col >
            <Col span={4} key={resku[i] + '数量'} >
              <ProFormDigit
                width="md"
                name={resku[i] + '数量'}
                label={reskuchina[i] + '数量'}
                placeholder=""
                initialValue={1}
                tooltip="默认为1"
                rules={[{ required: true, message: '请输出数量' }]}
              />
            </Col >
          </>
        )
      }
    }
    if ((temp_refund == 1) && (refund == 0)) {
      children.pop();
      temp_refund = 0;
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
          label: '显示到货/签收',
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
          label: '仓库发错',
          value: '2-1-C',
        },
        {
          label: '工厂装错',
          value: '2-2-Z',
        },
      ],
    },
    {
      label: '物流咨询/改地址',
      value: '3-0',
      children: [
        {
          label: '发货后改地址',
          value: '3-1-M',
        },
        {
          label: '询问物流',
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
          value: '4-7-X',
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
          label: '尺寸/颜色买错',
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
          label: '少配件',
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
          label: '少配件',
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
          label: '走线歪斜/纽扣歪斜',
          value: '6-10-Z',
        },
        {
          label: '孔位错误/缺失',
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
          label: '缺少编号/说明书或标签贴错',
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
          value: '1-1-0',
        },
        {
          label: '退部分款',
          value: '1-2-0',
        },
      ],
    },
    {
      label: '退货',
      value: '2-0',
      children: [
        {
          label: '出仓前截回',
          value: '2-1-0',
        },
        {
          label: '半路拦截退货',
          value: '2-2-0',
        },
        {
          label: '拒收退货',
          value: '2-3-0',
        },
        {
          label: '地址不明/错误退货',
          value: '2-4-0',
        },
        {
          label: '买家自行退货',
          value: '2-5-0',
        },
        {
          label: '买家使用我司Return label退货',
          value: '2-6-0',
        },
        {
          label: '买家使用平台 Return label退货',
          value: '2-7-0',
        },
        {
          label: '买家使用仓库Return label退货',
          value: '2-8-0',
        },
        {
          label: '买家上门取件退货',
          value: '2-9-0',
        },
      ],
    },
    {
      label: '补发',
      value: '3-0',
      children: [
        {
          label: '海外仓补寄新件',
          value: '3-1-0',
        },
        {
          label: '海外仓补寄退件',
          value: '3-2-0',
        },
        {
          label: '海外仓补寄破损件',
          value: '3-3-0',
        },
        {
          label: '海外仓补寄配件',
          value: '3-4-0',
        },
        {
          label: '国内补寄配件',
          value: '3-5-0',
        },
        {
          label: '国内补寄电子说明书',
          value: '3-6-0',
        },
      ],
    },
    {
      label: '发货后改地址',
      value: '4-0',
      children: [
        {
          label: 'label created暂不能修改',
          value: '4-1-0',
        },
        {
          label: 'in transit已申请修改地址',
          value: '4-2-0',
        },
        {
          label: '修改失败',
          value: '4-3-0',
        },
      ],
    },
    {
      label: '其他处理',
      value: '5-0',
      children: [
        {
          label: '等待买家补充信息',
          value: '5-1-0',
        },
        {
          label: '等待开发提供方案',
          value: '5-2-0',
        },
        {
          label: '目前方案买家不满意',
          value: '5-3-0',
        },
        {
          label: '已解决',
          value: '5-4-0',
        },
      ],
    },
  ];
  // 导出表格
  const [tableData, settableData] = useState([]) as any;
  // 导出报表
  const downloadExcel = () => {
    const excel_datas = tableData.excel;

    // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
    let str = `id,登记日期,更新日期,登记人,店铺,订单号,SKU,序号,订单状态,顾客反馈,客服操作,退款金额,备注,是否上传图片\n`;
    // 增加\t为了不让表格显示科学计数法或者其他格式
    for (let i = 0; i < excel_datas.length; i++) {
      // console.log(excel_datas[i])
      for (const key in excel_datas[i]) {
        const temp_dict_but = excel_datas[i].SKU.split(',');
        excel_datas[i].公司SKU = temp_dict_but.join('a');
        if (Object.prototype.hasOwnProperty.call(excel_datas[i], key)) {
          let temp_str = excel_datas[i][key].toString();
          temp_str = temp_str.replace(new RegExp(',', ("gm")), '，').replace(new RegExp(/[\r\n]/g, ("gm")), "")
          str += `${temp_str},`;
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
      temp_values['订单号'] = temp_values['订单号'].replace(new RegExp(' ', ("gm")), '').replace(new RegExp('/[\r\n]/g', ("gm")), "").replace(new RegExp('　', ("gm")), "");
      // 规范数据
      let sku_in = true;
      temp_values['SKU'] = temp_values['SKU'].replace(new RegExp('，', ("gm")), ',');
      temp_values['SKU'] = temp_values['SKU'].replace(new RegExp(' ', ("gm")), '');
      temp_values['SKU'] = temp_values['SKU'].replace(new RegExp('  ', ("gm")), '');

      if ('3-1-0' in temp_values) {
        // 如果不为空，则重新判断是否正确
        temp_values['3-1-0'] = temp_values['3-1-0'].replace(new RegExp('，', ("gm")), ',');
        temp_values['3-1-0'] = temp_values['3-1-0'].replace(new RegExp(' ', ("gm")), '');
        temp_values['3-1-0'] = temp_values['3-1-0'].replace(new RegExp('  ', ("gm")), '');
      } else {
        if ('3-1-0数量' in temp_values) {
          temp_values['3-1-0'] = temp_values['SKU'];
        }
      }
      if ('3-2-0' in temp_values) {
        // 如果不为空，则重新判断是否正确
        temp_values['3-2-0'] = temp_values['3-2-0'].replace(new RegExp('，', ("gm")), ',');
        temp_values['3-2-0'] = temp_values['3-2-0'].replace(new RegExp(' ', ("gm")), '');
        temp_values['3-2-0'] = temp_values['3-2-0'].replace(new RegExp('  ', ("gm")), '');
      } else {
        if ('3-2-0数量' in temp_values) {
          temp_values['3-2-0'] = temp_values['SKU'];
        }
      }
      if ('3-3-0' in temp_values) {
        // 如果不为空，则重新判断是否正确
        temp_values['3-3-0'] = temp_values['3-3-0'].replace(new RegExp('，', ("gm")), ',');
        temp_values['3-3-0'] = temp_values['3-3-0'].replace(new RegExp(' ', ("gm")), '');
        temp_values['3-3-0'] = temp_values['3-3-0'].replace(new RegExp('  ', ("gm")), '');
      } else {
        if ('3-3-0数量' in temp_values) {
          temp_values['3-3-0'] = temp_values['SKU'];
        }
      }
      temp_values['guke'] = new Array();
      temp_values['kefu'] = new Array();
      // 顾客反馈做处理
      for (const key in temp_values['顾客反馈']) {
        if (Object.prototype.hasOwnProperty.call(temp_values['顾客反馈'], key)) {
          const element = temp_values['顾客反馈'][key];
          temp_values['guke'][key] = temp_values['顾客反馈'][key][1];
          if ((element[0] == '5-0') ||
            (element[0] == '6-0') || (element[0] == '7-0')) {
            if (element[1] in temp_values) {
              if (temp_values[element[1]] != '') {
                temp_values['guke'][key] += '$' + temp_values[element[1]].replace(new RegExp(',', ("gm")), '#');
              } else {
                if (temp_values['订单状态'] == '已解决') {
                  sku_in = false;
                  message.error('请填写配件');
                }
              }

            } else {
              if (temp_values['订单状态'] == '已解决') {
                sku_in = false;
                message.error('请填写配件');
              }
            }
          }
        }
      }
      temp_values['guke'] = temp_values['guke'].join('&');
      // 客服操作做处理
      for (const key in temp_values['客服操作']) {
        if (Object.prototype.hasOwnProperty.call(temp_values['客服操作'], key)) {
          const element = temp_values['客服操作'][key];
          temp_values['kefu'][key] = temp_values['客服操作'][key][1];
          // 判断配件
          if ((element[1] == '3-4-0') ||
            (element[1] == '3-5-0')) {
            if (element[1] in temp_values) {
              if (temp_values[element[1]] != '') {
                temp_values['kefu'][key] += '$' + temp_values[element[1]].replace(new RegExp(',', ("gm")), '#') + 'ship' + temp_values[element[1] + '补寄次数'];
              } else {
                if (temp_values['订单状态'] == '已解决') {
                  sku_in = false;
                  message.error('请填写配件');
                }
              }

            } else {
              if (temp_values['订单状态'] == '已解决') {
                sku_in = false;
                message.error('请填写配件');
              }
            }
          }
          // 判断补寄新件
          if ((element[1] == '3-1-0') || (element[1] == '3-2-0') || (element[1] == '3-3-0')) {
            if (element[1] in temp_values) {
              const temp_element = temp_values[element[1]];
              const temp_element_num = temp_values[element[1] + '数量'];
              temp_values['kefu'][key] += '$' + temp_element + 'num' + temp_element_num;
            }
          }
          if ((element[1] == '2-1-0') || (element[1] == '2-2-0') || (element[1] == '2-3-0')
            || (element[1] == '2-4-0') || (element[1] == '2-5-0') || (element[1] == '2-6-0')
            || (element[1] == '2-7-0') || (element[1] == '2-8-0') || (element[1] == '2-9-0')) {
            if (element[1] + '退货次数' in temp_values) {
              const temp_element_num = temp_values[element[1] + '退货次数'];
              temp_values['kefu'][key] += 'ship' + temp_element_num;
            }
          }
        }
      }
      temp_values['kefu'] = temp_values['kefu'].join('&');
      if (sku_in == true) {
        return request(`/api/afterinsert2021`, {
          method: 'POST',
          data: { ...temp_values },
          requestType: 'form',
        }).then(res => {
          //自行根据条件清除
          console.log(res);
          if (res == '请重新登录') {
            message.error('账户过期,请重新登录账号');
          } else if (res == '序列重复') {
            message.error('该订单号的序列重复(注意:订单号里每一件都要分开填写，第一件序号填1，第二件序号填2,第三件序号填3)');
          } else {
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
                  let temp_storage = temp_data.join('|');
                  temp_storage = JSON.stringify(temp_storage);
                  storage[item_dict[key]] = temp_storage;
                  //自行根据条件清除
                  if (parseInt(key) == 0) {
                    setdengji(temp_dict[0]);
                  } else if (parseInt(key) == 1) {
                    setosku(temp_dict[1]);
                  } else if (parseInt(key) == 3) {
                    setbeizhu([]);
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
                  setbeizhu([]);
                }
              }
            }
            formRef.current?.resetFields();
            setdetailitem([]);
            setdetailreason([]);
            setrefund(0);
            setresku([]);
            setreturnsku([]);
          }
        });

      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      {/* <div style={{ textAlign: "center", color: "#EE7700", fontSize: 16 }}>
        <p><SoundOutlined />　最新更改:</p>
        <p>默认时间为01-01 到 02-26</p>
      </div> */}
      <Access accessible={access.AfterManager()}>
        <ProForm
          autoComplete="on"
          size='small'
          formRef={formRef}
          initialValues={{
            '登记人': initialState.currentUser?.name
          }}
          onFinish={async (values, ...rest) => {
            values['订单号'] = values['订单号'].replace(new RegExp(' ', ("gm")), '').replace(new RegExp('/[\r\n]/g', ("gm")), "").replace(new RegExp('　', ("gm")), "");
            if ((yuanyingerror == true) || (fankuierror == true)) {
              message.error('顾客反馈和客服操作不能只选大类');
            } else if (data?.order_name.indexOf(values['订单号']) > -1) {
              settemp_values(values);
              setIsModalVisible(true);
            } else if ((data?.order_name.indexOf(values['订单号']) < -1) && (order_name?.indexOf(values['订单号']) > -1)) {
              settemp_values(values);
              setIsModalVisible(true);
            }
            else {
              // 规范数据
              let sku_in = true;
              values['SKU'] = values['SKU'].replace(new RegExp('，', ("gm")), ',');
              values['SKU'] = values['SKU'].replace(new RegExp(' ', ("gm")), '');
              values['SKU'] = values['SKU'].replace(new RegExp('  ', ("gm")), '');

              if ('3-1-0' in values) {
                // 如果不为空，则重新判断是否正确
                values['3-1-0'] = values['3-1-0'].replace(new RegExp('，', ("gm")), ',');
                values['3-1-0'] = values['3-1-0'].replace(new RegExp(' ', ("gm")), '');
                values['3-1-0'] = values['3-1-0'].replace(new RegExp('  ', ("gm")), '');
              } else {
                if ('3-1-0数量' in values) {
                  values['3-1-0'] = values['SKU'];
                }
              }
              if ('3-2-0' in values) {
                // 如果不为空，则重新判断是否正确
                values['3-2-0'] = values['3-2-0'].replace(new RegExp('，', ("gm")), ',');
                values['3-2-0'] = values['3-2-0'].replace(new RegExp(' ', ("gm")), '');
                values['3-2-0'] = values['3-2-0'].replace(new RegExp('  ', ("gm")), '');
              } else {
                if ('3-2-0数量' in values) {
                  values['3-2-0'] = values['SKU'];
                }
              }
              if ('3-3-0' in values) {
                // 如果不为空，则重新判断是否正确
                values['3-3-0'] = values['3-3-0'].replace(new RegExp('，', ("gm")), ',');
                values['3-3-0'] = values['3-3-0'].replace(new RegExp(' ', ("gm")), '');
                values['3-3-0'] = values['3-3-0'].replace(new RegExp('  ', ("gm")), '');
              } else {
                if ('3-3-0数量' in values) {
                  values['3-3-0'] = values['SKU'];
                }
              }
              values['guke'] = new Array();
              values['kefu'] = new Array();
              // 顾客反馈做处理
              for (const key in values['顾客反馈']) {
                if (Object.prototype.hasOwnProperty.call(values['顾客反馈'], key)) {
                  const element = values['顾客反馈'][key];
                  values['guke'][key] = values['顾客反馈'][key][1];
                  if ((element[0] == '5-0') ||
                    (element[0] == '6-0') || (element[0] == '7-0')) {
                    if (element[1] in values) {
                      if (values[element[1]] != '') {
                        values['guke'][key] += '$' + values[element[1]].replace(new RegExp(',', ("gm")), '#');
                      } else {
                        if (values['订单状态'] == '已解决') {
                          sku_in = false;
                          message.error('请填写配件');
                        }
                      }

                    } else {
                      if (values['订单状态'] == '已解决') {
                        sku_in = false;
                        message.error('请填写配件');
                      }
                    }
                  }
                }
              }
              values['guke'] = values['guke'].join('&');
              // 客服操作做处理
              for (const key in values['客服操作']) {
                if (Object.prototype.hasOwnProperty.call(values['客服操作'], key)) {
                  const element = values['客服操作'][key];
                  values['kefu'][key] = values['客服操作'][key][1];
                  // 判断配件
                  if ((element[1] == '3-4-0') ||
                    (element[1] == '3-5-0')) {
                    if (element[1] in values) {
                      if (values[element[1]] != '') {
                        values['kefu'][key] += '$' + values[element[1]].replace(new RegExp(',', ("gm")), '#') + 'ship' + values[element[1] + '补寄次数'];
                      } else {
                        if (values['订单状态'] == '已解决') {
                          sku_in = false;
                          message.error('请填写配件');
                        }
                      }
                    } else {
                      if (values['订单状态'] == '已解决') {
                        sku_in = false;
                        message.error('请填写配件');
                      }
                    }
                  }
                  // 判断补寄新件
                  if ((element[1] == '3-1-0') || (element[1] == '3-2-0') || (element[1] == '3-3-0')) {
                    if (element[1] in values) {
                      const temp_element = values[element[1]];
                      const temp_element_num = values[element[1] + '数量'];
                      values['kefu'][key] += '$' + temp_element + 'num' + temp_element_num;
                    }
                  }
                  if ((element[1] == '2-1-0') || (element[1] == '2-2-0') || (element[1] == '2-3-0')
                    || (element[1] == '2-4-0') || (element[1] == '2-5-0') || (element[1] == '2-6-0')
                    || (element[1] == '2-7-0') || (element[1] == '2-8-0') || (element[1] == '2-9-0')) {
                    if (element[1] + '退货次数' in values) {
                      const temp_element_num = values[element[1] + '退货次数'];
                      values['kefu'][key] += 'ship' + temp_element_num;
                    }
                  }
                }
              }
              values['kefu'] = values['kefu'].join('&');
              if (sku_in == true) {
                return request(`/api/afterinsert2021`, {
                  method: 'POST',
                  data: { ...values },
                  requestType: 'form',
                }).then(res => {
                  //自行根据条件清除
                  if (res == '请重新登录') {
                    message.error('账户过期,请重新登录账号');
                  } else if (res == '序列重复') {
                    message.error('该订单号的序列重复(注意:订单号里每一件都要分开填写，第一件序号填1，第二件序号填2,第三件序号填3)');
                  } else {
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
                          setbeizhu([]);
                        }
                      }
                    }
                    formRef.current?.resetFields();
                    setdetailitem([]);
                    setdetailreason([]);
                    setrefund(0);
                    setresku([]);
                    setreturnsku([]);
                  }

                });
              }
            }

          }
          }

        >
          <Row gutter={[32, 16]}>
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
            <Col span={5}>
              <ProForm.Item
                name="店铺"
                label="店铺"
                rules={[{ required: true, message: '请输入店铺!' }]}
              >
                <ProFormSelect
                  width="md"
                  fieldProps={{
                    listHeight: 450,
                  }}
                  valueEnum={{
                    'amazon尚铭': '尚铭',
                    'amazon优瑞斯特': '优瑞斯特',
                    'amazon赫曼': '赫曼',
                    'amazon信盒': '信盒',
                    'amazon宫本': '宫本',
                    'amazon森月': '森月',
                    'amazon维禄': '维禄',
                    'amazon玲琅': '玲琅',
                    'amazon信盒法国': '信盒-法国',
                    'amazon信盒意大利': '信盒-意大利',
                    'amazon信盒西班牙': '信盒-西班牙',
                    'wayfair信盒': 'Wayfair-信盒',
                    'wayfair维禄': 'Wayfair-维禄',
                    'walmart优瑞斯特': 'Walmart-优瑞斯特',
                    'walmart赫曼': 'Walmart-赫曼',
                    'walmart信盒': 'Walmart-信盒',
                    'walmart宫本': 'Walmart-宫本',
                    'ebay玲琅': 'eBay-玲琅',
                    'ebay治润': 'eBay-治润',
                    'ebay雅秦': 'eBay-雅秦',
                    'shopifynextfur': 'Nextfur-Shopify',
                    'amazon旗辰': '旗辰',
                    'amazon赛迦曼': '赛迦曼',
                    'amazon启珊': '启珊',
                    'amazon驰甬': '驰甬',
                    'amazon杉绮': '杉绮',
                    'amazon治润': '治润',
                    'amazoncpower': 'Central_Power_International_Limited',
                  }}
                />
              </ProForm.Item>
            </Col>
            <Col span={5}>
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
            <Col span={5}>
              <ProForm.Item
                name="SKU"
                label="SKU"
                rules={[{ required: true, message: 'AB箱填有问题的那箱，不同SKU请分条填写。' }, { pattern: /[^,||^，]$/, message: '限填一件' }]}
                tooltip="AB箱填有问题的那箱,限填一个"
              >
                <AutoComplete
                  placeholder="AB箱填有问题的,限填一个"
                  options={osku}
                />
              </ProForm.Item>
            </Col>
            <Col span={3}>
              <ProFormDigit
                width="md"
                name="序号"
                label="序号"
                placeholder=""
                initialValue={1}
                tooltip="同一个订单里，第一件填1，第二件填2，以此类推"
                rules={[{ required: true, message: '请输入' }]}
              />
            </Col >
            <Col span={3}>
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
            <Col span={4}>
              <ProForm.Item
                name="顾客反馈"
                label="顾客反馈"
                rules={[{ required: true, message: '请输入' }]}
              >
                <Cascader
                  multiple
                  className={styles.fankuicas}
                  onChange={fankuionChange}
                  options={fankuicol}
                  expandTrigger="hover"
                />

              </ProForm.Item>
            </Col>
            {getfankuipeijianFields()}
            <Col span={4}>
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
                  expandTrigger="hover"
                />
              </ProForm.Item>
            </Col>
            {getyuanyingFields()}
            <Col span={5}>
              <ProForm.Item
                name="是否上传图片"
                label="是否上传图片"
                initialValue='未上传'
                tooltip="图片上传地址：\\Bd10\销售部共享盘\@销售数据\@销售共享盘\客诉图片\<SKU>\<订单号>"
                rules={[{ required: true, message: '请输入是否已上传!' }]}
              >
                <ProFormRadio.Group
                  width="md"

                  options={[
                    {
                      label: '已上传',
                      value: '已上传'
                    }, {
                      label: '未上传',
                      value: '未上传'
                    }
                  ]}
                />
              </ProForm.Item>
            </Col>
            <Col span={20}>
              <ProForm.Item
                name="备注" label="备注"
              >
                <AutoComplete
                >
                  <TextArea
                    placeholder="请填写详细(不得超过255个字)"
                    className="custom"
                    style={{ height: 50 }}
                    showCount={true}
                  />
                </AutoComplete>
              </ProForm.Item>
            </Col>
          </Row>
        </ProForm>
      </Access>
      <br />
      <ProTable
        size='small'
        toolbar={{
          actions: [
            <>
              <Access accessible={access.AfterExcel()} >
                <Button key="primary" type="primary" >
                  <a href="/api/aftersaletotal/">导出总表</a>
                </Button>
              </Access>
              <Button key="primary" type="primary" onClick={() => downloadExcel()}>
                导出为excel
              </Button>,
            </>
          ],
        }}
        search={{
          labelWidth: "auto",
          defaultCollapsed: false,
        }}
        rowKey="key"
        columns={column}
        actionRef={actionRef}
        onChange={onTableChange}
        scroll={{ x: 900, y: 500 }}
        request={async (params = {}) => {
          const result = request('/api/aftersale2021/', {
            method: 'POST',
            data: { ...params },
            requestType: 'form',
          });
          settableData(await result);
          const temp_result = await result;
          if (temp_result == '请重新登录') {
            message.error('账户过期,请重新登录账号');
          }
          return result;
        }}

        pagination={{
          pageSize: 100,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
        }}
        dateFormatter="string"
        headerTitle="售后表格"
      />
      {
        !isModalVisibleEdit ? '' :
          <Access accessible={access.AfterManager()} >
            <Edit
              isModalVisible={isModalVisibleEdit}
              isShowModal={isShowModalEdit}
              actionRef={actionRef}
              editId={editId}
            />
          </Access>
      }
      {/* 订单重复提示 */}
      <Modal title="警示" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>记录中已含有该订单号，确认是否提交？</p>
      </Modal>
    </>
  );
}

export default TableList

