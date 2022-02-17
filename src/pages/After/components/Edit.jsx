import React, { useEffect, useState } from "react";
import ProForm, { ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import { message, Modal, Skeleton, Cascader, Input } from "antd";
import { edit_after } from "@/services/myapi";
import request from "umi-request";
import { useRequest } from 'umi';

const Edit = (props) => {
  const [initialValues, setInitialValues] = useState(undefined);
  const { data } = useRequest({
    url: '/api/sku/static',
    method: 'get',
  });
  // 联动添加
  const [peijian, setpeijian] = useState([]);
  const [detailitem, setdetailitem] = useState([]);
  const [yuanying, setyuanying] = useState([]);
  const [detailreason, setdetailreason] = useState([]);
  const [refund, setrefund] = useState(0);
  const [renew, setrenew] = useState('0');
  const { isModalVisible } = props;
  const { isShowModal } = props;
  const { actionRef } = props;
  const { editId } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

    //发请求取售后详情
    if (editId !== undefined) {
      const response = await edit_after(editId);
      console.log(response);
      // 创建初始数组(用来存配件)
      let initial_dic = {
        id: response.id,
        登记人: response.登记人,
        店铺: response.店铺,
        订单号: response.订单号,
        SKU: response.SKU,
        订单状态: response.订单状态,
        Refund: response.Refund,
        备注: response.备注,
      };
      // 对顾客反馈和客服操作进行处理
      response.顾客反馈 = response.顾客反馈.split("&");
      response.客服操作 = response.客服操作.split("&");
      const temp_fankui = new Array();
      const temp_yuanying = new Array();
      for (const key in response.顾客反馈) {
        if (Object.hasOwnProperty.call(response.顾客反馈, key)) {
          let element = response.顾客反馈[key];
          element = element.split('$');
          const temp_first = element[0].split('-');
          response.顾客反馈[key] = [temp_first[0] + '-0', element[0]];
          if ((element.length > 1)) {
            initial_dic[element[0]] = element[1];
            temp_fankui.push(element[0]);
          }
        }
      }
      for (const key in response.客服操作) {
        if (Object.hasOwnProperty.call(response.客服操作, key)) {
          let element = response.客服操作[key];
          element = element.split('$');
          const temp_first = element[0].split('-');
          response.客服操作[key] = [temp_first[0] + '-0', element[0]];
          if (element.length > 1) {
            if (element[0] == '3-1') {
              initial_dic.补寄新件 = element[1];
              setrenew('3-1');
            } else {
              initial_dic[element[0]] = element[1];
              temp_yuanying.push(element[0]);
            }


          }
        }
      }
      initial_dic.客服操作 = response.客服操作
      initial_dic.顾客反馈 = response.顾客反馈
      setInitialValues(initial_dic);
      setdetailitem(temp_fankui);
      setpeijian(temp_fankui);
      setdetailreason(temp_yuanying);
      setyuanying(temp_yuanying);
      setrefund(response.Refund);
    }
  }, [])
  /**
   * 售后修改
   * @param values 表单数据
   */
  const editafter = async values => {
    //发送请求，修改售后
    const response = await editafter(editId, values)
    if (response.status === undefined) {
      message.success('修改成功')
      //刷新表格数据
      actionRef.current.reload()
      //关闭模态框
      isShowModal(false)
    }
  }

  // 判断联动是否有一项只选了大类
  const [fankuierror, setfankuierror] = useState(false);
  const [yuanyingerror, setyuanyingerror] = useState(false);
  const fankuionChange = (value) => {
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
      )
    }
    return children;
  }
  const yuanyingChange = (value) => {
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
        </ProForm.Item >
      )
    }
    let temp_refund = 0;
    if (refund != 0) {
      temp_refund = 1;
      children.push(
        <ProFormDigit
          width="md"
          name="Refund"
          label="Refund"
          placeholder=""
          initialValue="0"
          tooltip="若无退款,默认输入0"
          rules={[{ required: true, message: '若无退款,请输入0' }]}
        />
      )
    }
    let temp_renew = 0;
    if (renew != '0') {
      temp_renew = 1;
      children.push(
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
          label: '改成包装SKU和自发货不一致',
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

  return (
    <Modal
      width="800px"
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
              // 规范数据
              let sku_in = true;
              values['SKU'] = values['SKU'].replace(new RegExp('，', ("gm")), ',');
              values['SKU'] = values['SKU'].replace(new RegExp(' ', ("gm")), '');
              values['SKU'] = values['SKU'].replace(new RegExp('  ', ("gm")), '');
              const sku = values['SKU'].split(',');
              // 判断sku是否含有
              sku.forEach((element) => {
                if (!data.sku_name.find((item) => item == element)) {
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
                temp_newsku.forEach((element) => {
                  if (!data.sku_name.find((item) => item == element)) {
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
              isShowModal(false);
              message.success('提交成功');
              isShowModal(false);
              if (sku_in == true) {
                return request(`/api/after/change`, {
                  method: 'POST',
                  data: { ...values },
                  requestType: 'form',
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
                rules={[{ required: true, message: '请输入名称!' }]}
              />
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
                }}
                rules={[{ required: true, message: '请输入店铺!' }]}
              />
              <ProFormText width="md" name="订单号" label="订单号" rules={[{ required: true, message: '请输入订单号!' }]} />
              <ProFormText width="md" name="SKU" label="SKU" tooltip="请勿输入渠道SKU/订单号/包裹号" placeholder="两箱包形如'USAN1018800-5,USAN1018800-6'" rules={[{ required: true, message: '两箱包的请输入两个公司SKU' }]} />
              <ProFormSelect
                width="md"
                name="订单状态"
                label="订单状态"
                placeholder="请输入订单状态"
                valueEnum={{
                  '已解决': '已解决',
                  '解决中': '解决中',
                }}
                rules={[{ required: true, message: '请输入店铺!' }]}
              />
              <ProForm.Item
                name="顾客反馈"
                label="顾客反馈"
                rules={[{ required: true, message: '请输入' }]}
              >
                <Cascader
                  multiple
                  maxTagCount="responsive"
                  onChange={fankuionChange}
                  style={{ width: '150px' }}
                  options={fankuicol}
                />
              </ProForm.Item>
              {getfankuipeijianFields()}
              <ProForm.Item
                name="客服操作"
                label="客服操作"
                rules={[{ required: true, message: '请输入' }]}
              >
                <Cascader
                  multiple
                  maxTagCount="responsive"
                  onChange={yuanyingChange}
                  style={{ width: '150px' }}
                  options={yuanyingcol}
                />

              </ProForm.Item>
              {getyuanyingFields()}
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

export default Edit

