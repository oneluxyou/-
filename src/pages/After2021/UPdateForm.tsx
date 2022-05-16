import React, {useState} from 'react';
import {Form, message, Modal, Row, Col} from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  StepsForm,
  ProFormDigit, ModalForm,
} from '@ant-design/pro-form';
import request from "umi-request";
import {PageContainer} from "@ant-design/pro-layout";
import {ProFieldProps} from "@ant-design/pro-utils";
import ProFormItem from "@ant-design/pro-form/es/components/FormItem";


export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
};

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  handleupdateModalVisible: boolean;
  values: any;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};




const MYform: React.FC<UpdateFormProps> = (props) => {
  return(
    <ModalForm
      autoFocusFirstInput
      visible={props.updateModalVisible}
      title="售后修改"
      onFinish={async () => {
        message.success('提交成功');

        return true;
        //
      }}
    >

      <ProForm.Group>
        <ProFormText
          width="md"
          name="登记人"
          label="登记人"
          placeholder="请输入名称"
          initialValue={props.values.登记人}
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
          initialValue={props.values.店铺}
          rules={[{ required: true, message: '请输入店铺!' }]}
        />
        <ProFormText width="md" name="订单号" label="订单号" rules={[{ required: true, message: '请输入订单号!' }]} initialValue={props.values.订单号}/>
        <ProFormText width="md" name="SKU" label="SKU" initialValue={props.values.SKU} tooltip="请勿输入渠道SKU/订单号/包裹号" placeholder="两箱包形如'USAN1018800-5,USAN1018800-6'" rules={[{ required: true, message: '两箱包的请输入两个公司SKU'}]}/>
        <ProFormSelect
          width="md"
          name="处理方式"
          label="处理方式"
          placeholder="请输入处理方式"
          initialValue={props.values.处理方式}
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
          initialValue={props.values.Refund}
          tooltip="若无退款,默认输入0"
          rules={[{ required: true, message: '若无退款,请输入0' }]}
        />
        <ProFormSelect
          initialValue={props.values.原因}
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
          initialValue={props.values.Replacement}
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
          initialValue={props.values.Used}
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
        <ProFormText width="md" initialValue={props.values.售后反馈} name="售后反馈" label="售后反馈" />
        <ProFormText width="xl" initialValue={props.values.备注} name="备注" label="备注" />
      </ProForm.Group>

    </ModalForm>

  )
}

export default MYform;

