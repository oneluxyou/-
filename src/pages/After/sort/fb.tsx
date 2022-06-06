/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import request from 'umi-request';
import { Button, message, Col, Row, AutoComplete, DatePicker, Input } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ProFormSelect, ProFormRadio } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import AZEdit from '../components/azEdit';
import FBEdit from '../components/fbEdit';
import ReturnEdit from '../components/returnEdit';
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
    const [ReturnisModalVisibleEdit, setReturnIsModalVisibleEdit] = useState(false);
    const [CBisModalVisibleEdit, setCBIsModalVisibleEdit] = useState(false);
    const [FBisModalVisibleEdit, setFBIsModalVisibleEdit] = useState(false);
    const [AZisModalVisibleEdit, setAZIsModalVisibleEdit] = useState(false);
    const [FBeditId, setFBEditId] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    // 给编辑组件的传参
    const [editId, setEditId] = useState(false);
    const [editOrder, setEditOrder] = useState(false);
    const [editSKU, setEditSKU] = useState(false);
    const [editSaler, setEditSaler] = useState(false);
    const [editStore, setEditStore] = useState(false);
    const [tableData, settableData] = useState<any>({ data: '' });
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    // 日期绑定
    const [date, setdate] = useState(moment(new Date()));
    //控制模态框的显示和隐藏
    const FBisShowModalEdit = (show: boolean, id: any) => {
        setFBIsModalVisibleEdit(show);
        setFBEditId(id);
    };
    const AZisShowModalEdit = (show: boolean, id: any, order: any, sku: any, store: any, saler: any) => {
        setAZIsModalVisibleEdit(show);
        setEditOrder(order);
        setEditSKU(sku);
        setEditSaler(saler);
        setEditStore(store);
        setEditId(id);
    };
    const ReturnisShowModalEdit = (show: boolean, id: any, order: any, sku: any, store: any, saler: any) => {
        setReturnIsModalVisibleEdit(show);
        setEditOrder(order);
        setEditSKU(sku);
        setEditSaler(saler);
        setEditStore(store);
        setEditId(id);
    };
    const CBisShowModalEdit = (show: boolean, id: any, order: any, sku: any, store: any, saler: any) => {
        setCBIsModalVisibleEdit(show);
        setEditOrder(order);
        setEditSKU(sku);
        setEditSaler(saler);
        setEditStore(store);
        setEditId(id);
    };
    const isShowModalEdit = (show: boolean, order: any, sku: any, store: any, saler: any) => {
        setIsModalVisibleEdit(show);
        setEditOrder(order);
        setEditSKU(sku);
        setEditSaler(saler);
        setEditStore(store);
    };

    const onTableChange = (value: any) => { console.log(value) };
    //表格part、
    const column: ProColumns[] = [
        {
            title: '订单号',
            dataIndex: '订单号',
            key: '订单号',
        },
        {
            title: '日期',
            dataIndex: '日期',
            key: '日期',
            hideInSearch: true,
        },
        {
            title: '截止日期',
            dataIndex: '截止日期',
            key: '截止日期',
            hideInSearch: true,
        },
        {
            title: '负责人',
            dataIndex: '负责人',
            key: '负责人',
            width: 70,
        },
        {
            title: '公司SKU',
            dataIndex: '公司SKU',
            key: '公司SKU',
            width: 120,
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
            title: '星级',
            dataIndex: '星级',
            key: '星级',
            valueEnum: {
                '1': '1',
                '2': '2',
            }
        },

        {
            title: '评价内容',
            dataIndex: '评价内容',
            key: '评价内容',
            hideInSearch: true,
            ellipsis: true,
            copyable: true,
        },
        {
            title: '留评原因',
            dataIndex: '留评原因',
            key: '留评原因',
            valueEnum: {
                '买家': '买家',
                '物流': '物流',
                '销售': '销售',
                '工厂': '工厂',
                '仓库': '仓库',
                '少配件': '少配件'
            }
        },
        {
            title: '分析与建议',
            dataIndex: '分析与建议',
            key: '分析与建议',
            hideInSearch: true,
        },

        {
            title: '处理结果',
            dataIndex: '处理结果',
            key: '处理结果',
            valueEnum: {
                '已删除': '已删除',
                '未删除': '未删除',
            }

        },
        {
            title: '处理结果',
            dataIndex: '处理结果',
            key: '处理结果',
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
                            FBisShowModalEdit(true, record.id);
                        }}
                    >
                        编辑
                    </a>
                    <a
                        onClick={() => {
                            isShowModalEdit(true, record.订单号, record.公司SKU, record.店铺, record.处理人);
                        }}
                    >
                        登记
                    </a>
                    <a
                        onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            settablecol(column1);
                        }}
                    >
                        更多
                    </a>
                </>
            ]
        },
        {
            title: '开始日期',
            dataIndex: '开始日期',
            valueType: 'date',
            hideInTable: true,
            //数据库格式问题
            width: 90
        },
        {
            title: '结束日期',
            dataIndex: '结束日期',
            valueType: 'date',
            hideInTable: true,
            //数据库格式问题
            width: 90
        },
        {
            title: '截止开始日期',
            dataIndex: '截止开始日期',
            valueType: 'date',
            hideInTable: true,
            //数据库格式问题
            width: 90
        },
        {
            title: '截止结束日期',
            dataIndex: '截止结束日期',
            valueType: 'date',
            hideInTable: true,
            //数据库格式问题
            width: 90
        },

    ];
    const column1: ProColumns[] = [
        {
            title: '订单号',
            dataIndex: '订单号',
            key: '订单号',
        },
        {
            title: '日期',
            dataIndex: '日期',
            key: '日期',
            hideInSearch: true,
        },
        {
            title: '更新日期',
            dataIndex: '更新日期',
            key: '更新日期',
            hideInSearch: true,
        },
        {
            title: '负责人',
            dataIndex: '负责人',
            key: '负责人',
            width: 70,
        },
        {
            title: '公司SKU',
            dataIndex: '公司SKU',
            key: '公司SKU',
            width: 120,
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
            title: '星级',
            dataIndex: '星级',
            key: '星级',
            valueEnum: {
                '0': '0',
                '1': '1',
                '2': '2',
            }
        },

        {
            title: '评价内容',
            dataIndex: '评价内容',
            key: '评价内容',
            hideInSearch: true,
            ellipsis: true,
            copyable: true,
        },
        {
            title: '留评原因',
            dataIndex: '留评原因',
            key: '留评原因',
            valueEnum: {
                '买家': '买家',
                '物流': '物流',
                '销售': '销售',
                '工厂': '工厂',
                '仓库': '仓库',
                '少配件': '少配件'
            }
        },
        {
            title: '分析与建议',
            dataIndex: '分析与建议',
            key: '分析与建议',
            hideInSearch: true,
        },

        {
            title: '处理方案',
            dataIndex: '处理方案',
            key: '处理方案',
            valueEnum: {
                '已删除': '已删除',
                '未删除': '未删除',
            }

        },
        {
            title: 'Case状态',
            dataIndex: 'Case状态',
            key: 'Case状态',
            hideInSearch: true,

        },
        {
            title: '处理结果',
            dataIndex: '处理结果',
            key: '处理结果',
            hideInSearch: true,
        },
        {
            title: '公开回复',
            dataIndex: '公开回复',
            key: '公开回复',
            hideInSearch: true,
        },
        {
            title: '操作',
            valueType: 'option',
            width: 450,
            fixed: 'right',

            render: (text, record, _, action) => [
                <>
                    <a
                        onClick={() => {
                            FBisShowModalEdit(true, record.id);
                        }}
                    >
                        编辑
                    </a>
                    <a
                        onClick={() => {
                            isShowModalEdit(true, record.订单号, record.公司SKU, record.店铺, record.负责人);
                        }}
                    >
                        售后登记
                    </a>
                    <a
                        onClick={() => {
                            AZisShowModalEdit(true, record.id, record.订单号, record.公司SKU, record.店铺, record.负责人);
                        }}
                    >
                        AZ
                    </a>
                    <a
                        onClick={() => {
                            CBisShowModalEdit(true, record.id, record.订单号, record.公司SKU, record.店铺, record.负责人);
                        }}
                    >
                        CB
                    </a>
                    <a
                        onClick={() => {
                            ReturnisShowModalEdit(true, record.id, record.订单号, record.公司SKU, record.店铺, record.负责人);
                        }}
                    >
                        退货
                    </a>
                    <a
                        onClick={() => {
                            AZisShowModalEdit(true, record.id);
                        }}
                    >
                        RP
                    </a>
                    <a
                        onClick={() => {
                            AZisShowModalEdit(true, record.id);
                        }}
                    >
                        投诉
                    </a>
                    <a
                        onClick={() => {
                            AZisShowModalEdit(true, record.id);
                        }}
                    >
                        ST
                    </a>
                    <a
                        onClick={() => {
                            AZisShowModalEdit(true, record.id);
                        }}
                    >
                        RV
                    </a>
                    <a
                        onClick={() => {
                            AZisShowModalEdit(true, record.id);
                        }}
                    >
                        RV
                    </a>
                    <a
                        onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            settablecol(column);
                        }}
                    >
                        隐藏
                    </a>
                    {/* <a
                        onClick={() => {
                            isShowModalAfterEdit(true, record.id);
                        }}
                    >
                        售后登记
                    </a> */}
                </>
            ]
        },
        {
            title: '投诉开始日期',
            dataIndex: '投诉开始日期',
            valueType: 'date',
            hideInTable: true,
            //数据库格式问题
            width: 90
        },
        {
            title: '投诉结束日期',
            dataIndex: '投诉结束日期',
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
                    '负责人': initialState.currentUser?.name
                }}
                onFinish={async (values) => {
                    let sku_in = true;
                    console.log(values);
                    console.log(typeof (values['投诉日期']));
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
                        return request(`/api/afterinsertfb`, {
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
                            name="负责人"
                            label="负责人"
                        >
                            <AutoComplete
                                placeholder="请输入负责人"
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="订单号"
                            label="订单号"
                            rules={[{ required: true, message: '请输入订单号!' }]}
                        >
                            <AutoComplete
                                placeholder="请输入订单号"
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
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
                            name="截止日期"
                            label="截止日期"
                            initialValue={moment(new Date()).add(60, 'days')}
                            rules={[{ required: true, message: '请输入日期!' }]}

                        >
                            <DatePicker format={'YYYY-MM-DD'} />
                        </ProForm.Item>
                    </Col>
                    <Col span={5}>
                        <ProForm.Item
                            name="公司SKU"
                            label="公司SKU"
                            rules={[{ required: true, message: '请输入公司SKU!' }]}
                        >
                            <AutoComplete
                                placeholder="请输入公司SKU"
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
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="星级"
                            label="星级"
                        >
                            <ProFormRadio.Group
                                width="md"

                                options={[
                                    {
                                        label: '1',
                                        value: '1'
                                    }, {
                                        label: '2',
                                        value: '2'
                                    }
                                ]}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="留评原因"
                            label="留评原因"
                        >
                            <ProFormSelect
                                width="md"
                                valueEnum={{
                                    '买家': '买家',
                                    '物流': '物流',
                                    '销售': '销售',
                                    '工厂': '工厂',
                                    '仓库': '仓库',
                                    '少配件': '少配件',
                                }}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5}>

                        <ProForm.Item
                            name="处理结果"
                            label="处理结果"
                            initialValue={'未删除'}
                        >
                            <ProFormRadio.Group
                                width="md"

                                options={[
                                    {
                                        label: '已删除',
                                        value: '已删除'
                                    }, {
                                        label: '未删除',
                                        value: '未删除'
                                    }
                                ]}
                            />

                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="评价内容"
                            label="评价内容"
                        >
                            <AutoComplete
                            >
                                <TextArea
                                    className="custom"
                                    style={{ height: 50 }}
                                    showCount={true}
                                />
                            </AutoComplete>
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="处理方案"
                            label="处理方案"
                        >
                            <ProFormSelect
                                width="md"
                                valueEnum={{
                                    '已联系买家': '已联系买家',
                                    '已开Case': '已开Case',
                                    '已发送移除模板': '已发送移除模板',
                                    '已公开回复': '已公开回复',
                                }}
                            />
                        </ProForm.Item>
                    </Col>

                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="分析与建议"
                            label="分析与建议"
                        >
                            <AutoComplete
                            >
                                <TextArea
                                    className="custom"
                                    style={{ height: 50 }}
                                    showCount={true}
                                />
                            </AutoComplete>
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
                    const result = request('/api/aftersalefb/', {
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
                !FBisModalVisibleEdit ? '' :
                    <Access accessible={access.AfterManager()} >
                        <FBEdit
                            isModalVisible={FBisModalVisibleEdit}
                            isShowModal={FBisShowModalEdit}
                            actionRef={actionRef}
                            editId={FBeditId}
                        />
                    </Access>
            }
            {
                !AZisModalVisibleEdit ? '' :
                    <Access accessible={access.AfterManager()} >
                        <AZEdit
                            isModalVisible={AZisModalVisibleEdit}
                            isShowModal={AZisShowModalEdit}
                            actionRef={actionRef}
                            editOrder={editOrder}
                            editSaler={editSaler}
                            editStore={editStore}
                            editSKU={editSKU}
                        />
                    </Access>
            }
            {
                !isModalVisibleEdit ? '' :
                    <Access accessible={access.AfterManager()} >
                        <Edit
                            isModalVisible={isModalVisibleEdit}
                            isShowModal={isShowModalEdit}
                            actionRef={actionRef}
                            editOrder={editOrder}
                            editSaler={editSaler}
                            editStore={editStore}
                            editSKU={editSKU}
                        />
                    </Access>
            }
            {
                !CBisModalVisibleEdit ? '' :
                    <Access accessible={access.AfterManager()} >
                        <CBEdit
                            isModalVisible={CBisModalVisibleEdit}
                            isShowModal={CBisShowModalEdit}
                            actionRef={actionRef}
                            editOrder={editOrder}
                            editSaler={editSaler}
                            editStore={editStore}
                            editSKU={editSKU}
                        />
                    </Access>
            }
            {
                !ReturnisModalVisibleEdit ? '' :
                    <Access accessible={access.AfterManager()} >
                        <ReturnEdit
                            isModalVisible={ReturnisModalVisibleEdit}
                            isShowModal={ReturnisShowModalEdit}
                            actionRef={actionRef}
                            editOrder={editOrder}
                            editSaler={editSaler}
                            editStore={editStore}
                            editSKU={editSKU}
                        />
                    </Access>
            }
        </PageContainer >
    );
};

export default TableList;
