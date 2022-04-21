/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/dot-notation */
import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import request from 'umi-request';
import { Button, message, Col, Row, AutoComplete } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import Edit from '../components/Edit';
import { useRequest, useAccess, Access } from 'umi';

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
            title: '渠道sku',
            dataIndex: '渠道sku',
            key: '渠道sku',
        },
        {
            title: 'ASIN',
            dataIndex: 'ASIN',
            key: 'ASIN',
            ellipsis: true,
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
            filters: true,
            onFilter: true,
            valueEnum: {
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
            },
        },
        {
            title: '店铺',
            dataIndex: '店铺',
            key: '店铺',
            filters: true,
            onFilter: true,
            valueEnum: {
                walmart优瑞斯特: 'Walmart-优瑞斯特',
                walmart赫曼: 'Walmart-赫曼',
                walmart信盒: 'Walmart-信盒',
                walmart宫本: 'Walmart-宫本',
                walmart: 'Walmart',
                amazon哒唛旺: 'Amazon-哒唛旺',
                amazon简砾: 'Amazon-简砾',
                amazon赫曼: 'Amazon-赫曼',
                amazon信盒: 'Amazon-信盒',
                amazon宫本: 'Amazon-宫本',
                amazon森月: 'Amazon-森月',
                amazon维禄: 'Amazon-维禄',
                amazon玲琅: 'Amazon-玲琅',
                amazon治润: 'Amazon-治润',
                amazon驰甬: 'Amazon-驰甬',
                amazon启珊: 'Amazon-启珊',
                amazon旗辰: 'Amazon-旗辰',
                amazoncpower: 'Central_Power_International_Limited',
                amazon: 'Amazon',
                wayfair信盒: 'Wayfair-信盒',
                wayfair维禄: 'Wayfair-维禄',
                wayfair: 'Wayfair',
                ebay玲琅: 'eBay-玲琅',
                ebay治润: 'eBay-治润',
                ebay雅秦: 'eBay-雅秦',
                shopifynextfur: 'Nextfur-Shopify',
            },
        },
        // {
        //   title: 'KEY',
        //   dataIndex: 'KEY',
        //   hideInSearch: true,
        //   key: 'KEY',
        //   tooltip: '自动生成',
        // },
        {
            title: 'sku序号',
            dataIndex: 'sku序号',
            hideInSearch: true,
            key: 'sku序号',
            tooltip: '自动生成',
        },
        {
            title: '款式序号',
            dataIndex: '款式序号',
            hideInSearch: true,
            key: '款式序号',
            tooltip: '自动生成',
        },
        {
            title: '开始时间',
            dataIndex: '开始时间',
            hideInSearch: true,
            key: '开始时间',
            tooltip: '自动生成',
        },
        {
            title: '结束时间',
            dataIndex: '结束时间',
            // hideInSearch: true,
            key: '结束时间',
            tooltip: '自动生成',
        },
        {
            title: '状态',
            dataIndex: '状态',
            // hideInSearch: true,
            key: '状态',
            valueEnum: {
                "停用": {
                    text: '停用',
                    status: 'Default',
                },
                "迭代": {
                    text: '迭代',
                    status: 'error',
                },
                "正常": { text: '正常', status: 'Success' },
            },
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
    // 表单缓存
    const storage = window.localStorage;
    const temp_dict = [new Array(), new Array(), new Array(), new Array(), new Array()] as any;
    let temp_data = new Array();
    const item_dict = ['qudaosku', 'asin', 'sku', 'yunying', 'yunwei'];
    const form_dict = ['渠道sku', 'ASIN', '公司SKU', '运营', '运维']
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
                        //自行根据条件清除
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        if (item_dict.indexOf(item) == 0) {
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            setqudaosku(temp_dict[0]);
                        } else if (item_dict.indexOf(item) == 1) {
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            setasin(temp_dict[1]);
                        } else if (item_dict.indexOf(item) == 2) {
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            setosku(temp_dict[2]);
                        } else if (item_dict.indexOf(item) == 3) {
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            setyunying(temp_dict[3]);
                        } else if (item_dict.indexOf(item) == 4) {
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            setyunwei(temp_dict[4]);
                        }
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


    const [qudaosku, setqudaosku] = useState(temp_dict[0]) as any;
    const [asin, setasin] = useState(temp_dict[1]) as any;
    const [osku, setosku] = useState(temp_dict[2]) as any;
    const [yunying, setyunying] = useState(temp_dict[3]) as any;
    const [yunwei, setyunwei] = useState(temp_dict[4]) as any;
    return (
        <PageContainer>
            <Access accessible={access.MatchManager()}>        <ProForm<{
                name: string;
                company: string;
            }>
                size="small"
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
                            message.error('传入的SKU:' + element + '不正确(注:捆绑sku要拆成产品sku)');
                        }
                    });
                    // eslint-disable-next-line @typescript-eslint/dot-notation

                    if (sku_in == true) {
                        values['店铺'] = JSON.stringify(values['店铺']);
                        return request(`/api/sku/insert`, {
                            method: 'POST',
                            data: { ...values },
                            requestType: 'form',
                        }).then(() => {
                            for (const key in item_dict) {
                                temp_dict[key] = new Array();
                                if (item_dict[key] in storage) {
                                    temp_data = eval(storage[item_dict[key]]).split('|');
                                    for (const key2 in temp_data) {
                                        if (Object.prototype.hasOwnProperty.call(temp_data, key2)) {
                                            const element = temp_data[key2];
                                            temp_dict[key].push(renderItem(element, parseInt(key2), item_dict[key]));
                                        }
                                    }
                                    if (temp_data.indexOf(values[form_dict[key]]) == -1) {
                                        temp_data.push(values[form_dict[key]]);
                                        temp_dict[key].push(renderItem(values[form_dict[key]], temp_data.length - 1, item_dict[key]));
                                        console.log('提交后', temp_data)
                                        let temp_storage = temp_data.join('|');
                                        temp_storage = JSON.stringify(temp_storage);
                                        storage[item_dict[key]] = temp_storage;
                                        //自行根据条件清除
                                        if (parseInt(key) == 0) {
                                            setqudaosku(temp_dict[0]);
                                        } else if (parseInt(key) == 1) {
                                            setasin(temp_dict[1]);
                                        } else if (parseInt(key) == 2) {
                                            setosku(temp_dict[2]);
                                        } else if (parseInt(key) == 3) {
                                            setyunying(temp_dict[3]);
                                        } else if (parseInt(key) == 4) {
                                            setyunwei(temp_dict[4]);
                                        }
                                    }
                                } else {
                                    temp_data = []
                                    temp_data.push(values[form_dict[key]]);
                                    temp_dict[key].push(renderItem(values[form_dict[key]], temp_data.length - 1, item_dict[key]));
                                    let temp_storage = temp_data.join('|');
                                    temp_storage = JSON.stringify(temp_storage);
                                    storage[item_dict[key]] = temp_storage;
                                    //自行根据条件清除
                                    if (parseInt(key) == 0) {
                                        setqudaosku(temp_dict[0]);
                                    } else if (parseInt(key) == 1) {
                                        setasin(temp_dict[1]);
                                    } else if (parseInt(key) == 2) {
                                        setosku(temp_dict[2]);
                                    } else if (parseInt(key) == 3) {
                                        setyunying(temp_dict[3]);
                                    } else if (parseInt(key) == 4) {
                                        setyunwei(temp_dict[4]);
                                    }
                                }
                            }
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
                            name="渠道sku"
                            label="渠道sku"
                            tooltip="例如USAN1023801-1+2"
                            rules={[{ required: true, message: '请输入渠道SKU!' }]}
                        >
                            <AutoComplete
                                placeholder="请输入渠道sku"
                                options={qudaosku}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="ASIN"
                            label="ASIN"
                            tooltip="为亚马逊平台上的编码标识,例如B08NBZLZJQ,其他平台上则写Item ID字段,例如568192404"
                        >
                            <AutoComplete
                                placeholder="请输入ASIN"
                                options={asin}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="公司SKU"
                            label="公司SKU"
                            tooltip="例如USAN1023801-1,USAN1023801-2 (多个sku用,隔开)，捆绑SKU请拆成对应的SKU"
                            rules={[{ required: true, message: '请输入SKU!' }]}
                        >
                            <AutoComplete
                                placeholder="请输入SKU"
                                options={osku}
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
                                // tooltip="产品所在的店铺"
                                // options={data?.store_name || ['赫曼', '信盒', '信盒-法国', '信盒-西班牙', '维禄', '森月', '宫本', '卟噜卟噜', '玲琅', '哒唛旺', '简砾', 'Wayfair-信盒', 'Walmart-赫曼', 'Walmart-宫本', 'Walmart-信盒', 'Walmart-优瑞斯特', 'Nextfur-Shopify', 'eBay-雅秦', 'eBay-玲琅', 'Wayfair-维禄', 'eBay-治润']}
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
                                    amazon驰甬: 'Amazon-驰甬',
                                    amazon启珊: 'Amazon-启珊',
                                    amazon旗辰: 'Amazon-旗辰',
                                    amazoncpower: 'Central_Power_International_Limited',
                                    wayfair信盒: 'Wayfair-信盒',
                                    wayfair维禄: 'Wayfair-维禄',
                                    ebay玲琅: 'eBay-玲琅',
                                    ebay治润: 'eBay-治润',
                                    ebay雅秦: 'eBay-雅秦',
                                    Nextfur_Shopify: 'shopifynextfur',
                                }}
                                rules={[{ required: true, message: '请输入店铺!' }]}
                            />
                        </ProForm.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>
                        <ProForm.Item
                            name="运营"
                            label="运营"
                            rules={[{ required: true, message: '请输入运营人员!' }]}
                        >
                            <AutoComplete
                                placeholder="请输入运营人员,若为多个,请用英文','隔开"
                                options={yunying}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="运维"
                            label="运维"
                            rules={[{ required: true, message: '请输入运维人员!' }]}
                        >
                            <AutoComplete
                                placeholder="请输入运维人员,若为多个,请用英文','隔开"
                                options={yunwei}
                            />
                        </ProForm.Item>
                    </Col>
                    <Col span={5} offset={1}>
                        <ProForm.Item
                            name="组别"
                            label="组别"
                        >
                            <ProFormSelect
                                width="md"
                                // placeholder="请输入小组组别,若为多个,请用英文','隔开"
                                rules={[{ required: true, message: '请输入小组组别' }]}
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
                        </ProForm.Item>
                    </Col>
                </Row>
            </ProForm></Access>
            <br />
            <ProTable
                size="small"
                search={{
                    labelWidth: 'auto',
                    defaultCollapsed: false,
                    span: 6
                }}
                columns={column}
                actionRef={actionRef}
                onChange={onTableChange}
                request={async (params = {}) => {
                    const result = request('/api/skuinfo', {
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
            {
                !isModalVisibleEdit ? (
                    ''
                ) : (
                    <Access accessible={access.MatchManager()} >
                        <Edit
                            isModalVisible={isModalVisibleEdit}
                            isShowModal={isShowModalEdit}
                            actionRef={actionRef}
                            editId={editId}
                            skuName={data.sku_name}
                        />
                    </Access>
                )
            }
        </PageContainer >
    );
};

export default TableList;
