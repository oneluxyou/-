import React, { useEffect, useState } from "react";
import ProForm, { ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea, ProFormRadio } from "@ant-design/pro-form";
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
  // 联动添加
  const [peijian, setpeijian] = useState([]);
  const [detailitem, setdetailitem] = useState([]);
  const [yuanying, setyuanying] = useState([]);
  const [detailreason, setdetailreason] = useState([]);
  const [refund, setrefund] = useState(0);
  const [renew, setrenew] = useState([]);
  const [yuanyinchina, setyuanyinchina] = useState([]);
  // 退货次数显示
  const [returnsku, setreturnsku] = useState([]);
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
      if ((response.是否上传图片 != '已上传') & ((response.顾客反馈).indexOf('Z') > -1) || (response.顾客反馈.indexOf('Y') > -1) || (response.顾客反馈.indexOf('S') > -1)) {
        message.info('含有工厂原因，若要到售后图片，在共享盘中上传并在【是否上传图片】里选择"已上传"', 5);
      }
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
        序号: response.序号,
        是否上传图片: response.是否上传图片,
      };
      // 对顾客反馈和客服操作进行处理
      response.顾客反馈 = response.顾客反馈.split("&");
      response.客服操作 = response.客服操作.split("&");
      const temp_fankui = new Array();
      const temp_yuanying = new Array();
      const temp_renew = new Array();
      for (const key in response.顾客反馈) {
        if (Object.hasOwnProperty.call(response.顾客反馈, key)) {
          let element = response.顾客反馈[key];
          element = element.split('$');
          const temp_first = element[0].split('-');
          response.顾客反馈[key] = [temp_first[0] + '-0', element[0]];
          if ((element.length > 1)) {
            initial_dic[element[0]] = element[1].replace(new RegExp('#', ("gm")), ',');
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
          // 数量更换
          if (element.length > 1) {
            if ((element[0] == '3-1-0') || (element[0] == '3-2-0') || ((element[0] == '3-3-0'))) {
              const temp_element = element[1].split('num');
              initial_dic[element[0]] = temp_element[0].replace(new RegExp('#', ("gm")), ',');
              initial_dic[element[0] + '数量'] = temp_element[1];
              temp_renew.push(element[0]);
            } else if ((element[0] == '3-4-0') || (element[0] == '3-5-0')) {
              const temp_element = element[1].split('ship');
              initial_dic[element[0]] = temp_element[0].replace(new RegExp('#', ("gm")), ',');
              initial_dic[element[0] + '补寄次数'] = temp_element[1];
              temp_yuanying.push(element[0]);
            }
            else {
              initial_dic[element[0]] = element[1].replace(new RegExp('#', ("gm")), ',');
              temp_yuanying.push(element[0]);
            }
          } else {
            const temp_element = element[0].split('ship');
            if ((temp_element[0] == '2-1-0') || (temp_element[0] == '2-2-0') || (temp_element[0] == '2-3-0')
              || (temp_element[0] == '2-4-0') || (temp_element[0] == '2-5-0') || (temp_element[0] == '2-6-0')
              || (temp_element[0] == '2-7-0') || (temp_element[0] == '2-8-0') || (temp_element[0] == '2-9-0')) {
              response.客服操作[key] = [temp_first[0] + '-0', temp_element[0].replace(new RegExp('#', ("gm")), ',')];
              initial_dic[element[0] + '退货次数'] = temp_element[1];
              returnsku.push(element[0]);
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
      setrenew(temp_renew);
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
  // 翻译编码
  const fankui_tran = {
    "1-1-C": "未上网(未收到)",
    "1-2-X": "缺货(未收到)",
    "1-3-K": "显示到货/签收(未收到)",
    "1-4-K": "快递停滞/送错州/要求自提(未收到)",
    "1-5-K": "快递中途破损/退回(未收到)",
    "1-6-X": "未录入自发货(未收到)",
    "2-1-C": "仓库发错(发错货)",
    "2-2-Z": "工厂装错(发错货)",
    "3-1-M": "发货后改地址(改地址)",
    "3-2-M": "询问物流(改地址)",
    "4-1-M": "无理由退货(不想要)",
    "4-2-X": "网页描述与实物不符(不想要)",
    "4-3-M": "不符合预期/不满意(不想要)",
    "4-4-K": "超时送达(不想要)",
    "4-5-Z": "有异味(不想要)",
    "4-6-M": "重复下单(不想要)",
    "4-7-X": "价格贵(不想要)",
    "4-8-F": "无法安装/不会用(不想要)",
    "4-9-M": "未授权购买/不小心购买(不想要)",
    "4-10-K": "快递态度恶劣(不想要)",
    "4-11-F": "需要床箱/床垫不适合(不想要)",
    "4-12-M": "尺寸/颜色买错(不想要)",
    "4-13-M": "更换付款方式(不想要)",
    "4-14-M": "其他(不想要)",
    "5-1-Y": "断裂(包装破损)",
    "5-2-Y": "弯折/开裂/变形(包装破损)",
    "5-3-Y": "破损/破洞(包装破损)",
    "5-4-Y": "松动/掉落(包装破损)",
    "5-5-Y": "腐蚀/发霉/生虫/生锈/污渍(包装破损)",
    "5-6-Y": "划痕/凹痕/凸痕/压痕/褶皱(包装破损)",
    "5-7-Y": "少配件(包装破损)",
    "6-1-Z": "断裂(包装未破损)",
    "6-2-Z": "弯折/开裂/变形(包装未破损)",
    "6-3-Z": "破损/破洞(包装未破损)",
    "6-4-Z": "松动/掉落(包装未破损)",
    "6-5-Z": "腐蚀/发霉/生虫/生锈/污渍(包装未破损)",
    "6-6-Z": "划痕/凹痕/凸痕/压痕/褶皱(包装未破损)",
    "6-7-S": "少配件(包装未破损)",
    "6-8-S": "错件(包装未破损)",
    "6-9-Z": "异味(包装未破损)",
    "6-10-Z": "走线歪斜/纽扣歪斜(包装未破损)",
    "6-11-Z": "孔位错误/缺失(包装未破损)",
    "6-12-Z": "色差(包装未破损)",
    "6-13-Z": "配件功能失效(包装未破损)",
    "6-14-S": "缺少编号/说明书或标签贴错(包装未破损)",
    "7-1-Z": "断裂(使用后故障)",
    "7-2-Z": "弯折/开裂/变形(使用后故障)",
    "7-3-Z": "配件松脱(使用后故障)",
    "7-4-Z": "功能故障(使用后故障)",
    "7-5-Z": "产品不稳固(使用后故障)",
    "7-6-Z": "腐蚀/发霉/生虫/生锈(使用后故障)",
    "7-7-Z": "异味(使用后故障)",
    "7-8-Z": "噪音(使用后故障)",
    "8-1-M": "问题已反馈未解决(差评)",
    "8-2-M": "问题未反馈(差评)",
    "9-1-P": "描述/图片不符合(wayfair平台问题)",
    "9-2-P": "面单问题(wayfair平台问题)",
    "9-3-P": "平台客服拒绝沟通(wayfair平台问题)",
  }
  const yuanying_tran = {
    "1-1-0": "退全款",
    "1-2-0": "退部分款",
    "2-1-0": "出仓前截回",
    "2-2-0": "半路拦截退货",
    "2-3-0": "拒收退货",
    "2-4-0": "地址不明/错误退货",
    "2-5-0": "买家自行退货",
    "2-6-0": "买家使用我司Return label退货",
    "2-7-0": "买家使用平台 Return label退货",
    "2-8-0": "买家使用仓库Return label退货",
    "2-9-0": "买家上门取件退货",
    "2-10-0": "WF退货",
    "3-1-0": "海外仓补寄新件",
    "3-2-0": "海外仓补寄退件",
    "3-3-0": "海外仓补寄破损件",
    "3-4-0": "海外仓补寄配件",
    "3-5-0": "国内补寄配件",
    "3-6-0": "国内补寄电子说明书",
    "4-1-0": "label created暂不能修改",
    "4-2-0": "in transit已申请修改地址",
    "4-3-0": "修改失败",
    "5-1-0": "等待买家补充信息",
    "5-2-0": "等待开发提供方案",
    "5-3-0": "目前方案买家不满意",
    "5-4-0": "已解决"
  }
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
  const getfankuipeijianFields = () => {
    const children = [];
    for (let i = 0; i < detailitem.length; i++) {
      children.push(
        <ProForm.Item
          label={'顾客反馈:' + fankui_tran[detailitem[i]]}
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
      )
    }
    return children;
  }
  const yuanyingChange = (value, selectOptions) => {
    const temp_yuanying = [];
    const temp_reason = [];
    const temp_yuanyinchina = [];
    // 判断是否填写了大类
    let temp_yuanyingerror = false;
    let temp_refund = 0;
    let count_0 = 0;
    let count_1 = 0;
    let count_2 = 0;
    let count_3 = 0;
    const temp_renew = [];
    const temp_renewchina = [];
    const temp_returnsku = [];
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        if (element.length > 1) {
          // 判断小类是否有两个,若有两个及以上，则温馨提示
          if (element[0] == '1-0') {
            console.log(count_0);
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
    setrenew(temp_renew);
    setdetailreason(temp_reason);
    setyuanying(temp_yuanying);
  };
  const getyuanyingFields = () => {
    const children = [];
    for (let i = 0; i < detailreason.length; i++) {
      children.push(
        <>
          <ProForm.Item
            label={yuanying_tran[detailreason[i]]}
            name={detailreason[i]}
            tooltip="输入多个请用逗号隔开，第一位为大写字母，第二位为非0数字，第三位为数字或空,例：允许A，A1，A10，不允许1A，A01，a1。特例 编号标贴-B99 螺丝包-L99 排骨条-P99 说明书-S99 五金盒-W99 配件未知-U99"
            rules={[{ pattern: /(^[A-Z]{1}$)|(^[A-Z][1-9]{1}$)|(^[A-Z][1-9][0-9]{1}$)|((^[A-Z]{1}((,[A-Z]{1})|(,[A-Z][1-9]{1})|(,[A-Z][1-9][0-9]{1})){1,}$)|(^[A-Z][1-9]{1}((,[A-Z]{1})|(,[A-Z][1-9]{1})|(,[A-Z][1-9][0-9]{1})){1,}$)|(^[A-Z][1-9][0-9]{1}(((,[A-Z]{1})|(,[A-Z][1-9]{1})$|(,[A-Z][1-9][0-9]{1})){1,}$)))/, message: '请以大写字母+数字+数字的形式输入' }]}
          >
            <Input
              style={{ width: 150 }}
              name={detailreason[i]}
              placeholder="请输入配件"
            />
          </ProForm.Item >
          <ProFormDigit
            width="md"
            name={detailreason[i] + '补寄次数'}
            label={yuanying_tran[detailreason[i]] + '补寄次数'}
            placeholder=""
            initialValue={1}
            tooltip="默认为1"
            rules={[{ required: true, message: '请输出数量' }]}
          />
        </>
      )
    }
    let temp_refund = 0;
    if (refund != 0) {
      temp_refund = 1;
      children.push(
        <ProFormDigit
          width="md"
          name="Refund"
          label="退款金额"
          placeholder=""
          tooltip="若无退款,默认输入0"
          rules={[{ required: true, message: '若无退款,请输入0' }]}
        />
      )
    }
    if (returnsku.length >= 0) {
      for (let i = 0; i < returnsku.length; i++) {
        children.push(
          <>
            <ProFormDigit
              width="md"
              name={returnsku[i] + '退货次数'}
              label={'退货次数'}
              placeholder=""
              initialValue={1}
              tooltip="默认为1"
              rules={[{ required: true, message: '请输出数量' }]}
            />
          </>
        )
      }
    }
    if (renew.length >= 0) {
      for (let i = 0; i < renew.length; i++) {
        children.push(
          <>
            <ProForm.Item
              label={yuanying_tran[renew[i]]}
              name={renew[i]}
              tooltip="若为空，则为记录订单号填写的sku"
              rules={[{ pattern: /[^,||^，]$/, message: '限填一个' }]}
            >
              <Input
                width="md"
                placeholder="请填写具体补寄sku"
              />
            </ProForm.Item>
            <ProFormDigit
              width="md"
              name={[renew[i]] + '数量'}
              label={yuanying_tran[renew[i]] + '数量'}
              placeholder=""
              initialValue={1}
              tooltip="默认为1"
              rules={[{ required: true, message: '请输出数量' }]}
            />
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
              if ((yuanyingerror == true) || (fankuierror == true)) {
                message.error('顾客反馈和客服操作不能只选大类');
              } else {
                console.log(values);
                values['订单号'] = values['订单号'].replace(new RegExp(' ', ("gm")), '').replace(new RegExp('/[\r\n]/g', ("gm")), "").replace(new RegExp('　', ("gm")), "");
                // 规范数据
                let sku_in = true;
                values['SKU'] = values['SKU'].replace(new RegExp('，', ("gm")), ',');
                values['SKU'] = values['SKU'].replace(new RegExp(' ', ("gm")), '');
                values['SKU'] = values['SKU'].replace(new RegExp('  ', ("gm")), '');
                // 判断sku是否含有
                if (!data.sku_name.find((item) => item == values['SKU'])) {
                  sku_in = false;
                  message.error('传入的SKU:' + values['SKU'] + '不正确(注:AB箱只填有问题的那箱，不同SKU请分条填写。)');
                }
                if ('3-1-0' in values) {
                  // 如果不为空，则重新判断是否正确
                  values['3-1-0'] = values['3-1-0'].replace(new RegExp('，', ("gm")), ',');
                  values['3-1-0'] = values['3-1-0'].replace(new RegExp(' ', ("gm")), '');
                  values['3-1-0'] = values['3-1-0'].replace(new RegExp('  ', ("gm")), '');
                  if (!data.sku_name.find((item) => item == values['3-1-0'])) {
                    sku_in = false;
                    message.error('传入的补寄新件SKU:' + values['3-1-0'] + '不正确(注:AB箱只填有问题的那箱，不同SKU请分条填写。)');
                  }
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
                  if (!data.sku_name.find((item) => item == values['3-2-0'])) {
                    sku_in = false;
                    message.error('传入的补寄新件SKU:' + values['3-2-0'] + '不正确(注:AB箱只填有问题的那箱，不同SKU请分条填写。)');
                  }
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
                  if (!data.sku_name.find((item) => item == values['3-3-0'])) {
                    sku_in = false;
                    message.error('传入的补寄新件SKU:' + values['3-3-0'] + '不正确(注:AB箱只填有问题的那箱，不同SKU请分条填写。)');
                  }
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
                        console.log(values[element[1]]);
                        if (values[element[1]] != '') {
                          values['kefu'][key] += '$' + values[element[1]].replace(new RegExp(',', ("gm")), '#') + 'ship' + values[element[1] + '补寄次数'];;
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
                  return request(`/api/after/change`, {
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
              <ProFormText width="md" name="订单号" label="订单号" rules={[{ required: true, message: '请输入订单号!' }]} />
              <ProFormText width="md" name="SKU" label="SKU" tooltip="AB箱只填有问题的，限填一个。" placeholder="AB箱只填有问题的，限填一个。"
                rules={[{ required: true, message: 'AB箱只填有问题的，限填一个。' }, { pattern: /[^,||^，]$/, message: '限填一件' }]}
              />
              <ProFormDigit
                width="md"
                name="序号"
                disabled
                label="序号"
                placeholder=""
                initialValue={1}
                tooltip="默认序号为1，第二件为2，第三件为3"
                rules={[{ required: true, message: '请输入' }]}
              />
              <ProFormSelect
                width="md"
                name="订单状态"
                label="订单状态"
                placeholder="请输入订单状态"
                valueEnum={{
                  '已解决': '已解决',
                  '解决中': '解决中',
                }}
                rules={[{ required: true, message: '请输入状态!' }]}
              />
              <ProForm.Item
                name="顾客反馈"
                label="顾客反馈"
                rules={[{ required: true, message: '请输入' }]}
              >
                <Cascader
                  multiple
                  maxTagCount={4}
                  onChange={fankuionChange}
                  style={{ width: '300px' }}
                  dropdownMenuColumnStyle={{ height: '3vh' }}
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
                  maxTagCount={4}
                  onChange={yuanyingChange}
                  style={{ width: '300px' }}
                  options={yuanyingcol}
                />

              </ProForm.Item>
              {getyuanyingFields()}
              <ProFormRadio.Group
                width="md"
                name="是否上传图片"
                label="是否上传图片"
                valueEnum={{
                  '已上传': '已上传',
                  '未上传': '未上传',
                  '未检查': '未检查',
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

export default Edit

