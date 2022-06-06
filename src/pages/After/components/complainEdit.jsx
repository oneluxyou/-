import React, { useEffect, useState } from "react";
import ProForm, { ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea, ProFormRadio, ProFormDatePicker } from "@ant-design/pro-form";
import { message, Modal, Skeleton, Cascader, Input } from "antd";
import { edit_after_cb, edit_after_cb_sku } from "@/services/myapi";
import request from "umi-request";
import { useRequest } from 'umi';
import moment from "moment";

const CBEdit = (props) => {
  const [initialValues, setInitialValues] = useState(undefined);
  const { data } = useRequest({
    url: '/api/sku/static',
    method: 'get',
  });
  // 联动表单数值
  // 反馈翻译
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
  // 原因翻译
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
  const { isModalVisible } = props;
  const { isShowModal } = props;
  const { actionRef } = props;
  const { editId } = props;
  const { editOrder } = props;
  const { editSKU } = props;
  const { editSaler } = props;
  const { editStore } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let initial_dic = {};
    //发请求取售后详情
    if (editId !== undefined) {
      const response = await edit_after_cb(editId);
      // 创建初始数组(用来存配件)
      initial_dic = {
        id: response.id,
        负责人: response.负责人,
        公司SKU: response.公司SKU,
        订单号: response.订单号,
        店铺: response.店铺,
        申请日期: response.申请日期,
        截止日期: response.截止日期,
        状态: response.状态,
        金额: response.金额,
        备注: response.备注,
      };
      setInitialValues(initial_dic);
    } else {
      const response = await edit_after_cb_sku('无', editOrder, editSKU, editSaler, editStore);
      console.log(response);
      if (response.length == 0) {
        // 创建初始数组(用来存配件)
        initial_dic = {
          负责人: editSaler,
          店铺: editStore,
          订单号: editOrder,
          公司SKU: editSKU,
          id: '新增',
          申请日期: moment(new Date()),
          截止日期: moment(new Date()),
          金额: 0
        };
        message.info('CB无该订单号');
      } else {
        // 创建初始数组(用来存配件)
        initial_dic = {
          id: response[0].id,
          负责人: response[0].负责人,
          公司SKU: response[0].公司SKU,
          订单号: response[0].订单号,
          店铺: response[0].店铺,
          申请日期: response[0].申请日期,
          截止日期: response[0].截止日期,
          状态: response[0].状态,
          金额: response[0].金额,
          备注: response[0].备注,
        };
        if (response[0].result == '正常') {
          message.info('CB有该记录，可直接编辑');
        } else if (response[0].result == '无该订单号') {
          message.info('CB无该订单号');
        } else if (response[0].result == '该订单号下无该SKU') {
          message.error('CB页面该订单号无对应公司sku，请核查');
        } else if (response[0].result == '该订单号有多条数据') {
          message.info('该订单号有多条记录为该sku，只能选择其中一条记录');
        }
      }

      setInitialValues(initial_dic);
    }
  }, [])
  /**
   * 售后修改
   * @param values 表单数据
   */
  const editafter = async values => {
    //发送请求，修改售后
    const response = await editafter(editId, values);
    if (response.status === undefined) {
      message.success('修改成功');
      //刷新表格数据
      actionRef.current.reload();
      //关闭模态框
      isShowModal(false);
    }
  }

  // 翻译编码
  const fankuionChange = (value) => {
    const temp_peijian = [];
    const temp_item = [];
    let temp_fankuierror = false;
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

  return (
    <Modal
      width="800px"
      height="500px"
      title="售后修改"
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
    >

      {
        initialValues === undefined ? <Skeleton paragraph={{ rows: 8 }} /> :
          <ProForm
            initialValues={initialValues}
            onFinish={async (values) => {
              values['订单号'] = values['订单号'].replace(new RegExp(' ', ("gm")), '').replace(new RegExp('/[\r\n]/g', ("gm")), "").replace(new RegExp('　', ("gm")), "");
              values['公司SKU'] = values['公司SKU'].replace(new RegExp('，', ("gm")), ',');
              values['公司SKU'] = values['公司SKU'].replace(new RegExp(' ', ("gm")), '');
              values['公司SKU'] = values['公司SKU'].replace(new RegExp('  ', ("gm")), '');
              // 判断sku是否含有
              if (!data.sku_name.find((item) => item == values['公司SKU'])) {
                message.error('传入的SKU:' + values['公司SKU'] + '不正确(注:AB箱只填有问题的那箱，不同SKU请分条填写。)');
              }
              if (values['id'] !== '新增') {
                return request(`/api/after/changecb`, {
                  method: 'POST',
                  data: { ...values },
                  requestType: 'form',
                }).then(res => {
                  console.log(res);
                  if (res == '不能更改') {
                    message.error('【已校对】状态不可更改,若要更改这条记录,请先更换订单状态');
                  } else {
                    message.success('提交成功');
                    isShowModal(false);
                  }
                });
              } else {
                return request(`/api/afterinsertcb`, {
                  method: 'POST',
                  data: { ...values },
                  requestType: 'form',
                }).then(res => {
                  console.log(res);
                  if (res == '不能更改') {
                    message.error('【已校对】状态不可更改,若要更改这条记录,请先更换订单状态');
                  } else {
                    message.success('提交成功');
                    isShowModal(false);
                  }
                });
              }

              //if (response.status === undefined) message.success('添加成功')
            }}
          >
            <ProForm.Group>
              <ProFormText
                disabled
                width="md"
                name="id"
                label="编号"
                placeholder=""
                rules={[{ required: true, message: '请输入编号!' }]}
              />
              <ProFormText
                width="md"
                name="负责人"
                label="负责人"
                placeholder="请输入负责人"
                rules={[{ required: true, message: '请输入负责人!' }]}
              />
              <ProFormText width="md" name="订单号" label="订单号" rules={[{ required: true, message: '请输入订单号!' }]} />
              <ProFormText width="md" name="公司SKU" label="公司SKU" tooltip="AB箱只填有问题的，限填一个。" placeholder="AB箱只填有问题的，限填一个。"
                rules={[{ required: true, message: 'AB箱只填有问题的，限填一个。' }, { pattern: /[^,||^，]$/, message: '限填一件' }]}
              />
              <ProFormSelect
                width="md"
                name="店铺"
                label="店铺"
                placeholder="请输入店铺"
                fieldProps={{
                  size: "small",
                  listHeight: 250,
                }}
                valueEnum={{
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
                rules={[{ required: true, message: '请输入店铺!' }]}
              />
              <ProFormDatePicker
                width="md"
                name="申请日期"
                label="申请日期"
                placeholder="请输入申请日期"

              />
              <ProFormDatePicker
                width="md"
                name="截止日期"
                label="截止日期"
                placeholder="请输入截止日期"

              />
              <ProFormDigit
                width="md"
                name="金额"
                label="金额"
                placeholder=""
                initialValue={0}
                tooltip="若无,默认输入0"
                rules={[{ required: true, message: '若无,请输入0' }]}
              />
              <ProFormRadio.Group
                width="md"
                name="状态"
                label="状态"
                valueEnum={{
                  'Resolved': 'Resolved',
                  'Pending': 'Pending',
                  'Seller refunded': 'Seller refunded',
                  'Action required': 'Action required',
                }}
                rules={[{ required: true, message: '请输入是否已上传!' }]}
              />
              <ProFormTextArea
                name="备注"
                label="备注"
                style={{ height: 50 }}
                maxLength={150}
              />
            </ProForm.Group>
          </ProForm>
      }
    </Modal>
  )
}

export default CBEdit

