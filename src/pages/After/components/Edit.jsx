import React, {useEffect, useState} from "react";
import ProForm, {ProFormDigit, ProFormSelect, ProFormText} from "@ant-design/pro-form";
import {message, Modal, Skeleton} from "antd";
import {edit_after} from "@/services/myapi";
import request from "umi-request";

const Edit = (props) => {
  const [initialValues, setInitialValues] = useState(undefined)
  const {isModalVisible} = props
  const {isShowModal} = props
  const {actionRef} = props
  const {editId} = props



  useEffect(async () => {

    //发请求取售后详情
    if (editId !== undefined) {
      const response = await edit_after(editId)

      setInitialValues({
        id:response.id,
        登记人:response.登记人,
        店铺:response.店铺,
        订单号:response.订单号,
        SKU:response.SKU,
        处理方式:response.处理方式,
        Refund:response.Refund,
        原因:response.原因,
        Replacement:response.Replacement,
        退件:response.退件,
        售后反馈:response.售后反馈,
        备注:response.备注,
      })
    }
  },[])


  /**
   * 售后修改
   * @param values 表单数据
   */
  const editafter = async values => {
    //发送请求，修改售后
    const response = await editafter(editId, values)
    if (response.status === undefined){
      message.success('修改成功')
      //刷新表格数据
      actionRef.current.reload()
      //关闭模态框
      isShowModal(false)
    }
  }


  return (
    <Modal
      width="800px"
      title="售后修改"
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
    >

      {
        initialValues === undefined ? <Skeleton paragraph={{rows: 8}}/>:
          <ProForm
            initialValues={ initialValues }
            onFinish={async (values) => {

              console.log(values);
              message.success('提交成功');
              isShowModal(false);
              return request(`http://www.onelux.club:5000/after/change`, {
                method: 'POST',
                data: {...values},
                requestType: 'form',
              });
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
                  '赫曼':'赫曼',
                  '信盒':'信盒',
                  '宫本':'宫本',
                  '森月':'森月',
                  '维禄':'维禄',
                  '玲琅':'玲琅',
                  '信盒-法国':'信盒-法国',
                  '信盒-意大利':'信盒-意大利',
                  '信盒-西班牙':'信盒-西班牙',
                  'Wayfair-信盒':'Wayfair-信盒',
                  'Wayfair-维禄':'Wayfair-维禄',
                  'Walmart-优瑞斯特':'Walmart-优瑞斯特',
                  'Walmart-赫曼':'Walmart-赫曼',
                  'Walmart-信盒':'Walmart-信盒',
                  'Walmart-宫本':'Walmart-宫本',
                  'eBay-玲琅':'eBay-玲琅',
                  'eBay-治润':'eBay-治润',
                  'eBay-雅秦':'eBay-雅秦',
                  'Nextfur-Shopify':'Nextfur-Shopify',
                  '旗辰':'旗辰',
                  '塞迦曼'：'塞迦曼',
                  '启珊'：'启珊',
                  '驰甬'：'驰甬',
                  '杉绮'：'杉绮',
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
                  'Wait Reply':'Wait Reply',
                  'Cancel Order':'Cancel Order',
                  'Closed':'Closed',
                  'Replacement':'Replacement',
                  'Refund':'Refund',
                  'Used':'Used',
                  'Refund and Replacement':'Refund and Replacement',
                  'Delivery Consultation':'Delivery Consultation',
                }}
                rules={[{ required: true, message: '请输入处理方式!' }]}
              />
              <ProFormDigit
                width="md"
                name="Refund"
                label="Refund"
                placeholder=""
                tooltip="若无退款,默认输入0"
                rules={[{ required: true, message: '若无退款,请输入0' }]}
              />
              <ProFormSelect
                width="md"
                name="原因"
                label="原因"
                placeholder="请输入原因"
                valueEnum={{
                  '少配件':'少配件',
                  '外观问题（安装前）':'外观问题（安装前）',
                  '组装问题（安装中）':'组装问题（安装中）',
                  '结构问题（安装后）':'结构问题（安装后）',
                  '其它质量问题':'其它质量问题',
                  '质量&少配件':'质量&少配件',
                  '运输破损':'运输破损',
                  '仓库':'仓库',
                  '快递':'快递',
                  '买家':'买家',
                  '销售':'销售',
                }}
                rules={[{ required: true, message: '请输入原因!' }]}
              />
              <ProFormSelect
                width="md"
                name="Replacement"
                label="Replacement"
               valueEnum={{
                  'RP-国外新件':'RP-国外新件',
                  'RP-国外配件':'RP-国外配件',
                  'RP-国外退件':'RP-国外退件',
                  'RP-国内补寄配件':'RP-国内补寄配件',
                }}
              />
              <ProFormSelect
                width="md"
                name="Used"
                label="退件"
                valueEnum={{
                  '买家承担':'买家承担',
                  '卖家承担-上门取件':'卖家承担-上门取件',
                  '卖家承担-退货标签':'卖家承担-退货标签',
                  '拦截':'拦截',
                }}
              />
              <ProFormText width="md" name="售后反馈" label="售后反馈" />
              <ProFormText width="xl"  name="备注" label="备注" />
            </ProForm.Group>
          </ProForm>
      }
    </Modal>
  )
}

export default Edit

