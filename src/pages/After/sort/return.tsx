/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import request from 'umi-request';
import { Button, message, Col, Row, AutoComplete, DatePicker, Input, Upload, Tooltip, Icon } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ProFormSelect, ProFormRadio, ProFormDigit } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import AZEdit from '../components/azEdit';
import FBEdit from '../components/fbEdit';
import ReturnEdit from '../components/returnEdit';
import CBEdit from '../components/cbEdit';
import Edit from '../components/afterEdit';
import { useRequest, useAccess, Access, useModel } from 'umi';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

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
    //控制模态框的显示和隐藏
    const FBisShowModalEdit = (show: boolean, id: any, order: any, sku: any, store: any, saler: any) => {
        setFBIsModalVisibleEdit(show);
        setEditOrder(order);
        setEditSKU(sku);
        setEditSaler(saler);
        setEditStore(store);
        setEditId(id);
    };
    const ReturnisShowModalEdit = (show: boolean, id: any) => {
        setReturnIsModalVisibleEdit(show);
        setEditId(id);
    };
    const AZisShowModalEdit = (show: boolean, id: any, order: any, sku: any, store: any, saler: any) => {
        setAZIsModalVisibleEdit(show);
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
            title: '退货时间',
            dataIndex: '退货时间',
            key: '退货时间',
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
            title: 'ASIN',
            dataIndex: 'ASIN',
            key: 'ASIN',
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
            title: 'A-Z',
            dataIndex: 'A_Z',
            key: 'A-Z',
            valueEnum: {
                'N': 'N',
                'Y': 'Y',
            }
        },
        {
            title: '申请次数',
            dataIndex: '申请次数',
            key: '申请次数',
            hideInSearch: true,
        },
        {
            title: '快递方',
            dataIndex: '快递方',
            key: '快递方',
            valueEnum: {
                'FedEx': 'FedEx',
                'UPS': 'UPS',
                'USPS': 'USPS',
            }
        },
        {
            title: '退货单号',
            dataIndex: '退货单号',
            key: '退货单号',
        },
        {
            title: '运输状态',
            dataIndex: '运输状态',
            key: '运输状态',
            valueEnum: {
                '成功签收': '成功签收',
                '查询不到': '查询不到',
                '未传': '未传',
                '未查': '未查',
                '未寄出': '未寄出',
                '运输途中': '运输途中',
                '到达待取': '到达待取',
                '运输过久': '运输过久',
                '投递失败': '投递失败',
            }
        },
        {
            title: '订单额',
            dataIndex: '订单额',
            key: '订单额',
            hideInSearch: true,
        },
        {
            title: '退款额',
            dataIndex: '退款额',
            key: '退款额',
            hideInSearch: true,
        },
        {
            title: '数量',
            dataIndex: '数量',
            key: '数量',
            hideInSearch: true,
        },
        {
            title: 'SAFE-T',
            dataIndex: 'SAFE_T',
            key: 'SAFE-T',
            valueEnum: {
                '可申诉': '可申诉',
                '申请中': '申请中',
                '无需申请': '无需申请',
            }
        },
        {
            title: '处理方式',
            dataIndex: '处理方式',
            key: '处理方式',
            hideInSearch: true,
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
                            ReturnisShowModalEdit(true, record.id);
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
    ];
    const column1: ProColumns[] = [
        {
            title: '订单号',
            dataIndex: '订单号',
            key: '订单号',
        },
        {
            title: '退货时间',
            dataIndex: '退货时间',
            key: '退货时间',
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
            title: 'ASIN',
            dataIndex: 'ASIN',
            key: 'ASIN',
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
            title: 'A-Z',
            dataIndex: 'A_Z',
            key: 'A-Z',
            valueEnum: {
                'N': 'N',
                'Y': 'Y',
            }
        },
        {
            title: '申请次数',
            dataIndex: '申请次数',
            key: '申请次数',
            hideInSearch: true,
        },
        {
            title: '快递方',
            dataIndex: '快递方',
            key: '快递方',
            valueEnum: {
                'FedEx': 'FedEx',
                'UPS': 'UPS',
                'USPS': 'USPS',
            }
        },
        {
            title: '退货单号',
            dataIndex: '退货单号',
            key: '退货单号',
        },
        {
            title: '运输状态',
            dataIndex: '运输状态',
            key: '运输状态',
            valueEnum: {
                '成功签收': '成功签收',
                '查询不到': '查询不到',
                '未传': '未传',
                '未查': '未查',
                '未寄出': '未寄出',
                '运输途中': '运输途中',
                '到达待取': '到达待取',
                '运输过久': '运输过久',
                '投递失败': '投递失败',
            }
        },
        {
            title: '订单额',
            dataIndex: '订单额',
            key: '订单额',
            hideInSearch: true,
        },
        {
            title: '退款额',
            dataIndex: '退款额',
            key: '退款额',
            hideInSearch: true,
        },
        {
            title: '数量',
            dataIndex: '数量',
            key: '数量',
            hideInSearch: true,
        },
        {
            title: 'SAFE-T',
            dataIndex: 'SAFE_T',
            key: 'SAFE-T',
            valueEnum: {
                '可申诉': '可申诉',
                '申请中': '申请中',
                '无需申请': '无需申请',
            }
        },
        {
            title: '处理方式',
            dataIndex: '处理方式',
            key: '处理方式',
            hideInSearch: true,
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
            width: 450,
            fixed: 'right',

            render: (text, record, _, action) => [
                <>
                    <a
                        onClick={() => {
                            ReturnisShowModalEdit(true, record.id);
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
                            FBisShowModalEdit(true, record.id, record.订单号, record.公司SKU, record.店铺, record.负责人);
                        }}
                    >
                        FB
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

    ];
    // 表格列名绑定
    const [tablecol, settablecol] = useState(column);
    // 导入报表
    const uploadprops = {
        // 这里我们只接受excel2007以后版本的文件，accept就是指定文件选择框的文件类型
        accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        showUploadList: false,
        // 把excel的处理放在beforeUpload事件，否则要把文件上传到通过action指定的地址去后台处理
        // 这里我们没有指定action地址，因为没有传到后台
        beforeUpload: (file, fileList) => {
            const rABS = true;
            const f = fileList[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = e.target.result;
                if (!rABS) data = new Uint8Array(data);
                const workbook = XLSX.read(data, {
                    type: rABS ? 'binary' : 'array'
                });
                // 假设我们的数据在第一个标签
                const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                console.log(workbook.SheetNames[0])
                if (workbook.SheetNames[0].indexOf('Amazon') == -1) {
                    message.error("工作表1命名出错,数据要放在表1中,命名方式按照'Amazon-店铺英文名',必须为xlsx文件")
                } else {
                    // XLSX自带了一个工具把导入的数据转成json
                    const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
                    // 检测传入数据是否正确
                    const temp_check1 = jsonArr.toString()
                    console.log(jsonArr);
                    if (temp_check1.indexOf('Order ID') == -1) {
                        message.error('Order ID列不存在');
                    } else if (temp_check1.indexOf('Return request date') == -1) {
                        message.error('Order date列不存在');
                    } else if (temp_check1.indexOf('ASIN') == -1) {
                        message.error('ASIN列不存在');
                    } else if (temp_check1.indexOf('A-to-Z Claim') == -1) {
                        message.error('A-to-Z Claim列不存在');
                    } else if (temp_check1.indexOf('Return quantity') == -1) {
                        message.error('Return quantity列不存在');
                    } else if (temp_check1.indexOf('Return carrier') == -1) {
                        message.error('Return carrier列不存在');
                    } else if (temp_check1.indexOf('Tracking ID') == -1) {
                        message.error('Tracking ID列不存在');
                    } else if (temp_check1.indexOf('Label cost') == -1) {
                        message.error('Label cost列不存在');
                    } else if (temp_check1.indexOf('Order quantity') == -1) {
                        message.error('Order quantity列不存在');
                    }
                    else {
                        // 通过自定义的方法处理Json
                        request(`/api/afterinsertreturnex`, {
                            method: 'POST',
                            data: { jsonArr: JSON.stringify(jsonArr), name: workbook.SheetNames[0] },
                            requestType: 'form',
                        }).then((res) => {
                            //自行根据条件清除
                            message.info(res);
                        });
                    }
                }


            };
            if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
            return false;
        }
    };
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
                        return request(`/api/afterinsertreturn`, {
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
                            name="退货时间"
                            label="退货时间"
                            initialValue={moment(new Date())}
                            rules={[{ required: true, message: '请输入退货时间!' }]}

                        >
                            <DatePicker format={'YYYY-MM-DD'} />
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
                            name="A_Z"
                            label="A-Z"
                            initialValue={'N'}
                        >
                            <ProFormRadio.Group
                                width="md"
                                options={[
                                    {
                                        label: 'N',
                                        value: 'N'
                                    }, {
                                        label: 'Y',
                                        value: 'Y'
                                    }
                                ]}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProFormDigit
                            width="md"
                            name="申请"
                            label="申请次数"
                            placeholder=""
                            initialValue={1}
                            tooltip="若无,默认输入1"
                            rules={[{ required: true, message: '若无,请输入1' }]}
                        />
                    </Col>
                    <Col span={5}>
                        <ProForm.Item
                            name="快递方"
                            label="快递方"
                        >
                            <ProFormRadio.Group
                                width="md"
                                options={[
                                    {
                                        label: 'FedEx',
                                        value: 'FedEx',
                                    }, {
                                        label: 'UPS',
                                        value: 'UPS',
                                    }, {
                                        label: 'USPS',
                                        value: 'USPS',
                                    }
                                ]}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="退货单号"
                            label="退货单号"
                        >
                            <AutoComplete
                                placeholder="请输入退货单号"
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>

                        <ProForm.Item
                            name="运输状态"
                            label="运输状态"
                            initialValue={'未传'}
                        >
                            <ProFormSelect
                                width="md"
                                fieldProps={{
                                    listHeight: 450,
                                }}
                                valueEnum={{
                                    '成功签收': '成功签收',
                                    '查询不到': '查询不到',
                                    '未传': '未传',
                                    '未查': '未查',
                                    '未寄出': '未寄出',
                                    '运输途中': '运输途中',
                                    '到达待取': '到达待取',
                                    '运输过久': '运输过久',
                                    '投递失败': '投递失败',
                                }}
                            />

                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProFormDigit
                            width="md"
                            name="订单额"
                            label="订单额"
                            placeholder=""
                            tooltip="若无,默认输入0"
                        />
                    </Col>
                    <Col span={5}>
                        <ProFormDigit
                            width="md"
                            name="退款额"
                            label="退款额"
                            placeholder=""
                            tooltip="若无,默认输入0"
                        />
                    </Col>
                    <Col span={5} offset={1}>
                        <ProFormDigit
                            width="md"
                            name="数量"
                            label="数量"
                            placeholder=""
                            initialValue={1}
                            tooltip="若无,默认输入1"
                            rules={[{ required: true, message: '若无,请输入1' }]}
                        />
                    </Col>
                    <Col span={5} offset={1}>

                        <ProForm.Item
                            name="SAFE_T"
                            label="SAFE-T"
                            initialValue={'无'}
                        >
                            <ProFormSelect
                                width="md"
                                fieldProps={{
                                    listHeight: 450,
                                }}
                                valueEnum={{
                                    '无': '无',
                                    '可申请': '可申请',
                                    '申请中': '申请中',
                                    '无需申请': '无需申请',
                                }}
                            />

                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="处理方式"
                            label="处理方式"
                        >
                            <AutoComplete
                                placeholder="请输入处理方式"
                                options={[
                                    { value: 'SafeT' },
                                    { value: '系统问题' },
                                    { value: 'Chargeback' },
                                    { value: '发错货' },
                                    { value: '劝保留' },
                                    { value: '已保留' },
                                    { value: '已被退款+补发' },
                                    { value: '已补购' },
                                    { value: '已补寄' },
                                    { value: '已换货' },
                                    { value: '已拒收' },
                                    { value: '申请拦截' },
                                    { value: '运输停滞' },
                                    { value: '关AZ退款' },
                                    { value: '已保留被AZ' },
                                    { value: '已联系' },
                                    { value: '未处理' },
                                    { value: '已退款' },
                                    { value: '尚未退款' },
                                    { value: '重量不符，不能退款' },
                                    { value: '其他问题，不能退款' },
                                    { value: '无需申请' },
                                ]}
                                filterOption={(inputValue, option) =>
                                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5}>
                        <ProForm.Item
                            name="备注"
                            label="备注"
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
                    const result = request('/api/aftersalereturn/', {
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
                        <Upload key="primary" {...uploadprops}>
                            <Tooltip title='从店铺后台下载直接导入,必须为xlsx格式,工作表1命名格式必须为Amazon-店铺名'>
                                <Button type="primary" >
                                    <Icon type="upload" /> 导入表格
                                </Button>
                            </Tooltip>
                        </Upload>
                        ,
                        <Button key="primary" type="primary" onClick={() => downloadExcel()}>
                            导出为excel
                        </Button>,
                    ],
                }}
            />
            {
                !ReturnisModalVisibleEdit ? '' :
                    <Access accessible={access.AfterManager()} >
                        <ReturnEdit
                            isModalVisible={ReturnisModalVisibleEdit}
                            isShowModal={ReturnisShowModalEdit}
                            actionRef={actionRef}
                            editId={editId}

                        />
                    </Access>
            }
            {
                !FBisModalVisibleEdit ? '' :
                    <Access accessible={access.AfterManager()} >
                        <FBEdit
                            isModalVisible={FBisModalVisibleEdit}
                            isShowModal={FBisShowModalEdit}
                            actionRef={actionRef}
                            editOrder={editOrder}
                            editSaler={editSaler}
                            editStore={editStore}
                            editSKU={editSKU}
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
        </PageContainer >
    );
};

export default TableList;
