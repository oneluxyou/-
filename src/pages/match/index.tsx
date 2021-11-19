/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import request from 'umi-request';
import { Button, message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import Edit from './components/Edit';
import { useRequest } from 'umi';

/**
 * 更新节点
 *
 * @param fields
 */

const TableList: React.FC = () => {
  const { data } = useRequest({
    url: '/sku/static',
    method: 'get',
  });
  //编辑part
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [editId, setEditId] = useState(false);
  const [tableData, settableData] = useState<any>({ data: '' });
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  //控制模态框的显示和隐藏
  const isShowModalEdit = (show: boolean, id: any) => {
    setIsModalVisibleEdit(show);
    setEditId(id);
  };

  const onTableChange = () => {};
  //表格part、
  const column: ProColumns[] = [
    {
      title: '渠道sku',
      dataIndex: '渠道sku',
      key: '渠道sku',
    },
    {
      title: 'ASIN',
      dataIndex: 'ASIN',
      key: 'ASIN',
    },
    {
      title: '公司SKU',
      dataIndex: '公司SKU',
      key: '公司SKU',
    },
    {
      title: '运营',
      dataIndex: '运营',
      key: '运营',
    },
    {
      title: '运维',
      dataIndex: '运维',
      key: '运维',
    },
    {
      title: '组别',
      dataIndex: '组别',
      key: '组别',
      valueEnum: {
        利芬组_A组: '利芬组_A组',
        利芬组_B组: '利芬组_C组',
        利芬组_C组: '利芬组_C组',
        利芬组_D组: '利芬组_D组',
        利芬组_E组: '利芬组_E组',
        利芬组_F组: '利芬组_F组',
        利芬组_G组: '利芬组_G组',
        利芬组_H组: '利芬组_H组',
        利芬组_I组: '利芬组_I组',
        利芬组_J组: '利芬组_J组',
      },
    },
    {
      title: '店铺',
      dataIndex: '店铺',
      key: '店铺',
      filters: true,
      onFilter: true,
      valueEnum: {
        Walmart_优瑞斯特: 'Walmart-优瑞斯特',
        Walmart_赫曼: 'Walmart-赫曼',
        Walmart_信盒: 'Walmart-信盒',
        Walmart_宫本: 'Walmart-宫本',
        Walmart: 'Walmart',
        赫曼: '赫曼',
        信盒: '信盒',
        宫本: '宫本',
        森月: '森月',
        维禄: '维禄',
        玲琅: '玲琅',
        信盒_法国: '信盒-法国',
        信盒_意大利: '信盒-意大利',
        信盒_西班牙: '信盒-西班牙',
        Wayfair_信盒: 'Wayfair-信盒',
        Wayfair_维禄: 'Wayfair-维禄',
        eBay_玲琅: 'eBay-玲琅',
        eBay_治润: 'eBay-治润',
        eBay_雅秦: 'eBay-雅秦',
        Nextfur_Shopify: 'Nextfur-Shopify',
      },
    },
    {
      title: 'KEY',
      dataIndex: 'KEY',
      hideInSearch: true,
      key: 'KEY',
      tooltip: '自动生成',
    },
    {
      title: 'sku序号',
      dataIndex: 'sku序号',
      hideInSearch: true,
      key: 'sku序号',
      tooltip: '自动生成',
    },
    {
      title: '开始时间',
      dataIndex: '开始时间',
      hideInSearch: true,
      key: '开始时间',
      tooltip: '自动生成(美国时间)',
    },
    {
      title: '结束时间',
      dataIndex: '结束时间',
      hideInSearch: true,
      key: '结束时间',
      tooltip: '自动生成(美国时间)',
    },
    {
      title: '操作',
      valueType: 'option',
      key: '操作',
      tooltip: '只有当信息出错时，才使用‘编辑’功能，若有人员更换或者产品迭代，请提交表单，增添记录',
      render: (text, record) => [
        <div>
          <a
            onClick={() => {
              isShowModalEdit(true, record.id);
            }}
          >
            编辑
          </a>
          {/* <a onClick={() => {isDelete(record.id)}}>
                    删除  
                </a> */}
        </div>,
      ],
    },
  ];

  // 导出报表
  const downloadExcel = () => {
    const excel_datas = tableData.data;
    console.log(excel_datas);

    // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
    let str = `id,渠道sku,ASIN,公司SKU,运营,运维,组别,店铺,KEY,sku序号,开始时间,结束时间\n`;
    // 增加\t为了不让表格显示科学计数法或者其他格式
    for (let i = 0; i < excel_datas.length; i++) {
      // console.log(excel_datas[i])
      for (const key in excel_datas[i]) {
        console.log(excel_datas[i].公司SKU);
        const temp_dict = excel_datas[i].公司SKU.split(',');
        excel_datas[i].公司SKU = temp_dict.join('a');
        if (Object.prototype.hasOwnProperty.call(excel_datas[i], key)) {
          str += `${excel_datas[i][key] + '\t'},`;
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
    link.download = 'ASIN对应信息表.csv';
    link.click();
  };
  return (
    <PageContainer>
      <ProForm<{
        name: string;
        company: string;
      }>
        autoComplete="on"
        formRef={formRef}
        onFinish={async (values) => {
          let sku_in = true;
          let temp_sku = values['公司SKU'].replace('，', ',');
          temp_sku = temp_sku.replace('	', '');
          temp_sku = temp_sku.replace(' ', '');
          const sku = temp_sku.split(',');
          sku.forEach((element: string) => {
            if (!data.sku_name.find((item: string) => item == element)) {
              sku_in = false;
              message.error('传入的SKU:' + element + '不正确');
            }
          });
          // eslint-disable-next-line @typescript-eslint/dot-notation
          if (
            (values['渠道sku'] != null && values['渠道sku'] != '') ||
            (values['ASIN'] != null && values['ASIN'] != '')
          ) {
            if (sku_in == true) {
              values['店铺'] = JSON.stringify(values['店铺']);
              return request(`/sku/insert`, {
                method: 'POST',
                data: { ...values },
                requestType: 'form',
              }).then(() => {
                //自行根据条件清除
                message.success('提交成功');
                formRef.current?.resetFields();
                location.reload();
              });
            }
          } else {
            message.error('必须要存在渠道sku或者ASIN');
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="渠道sku"
            label="渠道sku"
            placeholder="请输入渠道sku"
            tooltip="例如USAN1023801-1+2"
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
            placeholder="请输入SKU,多个sku用英文的‘,’隔开"
            tooltip="例如USAN1023801-1,USAN1023801-2 (多个sku用,隔开)，捆绑SKU请拆成对应的SKU"
            rules={[{ required: true, message: '请输入SKU!' }]}
          />
          <ProFormSelect
            width="md"
            name="店铺"
            label="店铺"
            // tooltip="产品所在的店铺"
            // options={data?.store_name || ['赫曼', '信盒', '信盒-法国', '信盒-西班牙', '维禄', '森月', '宫本', '卟噜卟噜', '玲琅', '哒唛旺', '简砾', 'Wayfair-信盒', 'Walmart-赫曼', 'Walmart-宫本', 'Walmart-信盒', 'Walmart-优瑞斯特', 'Nextfur-Shopify', 'eBay-雅秦', 'eBay-玲琅', 'Wayfair-维禄', 'eBay-治润']}
            valueEnum={{
              Walmart_优瑞斯特: 'Walmart-优瑞斯特',
              Walmart_赫曼: 'Walmart-赫曼',
              Walmart_信盒: 'Walmart-信盒',
              Walmart_宫本: 'Walmart-宫本',
              赫曼: '赫曼',
              信盒: '信盒',
              宫本: '宫本',
              森月: '森月',
              维禄: '维禄',
              玲琅: '玲琅',
              信盒_法国: '信盒-法国',
              信盒_意大利: '信盒-意大利',
              信盒_西班牙: '信盒-西班牙',
              Wayfair_信盒: 'Wayfair-信盒',
              Wayfair_维禄: 'Wayfair-维禄',
              eBay_玲琅: 'eBay-玲琅',
              eBay_治润: 'eBay-治润',
              eBay_雅秦: 'eBay-雅秦',
              Nextfur_Shopify: 'Nextfur-Shopify',
            }}
            // rules={[{ required: true, message: '请输入店铺!' }]}
          />
          <ProFormText
            width="md"
            name="运营"
            label="运营"
            placeholder="请输入运营人员,若为多个,请用英文','隔开"
            rules={[{ required: true, message: '请输入运营人员!' }]}
          />
          <ProFormText
            width="md"
            name="运维"
            label="运维"
            placeholder="请输入运维人员,若为多个,请用英文','隔开"
            rules={[{ required: true, message: '请输入运维人员!' }]}
          />
          <ProFormSelect
            width="md"
            name="组别"
            // placeholder="请输入小组组别,若为多个,请用英文','隔开"
            label="组别"
            // rules={[{ required: true, message: '请输入小组组别' }]}
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
          />
        </ProForm.Group>
      </ProForm>
      <br />
      <ProTable
        search={{
          labelWidth: 'auto',
          span: 5,
          defaultCollapsed: false,
        }}
        columns={column}
        actionRef={actionRef}
        onChange={onTableChange}
        request={async (params = {}) => {
          console.log(params);
          const result = request('/skuinfo', {
            method: 'POST',
            data: { ...params },
            requestType: 'form',
            success: true,
          });
          settableData(await result);
          return result;
        }}
        rowKey="key"
        pagination={{
          pageSize: 5,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
        }}
        dateFormatter="string"
        toolbar={{
          actions: [
            <Button key="primary" type="primary" onClick={() => downloadExcel()}>
              导出为excel
            </Button>,
          ],
        }}
      />
      {!isModalVisibleEdit ? (
        ''
      ) : (
        <Edit
          isModalVisible={isModalVisibleEdit}
          isShowModal={isShowModalEdit}
          actionRef={actionRef}
          editId={editId}
          skuName={data.sku_name}
        />
      )}
    </PageContainer>
  );
};

export default TableList;
