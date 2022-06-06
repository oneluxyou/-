/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import request from 'umi-request';
import { Button, message, Col, Row, AutoComplete, DatePicker, Input } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ProFormSelect, ProFormRadio, ProFormDigit } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import AZEdit from '../components/azEdit';
import ReturnEdit from '../components/returnEdit';
import FBEdit from '../components/fbEdit';
import CBEdit from '../components/cbEdit';
import Edit from '../components/afterEdit';
import { useRequest, useAccess, Access, useModel } from 'umi';
import moment from 'moment';

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
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    // 给编辑组件的传参
    const [editId, setEditId] = useState(false);
    const [tableData, settableData] = useState<any>({ data: '' });
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    //控制模态框的显示和隐藏
    const isShowModalEdit = (show: boolean, id: any) => {
        setIsModalVisibleEdit(show);
        setEditId(id);
    };

    const onTableChange = (value: any) => { console.log(value) };
    //表格part、
    const column: ProColumns[] = [
        {
            title: '日期',
            dataIndex: '日期',
            key: '日期',
            width: 180,
        },
        {
            title: '更新日期',
            dataIndex: '更新日期',
            key: '更新日期',
            hideInSearch: true,
            width: 120,
        },
        {
            title: '处理人',
            dataIndex: '处理人',
            key: '处理人',
            width: 70,
        },
        {
            title: '公司SKU',
            dataIndex: '公司SKU',
            key: '公司SKU',
            width: 130,
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
            title: '金额',
            dataIndex: '金额',
            key: '金额',
            width: 70
        },
        {
            title: '状态',
            dataIndex: '状态',
            key: '状态',
            width: 90,
            valueEnum: {
                'Resolved': 'Resolved',
                'Pending': 'Pending',
                'Seller refunded': 'Seller refunded',
                'Action required': 'Action required',
            }
        },
        {
            title: '备注',
            dataIndex: '备注',
            key: '备注',
            hideInSearch: true,
        },
        {
            title: '操作',
            valueType: 'option',
            width: 150,
            fixed: 'right',

            render: (text, record, _, action) => [
                <>
                    <a
                        onClick={() => {
                            isShowModalEdit(true, record.id);
                        }}
                    >
                        编辑
                    </a>
                </>
            ]
        },
        {
            title: '申请日期(最早)',
            dataIndex: '申请开始日期',
            valueType: 'date',
            hideInTable: true,
            //数据库格式问题
            width: 90
        },
        {
            title: '申请日期(最晚)',
            dataIndex: '申请结束日期',
            valueType: 'date',
            hideInTable: true,
            //数据库格式问题
            width: 90
        },
        {
            title: '截止日期(最早)',
            dataIndex: '截止开始日期',
            valueType: 'date',
            hideInTable: true,
            //数据库格式问题
            width: 90
        },
        {
            title: '截止日期(最晚)',
            dataIndex: '截止结束日期',
            valueType: 'date',
            hideInTable: true,
            //数据库格式问题
            width: 90
        },

    ];
    // 表格列名绑定
    const [tablecol, settablecol] = useState(column);
    // 导出报表
    const downloadExcel = () => {
        const excel_datas = tableData.data;
        console.log(excel_datas);

        // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
        let str = `id,渠道sku,ASIN,公司SKU,运营,运维,组别,店铺,KEY,sku序号,款式序号,开始时间,结束时间,状态\n`;
        // 增加\t为了不让表格显示科学计数法或者其他格式
        for (let i = 0; i < excel_datas.length; i++) {
            // console.log(excel_datas[i])
            for (const key in excel_datas[i]) {
                console.log(excel_datas[i].公司SKU);
                const temp_dict = excel_datas[i].公司SKU.split(',');
                excel_datas[i].公司SKU = temp_dict.join('a');
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
        link.download = 'ASIN对应信息表.csv';
        link.click();
    };
    const { initialState } = useModel('@@initialState');
    // 表单缓存
    const storage = window.localStorage;
    const temp_dict = [new Array(), new Array(), new Array(), new Array(), new Array()] as any;
    let temp_data = new Array();
    const item_dict = ['qudaosku', 'asin', 'sku', 'yunying', 'yunwei'];
    const form_dict = ['渠道sku', 'ASIN', '公司SKU', '运营', '运维'];
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

    return (
        <PageContainer>
            <ProForm<{
                name: string;
                company: string;
            }>
                size="small"
                autoComplete="on"
                formRef={formRef}
                initialValues={{
                    '处理人': initialState.currentUser?.name
                }}
                onFinish={async (values) => {
                    let sku_in = true;
                    console.log(values)
                    console.log(typeof (values['投诉日期']))
                    if ('公司SKU' in values) {
                        let temp_sku = values['公司SKU'].replace('，', ',');
                        temp_sku = temp_sku.replace('	', '');
                        temp_sku = temp_sku.replace(' ', '');
                        const sku = temp_sku.split(',');
                        if (!data.sku_name.find((item: string) => item == sku)) {
                            sku_in = false;
                            message.error('传入的SKU:' + sku + '不正确(注:捆绑sku要拆成产品sku)');
                        }
                    }

                    // eslint-disable-next-line @typescript-eslint/dot-notation

                    if (sku_in == true) {
                        return request(`/api/afterinsertcomplain`, {
                            method: 'POST',
                            data: { ...values },
                            requestType: 'form',
                        }).then(() => {
                            //自行根据条件清除
                            message.success('提交成功');
                            formRef.current?.resetFields();
                        });
                    }
                }}
            >
                <Row>
                    <Col span={5}>
                        <ProForm.Item
                            name="日期"
                            label="日期"
                            initialValue={moment(new Date())}
                            rules={[{ required: true, message: '请输入日期!' }]}
                        >
                            <DatePicker format={'YYYY-MM-DD'} />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="处理人"
                            label="处理人"
                            tooltip="请勿输入渠道SKU/订单号/包裹号"
                            rules={[{ required: true, message: '请输入处理人!' }]}
                        >
                            <AutoComplete
                                placeholder="请输入名称"
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="ASIN"
                            label="ASIN"
                            rules={[{ required: true, message: '请输入ASIN!' }]}
                        >
                            <AutoComplete
                                placeholder="请输入ASIN"
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
                                fieldProps={{
                                    listHeight: 450,
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
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5}>
                        <ProForm.Item
                            name="店铺SKU"
                            label="店铺SKU"
                            rules={[{ required: true, message: '请输入店铺SKU!' }]}
                        >
                            <AutoComplete
                                placeholder="请输入店铺SKU"
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="投诉原因"
                            label="投诉原因"
                            rules={[{ required: true, message: '请输入投诉原因!' }]}
                        >
                            <AutoComplete
                                placeholder="请输入投诉原因"
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProFormDigit
                            width="md"
                            name="申诉次数"
                            label="申诉次数"
                            placeholder=""
                            initialValue={1}
                            tooltip="若无,默认输入0"
                            rules={[{ required: true, message: '若无,请输入0' }]}
                        />
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="申诉结果"
                            label="申诉结果"
                        >
                            <ProFormSelect
                                width="md"
                                valueEnum={{
                                    '成功': '成功',
                                    '失败': '失败',
                                }}
                            />
                        </ProForm.Item>
                    </Col>
                </Row>
            </ProForm>
            <br />
            <ProTable
                size="small"
                search={{
                    labelWidth: 'auto',
                    defaultCollapsed: false,
                    span: 6
                }}
                scroll={{ x: 1800, y: 500 }}
                columns={tablecol}
                actionRef={actionRef}
                onChange={onTableChange}
                request={async (params = {}) => {
                    const result = request('/api/aftersalecomplain/', {
                        method: 'POST',
                        data: { ...params },
                        requestType: 'form',
                        success: true,
                    });
                    settableData(await result);
                    const temp_result = await result;
                    if (temp_result == '请重新登录') {
                        message.error('账户过期,请重新登录账号');
                    }
                    return result;
                }}
                rowKey="key"
                pagination={{
                    pageSize: 10,
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
        </PageContainer >
    );
};

export default TableList;
