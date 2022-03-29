import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-form';
import { message, Modal, Skeleton } from 'antd';
import { edit_sku } from '@/services/myapi';
import request from 'umi-request';

const Edit = (props) => {
  const [initialValues, setInitialValues] = useState(undefined);
  const { isModalVisible } = props;
  const { isShowModal } = props;
  const { actionRef } = props;
  const { editId } = props;
  const { skuName } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    //发请求取售后详情
    if (editId !== undefined) {
      const response = await edit_sku(editId);

      setInitialValues({
        id: response.id,
        渠道sku: response.渠道sku,
        ASIN: response.ASIN,
        公司SKU: response.公司SKU,
        运营: response.运营,
        运维: response.运维,
        组别: response.组别,
        店铺: response.店铺,
        KEY: response.KEY,
        sku序号: response.sku序号,
        开始时间: response.开始时间,
        结束时间: response.结束时间,
      });
    }
  }, []);

  /**
   * 匹配表修改
   * @param values 表单数据
   */
  const editsku = async (values) => {
    //发送请求，修改匹配表
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await editsku(editId, values);
    if (response.status === undefined) {
      message.success('修改成功');
      //刷新表格数据
      actionRef.current.reload();
      //关闭模态框
      isShowModal(false);
    }
  };

  return (
    <Modal
      width="800px"
      title="sku信息修改"
      visible={isModalVisible}
      onCancel={() => isShowModal(false)}
      footer={null}
    >
      {initialValues === undefined ? (
        <Skeleton paragraph={{ rows: 8 }} />
      ) : (
        <ProForm
          initialValues={initialValues}
          onFinish={async (values) => {
            let sku_in = true;
            let temp_sku = values['公司SKU'].replace('，', ',');
            temp_sku = temp_sku.replace('	', '');
            temp_sku = temp_sku.replace(' ', '');
            const sku = temp_sku.split(',');
            sku.forEach((element) => {
              if (!skuName.find((item) => item == element)) {
                sku_in = false;
                message.error('传入的SKU:' + element + '不正确');
              }
            });
            console.log(sku);
            values['店铺'] = JSON.stringify(values['店铺']);
            if (sku_in == true) {
              return request(`/api/sku/change`, {
                method: 'POST',
                data: { ...values },
                requestType: 'form',
              }).then(() => {
                message.success('修改成功');
                //刷新表格数据
                actionRef.current.reload();
                //关闭模态框
                isShowModal(false);
              });
              //if (response.status === undefined) message.success('添加成功')
            }
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
              name="渠道sku"
              label="渠道sku"
              placeholder="请输入渠道sku"
              tooltip="例如USAN1023801-1+2"
              rules={[{ required: true, message: '请输入渠道sku!' }]}
            />
            <ProFormText
              width="md"
              name="ASIN"
              label="ASIN"
              placeholder="请输入ASIN"
              tooltip="为亚马逊平台上的编码标识,例如B08NBZLZJQ,其他平台上则写Item ID字段,例如568192404"
            />
            <ProFormText
              width="md"
              name="公司SKU"
              label="公司SKU"
              placeholder="请输入SKU,多个sku用英文的‘,’隔开，捆绑SKU请拆成对应的SKU"
              tooltip="例如USAN1023801-1,USAN1023801-2 (多个sku用,隔开)"
              rules={[{ required: true, message: '请输入SKU!' }]}
            />
            <ProFormSelect
              width="md"
              name="店铺"
              label="店铺"
              tooltip="产品所在的店铺"
              // options={storeName}
              valueEnum={{
                walmart优瑞斯特: 'Walmart-优瑞斯特',
                walmart赫曼: 'Walmart-赫曼',
                walmart信盒: 'Walmart-信盒',
                walmart宫本: 'Walmart-宫本',
                amazon哒唛旺: 'Amazon-哒唛旺',
                amazon简砾: 'Amazon-简砾',
                amazon赫曼: 'Amazon-赫曼',
                amazon信盒: 'Amazon-信盒',
                amazon宫本: 'Amazon-宫本',
                amazon森月: 'Amazon-森月',
                amazon维禄: 'Amazon-维禄',
                amazon玲琅: 'Amazon-玲琅',
                amazon治润: 'Amazon-治润',
                amazonCPower: 'Central_Power_International_Limited',
                amazon启珊: 'Amazon-启珊',
                amazon旗辰: 'Amazon-旗辰',
                wayfair信盒: 'Wayfair-信盒',
                wayfair维禄: 'Wayfair-维禄',
                ebay玲琅: 'eBay-玲琅',
                ebay治润: 'eBay-治润',
                ebay雅秦: 'eBay-雅秦',
                Nextfur_Shopify: 'Nextfur-Shopify',
              }}
              rules={[{ required: true, message: '请输入店铺!' }]}
            />
            <ProFormText
              width="md"
              name="运营"
              label="运营"
              placeholder="请输入运营人员,若为多个,请用英文','隔开"
            // rules={[{ required: true, message: '请输入运营人员!' }]}
            />
            <ProFormText
              width="md"
              name="运维"
              label="运维"
              placeholder="请输入运维人员,若为多个,请用英文','隔开"
            // rules={[{ required: true, message: '请输入运维人员!' }]}
            />
            <ProFormSelect
              width="md"
              name="组别"
              placeholder="请输入小组组别,若为多个,请用英文','隔开"
              label="组别"
              valueEnum={{
                利芬组_A组: '利芬组_A组',
                利芬组_B组: '利芬组_B组',
                利芬组_C组: '利芬组_C组',
                利芬组_D组: '利芬组_D组',
                利芬组_E组: '利芬组_E组',
                利芬组_F组: '利芬组_F组',
                利芬组_G组: '利芬组_G组',
                利芬组_H组: '利芬组_H组',
                利芬组_I组: '利芬组_I组',
                利芬组_J组: '利芬组_J组',
              }}
            // rules={[{ required: true, message: '请输入小组组别' }]}
            />
            <ProFormDatePicker
              width="md"
              name="开始时间"
              placeholder="请输入开始时间"
              label="开始时间"
            // rules={[{ required: true, message: '请输入小组组别' }]}
            />
            <ProFormDatePicker
              width="md"
              name="结束时间"
              placeholder="请输入开始时间"
              label="结束时间"
            // rules={[{ required: true, message: '请输入小组组别' }]}
            />
          </ProForm.Group>
        </ProForm>
      )}
    </Modal>
  );
};

export default Edit;
