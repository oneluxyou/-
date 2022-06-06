import { Form, Row, Col, Input, Button, Select, DatePicker, InputNumber, Card, Table, message, Space, Modal, Tooltip } from 'antd';
import { DownOutlined, UpOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import request from 'umi-request';
import SkuInputDemo from './components/FormatInput'
import OfflineData from './components/skuModel';
// import OfflineData from './components/skuModel'
const SkuTotal = () => {
    // 表单数据
    // 表单信息
    const [form] = Form.useForm();
    // 动态表单
    const [dataT, setdataT] = useState([]) as any;
    // 后端传过来的表单数据
    const [dataE, setdataE] = useState([]) as any;
    // 设置折线图数据
    const [sku, setsku] = useState() as any;
    const [skuName, setskuName] = useState() as any;
    const [lineData, setlineData] = useState() as any;
    const [expand, setExpand] = useState(false);
    // 属性参数
    const attribute_sort: string[] = ['运营', '运维', '组别']
    const attribute_value: string[] = ['成本单价', '销量', '平均售价', '交易额', '损耗', '广告', '净毛利润', '七天日销(店铺)', '七天日销', '目标日销', '在库', '在库+在途', '在库周转', '在库+在途周转']
    const attribute_per: string[] = ['成本占比', '损耗占比', '广告占比', '净毛利润率']
    const total_attribute = ['sku序号', 'sku', '品名'].concat(attribute_value).concat(attribute_per).concat(['运营', '运维', '组别', '店铺'])
    // const total_attribute = ['sku', '品名'].concat(attribute_value).concat(attribute_per).concat(['销量贡献率', '交易额贡献率', '广告贡献率', '售后贡献率', '净毛利贡献率', '运营', '运维', '组别', '店铺'])
    let first_data_temp: string | any[] = [];
    const [first_data, setfirst_data] = useState() as any;
    // 个人信息数据，input历史记录
    const [num_sum, setnum_sum] = useState([]) as any;
    const [money_sum, setmoney_sum] = useState([]) as any;
    const [promotion_sum, setpromotion_sum] = useState([]) as any;
    const [after_sale_sum, setafter_sale_sum] = useState([]) as any;
    const [gross_profit_sum, setgross_profit_sum] = useState([]) as any;
    const [gross_profit_per, setgross_profit_per] = useState([]) as any;
    const [promotion_per, setpromotion_per] = useState([]) as any;
    // 表格列选择
    const [selectedRowKeys, setselectedRowKeys] = useState() as any;
    const onSelectChange = (value: any) => {
        setselectedRowKeys(value);
        if (value.length == 0) {
            setdataE(dataT);
        } else {
            const temp_dataE: any[] = []
            dataT.forEach((element: any) => {
                if (value.indexOf(element.key) != -1) {
                    temp_dataE.push(element);
                }
            });
            setdataE(temp_dataE);
            console.log(temp_dataE);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        columnWidth: 50,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };
    // 弹窗设置
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const getFields = () => {
        const children = [
            <Col span={5} key={1}>
                <Form.Item
                    name={`店铺`}
                    label={`店铺`}
                    rules={[
                        {
                            required: true,
                            message: '请输入店铺!',
                        },
                    ]}
                    initialValue={"总"}
                >
                    <Select
                        options={[
                            { label: 'amazon赫曼', value: 'amazon赫曼' },
                            { label: 'amazon信盒', value: 'amazon信盒' },
                            { label: 'amazon信盒欧线', value: 'amazon信盒欧线' },
                            { label: 'amazon宫本', value: 'amazon宫本' },
                            { label: 'amazon森月', value: 'amazon森月' },
                            { label: 'amazon维禄', value: 'amazon维禄' },
                            { label: 'amazon简砾', value: 'amazon简砾' },
                            { label: 'amazon哒唛旺', value: 'amazon哒唛旺' },
                            { label: 'amazonCPower', value: 'amazoncpower' },
                            { label: 'amazon玲琅', value: 'amazon玲琅' },
                            { label: 'amazon治润', value: 'amazon治润' },
                            { label: 'amazon旗辰', value: 'amazon旗辰' },
                            { label: 'amazon启珊', value: 'amazon启珊' },
                            { label: 'amazon赛迦曼', value: 'amazon赛迦曼' },
                            { label: 'Walmart_优瑞斯特', value: 'walmart优瑞斯特' },
                            { label: 'Walmart_赫曼', value: 'walmart赫曼' },
                            { label: 'Walmart_信盒', value: 'walmart信盒' },
                            { label: 'Walmart_宫本', value: 'walmart宫本' },
                            { label: 'Wayfair_信盒', value: 'wayfair信盒' },
                            { label: 'Wayfair_维禄', value: 'wayfair维禄' },
                            { label: 'eBay_玲琅', value: 'ebay玲琅' },
                            { label: 'eBay_治润', value: 'ebay治润' },
                            { label: 'eBay_雅秦', value: 'ebay雅秦' },
                            { label: 'Nextfur_Shopify', value: 'shopifynextfur' },
                            { label: '所有店铺详情', value: '总' },
                            { label: '所有店铺汇总', value: 'sku总' }
                        ]}
                        placeholder="请输入店铺"
                    />

                </Form.Item>
            </Col >,
            <Col span={6} key={2}>
                <Form.Item
                    name={`开始时间`}
                    label={`开始时间`}
                >
                    <DatePicker />
                </Form.Item>
            </Col>,
            <Col span={6} key={3}>
                <Form.Item
                    name={`结束时间`}
                    label={`结束时间`}
                >
                    <DatePicker />
                </Form.Item>
            </Col>,
            <Col span={7} key={4}>
                <SkuInputDemo />
            </Col>,
        ];
        let i;
        if (expand) {
            for (i = 0; i < attribute_sort.length; i++) {
                if (i == 0) {
                    children.push(
                        <Col span={24} style={{ marginBottom: 10, marginTop: -10 }} key={"tip"}><strong>人员组别</strong></Col>
                    )
                    children.push(
                        <Col span={6} key={attribute_sort[i]}>
                            <Form.Item
                                label={attribute_sort[i]}
                                name={attribute_sort[i]}
                            >
                                <Input style={{ width: 100 }} name={attribute_sort[i]} />
                            </Form.Item>
                        </Col >,
                    )
                }
                else if (i == 1) {
                    children.push(
                        <Col span={6} key={attribute_sort[i]}>
                            <Form.Item
                                label={attribute_sort[i]}
                                name={attribute_sort[i]}
                            >
                                <Input style={{ width: 100 }} name={attribute_sort[i]} />
                            </Form.Item>
                        </Col >,
                    )
                } else if (i == 2) {
                    children.push(
                        <Col span={6} key={attribute_sort[i]}>
                            <Form.Item
                                name={attribute_sort[i]}
                                label={attribute_sort[i]}
                            >
                                <Select
                                    style={{ width: 120 }}
                                    options={[
                                        { label: 'A组', value: '利芬组_A组' },
                                        { label: 'B组', value: '利芬组_B组' },
                                        { label: 'C组', value: '利芬组_C组' },
                                        { label: 'D组', value: '利芬组_D组' },
                                        { label: 'E组', value: '利芬组_E组' },
                                        { label: 'F组', value: '利芬组_F组' },
                                        { label: 'H组', value: '利芬组_H组' },
                                        { label: 'G组', value: '利芬组_G组' },
                                        { label: 'J组', value: '利芬组_J组' },
                                        { label: 'K组', value: '利芬组_K组' },
                                        { label: 'I组', value: '利芬组_I组' },
                                    ]}
                                    placeholder="请输入组别"
                                />

                            </Form.Item>
                        </Col >,
                    )
                }
            }
            for (i = 0; i < attribute_value.length; i++) {
                if (i == 0) {
                    children.push(
                        <Col span={24} style={{ marginBottom: 10, marginTop: -10 }} key={"tip1"}><strong>数值</strong></Col>
                    )
                }
                children.push(
                    <Col span={6} key={attribute_value[i]}>
                        <Form.Item
                            label={attribute_value[i] == '净毛利润' ? '毛利润' : attribute_value[i]}
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name={[attribute_value[i], '符号']}
                                    noStyle
                                >

                                    <Select options={[
                                        { label: '≥', value: '大于' },
                                        { label: '≤', value: '小于' },
                                    ]}
                                        defaultValue="大于"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={[attribute_value[i], '数值']}
                                    noStyle
                                >
                                    <InputNumber
                                        style={{ width: 55 }}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    </Col >,
                )
            }
            for (i = 0; i < attribute_per.length; i++) {
                if (i == 0) {
                    children.push(
                        <Col span={24} style={{ marginBottom: 10, marginTop: -10 }} key={"tip2"}><strong>百分比</strong></Col>
                    )
                }
                children.push(
                    <Col span={6} key={i + attribute_value.length}>
                        <Form.Item
                            label={attribute_per[i] == '净毛利润率' ? '毛利润率' : attribute_value[i]}
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name={[attribute_per[i], '符号']}
                                    noStyle
                                >

                                    <Select options={[
                                        { label: '≥', value: '大于' },
                                        { label: '≤', value: '小于' },
                                    ]}
                                        defaultValue="大于"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={[attribute_per[i], '数值']}
                                    noStyle
                                >

                                    <InputNumber
                                        style={{ width: 55 }}
                                        formatter={value => `${value}%`}
                                    />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    </Col >,
                )
            }
        }

        return children;
    };


    const temp_columns = [
        {
            title: 'sku序号',
            dataIndex: 'sku序号',
            fixed: 'left',
            width: 70,
            ellipsis: true,
            copyable: true,
        }, {
            title: () => (
                <span>
                    sku
                    <Tooltip
                        title={'公司sku'}
                    >
                        <QuestionCircleOutlined />
                    </Tooltip>
                </span>
            ),
            dataIndex: 'sku',
            render: (text: string, record: { 品名: any, 店铺: any; }) => <a type="link"
                onClick={async () => {
                    setsku(text);
                    setskuName(record.品名);
                    const result = request(`/api/sku/sale/item/info`, {
                        method: 'POST',
                        data: { 'sku': text, 'store': record.店铺 },
                        requestType: 'form',
                    });
                    if (await result) {
                        setlineData(await result);
                        first_data_temp = []
                        for (const iterator of eval(await result)) {
                            if ((iterator.type == "销售总数/天/PC") || (iterator.type == "七天日销")) {
                                first_data_temp.push(iterator);
                            }
                        }
                        setfirst_data(first_data_temp)
                        setIsModalVisible(true);
                    } else {
                        message.error('提交失败');
                    }
                }
                }
            >
                {text}
            </a>,
            fixed: 'left',
            width: 150,
            ellipsis: true,
            copyable: true,
            tip: '标题过长会自动收缩',
        },
        {
            title: '品名',
            dataIndex: '品名',
            fixed: 'left',
            width: 180,
            ellipsis: true,
            copyable: true,
        },
        {
            title: '成本单价',
            dataIndex: '成本单价',
            render: (text: number) => <span>{text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
            width: 100,
        },
        {
            title: '销量',
            dataIndex: '销量',
            sorter: (a: { 销量: number; }, b: { 销量: number; }) => a.销量 - b.销量,
            width: 100,
        },
        {
            title: '平均售价',
            dataIndex: '平均售价',
            // sorter: (a: { 平均售价: number; }, b: { 平均售价: number; }) => a.平均售价 - b.平均售价,
            render: (text: number) => <span>{text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
            width: 120,
        },
        {
            title: '交易额',
            dataIndex: '交易额',
            sorter: (a: { 交易额: number; }, b: { 交易额: number; }) => a.交易额 - b.交易额,
            render: (text: number) => <span>{text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
            width: 100,
        },
        // {
        //     title: '推广费',
        //     dataIndex: '推广费',
        //     render: (text: number) => <span> {text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
        //     width: 100,
        // },
        {
            title: '损耗',
            dataIndex: '损耗',
            sorter: (a: { 损耗: number; }, b: { 损耗: number; }) => a.损耗 - b.损耗,
            render: (text: number) => <span>{text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
            width: 100,
        },
        {
            title: () => (
                <span>
                    广告
                    {/* <Tooltip
                    title={'=广告 / 销售额'}
                >
                    <QuestionCircleOutlined />
                </Tooltip> */}
                </span>
            ),
            dataIndex: '广告',
            sorter: (a: { 广告: number; }, b: { 广告: number; }) => a.广告 - b.广告,
            render: (text: number) => <span>{text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
            width: 100,
        },
        {
            title: () => (
                <span>
                    毛利润
                    {/* <Tooltip
                    title={'=0.85*销售额 - 销售总成本 - 推广费-售后'}
                >
                    <QuestionCircleOutlined />
                </Tooltip> */}
                </span>
            ),
            dataIndex: '净毛利润',
            sorter: (a: { 净毛利润: number; }, b: { 净毛利润: number; }) => a.净毛利润 - b.净毛利润,
            render: (text: number) => <span>{text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
            width: 110,
        },
        {
            title: () => (
                <span>
                    最近七日平均销量(店铺)
                    {/* <Tooltip
                    title={'sku在店铺内的最新过去7天平均销量'}
                >
                    <QuestionCircleOutlined />
                </Tooltip> */}
                </span>
            ),
            dataIndex: '七天日销(店铺)',
            sorter: (a: { '七天日销(店铺)': number; }, b: { '七天日销(店铺)': number; }) => a.七天日销(店铺) - b.七天日销(店铺),
            width: 200,
        },
        {
            title: () => (
                <span>
                    最近七日平均销量(总)
                    {/* <Tooltip
                    title={'sku最新过去7天平均销量'}
                >
                    <QuestionCircleOutlined />
                </Tooltip> */}
                </span>
            ),
            dataIndex: '七天日销',
            sorter: (a: { 七天日销: number; }, b: { 七天日销: number; }) => a.七天日销 - b.七天日销,
            width: 180,
        },
        {
            title: () => (
                <span>
                    总目标日销
                    {/* <Tooltip
                                    title={'=0.85*销售额 - 销售总成本 - 推广费-售后'}
                                >
                                    <QuestionCircleOutlined />
                                </Tooltip> */}
                </span>
            ),
            dataIndex: '目标日销',
            sorter: (a: { 目标日销: number; }, b: { 目标日销: number; }) => a.目标日销 - b.目标日销,
            width: 140,
        },
        {
            title: () => (
                <span>
                    预估在库
                    {/* <Tooltip
                        title={'=0.85*销售额 - 销售总成本 - 推广费-售后'}
                    >
                        <QuestionCircleOutlined />
                    </Tooltip> */}
                </span>
            ),
            dataIndex: '在库',
            sorter: (a: { 在库: number; }, b: { 在库: number; }) => a.在库 - b.在库,
            width: 130,
        },
        {
            title: () => (
                <span>
                    预估在库+在途
                    {/* <Tooltip
                        title={'=0.85*销售额 - 销售总成本 - 推广费-售后'}
                    >
                        <QuestionCircleOutlined />
                    </Tooltip> */}
                </span>
            ),
            dataIndex: '在库+在途',
            sorter: (a: { '在库+在途': number; }, b: { '在库+在途': number; }) => a['在库+在途'] - b['在库+在途'],
            width: 170,
        },
        {
            title: () => (
                <span>
                    预估在库周转(天)
                    <Tooltip
                        title={'=预估在库 / 最近七日平均销量(总)'}
                    >
                        <QuestionCircleOutlined />
                    </Tooltip>
                </span>
            ),
            dataIndex: '在库周转',
            sorter: (a: { '在库周转': number; }, b: { '在库周转': number; }) => a['在库周转'] - b['在库周转'],
            width: 160,
        },
        {
            title: () => (
                <span>
                    预估在库+在途周转(天)
                    <Tooltip
                        title={'=预估在库+在途周转(天) / 最近七日平均销量(总)'}
                    >
                        <QuestionCircleOutlined />
                    </Tooltip>
                </span>
            ),
            dataIndex: '在库+在途周转',
            sorter: (a: { '在库+在途周转': number; }, b: { '在库+在途周转': number; }) => a['在库+在途周转'] - b['在库+在途周转'],
            width: 200,
        },
        // {
        //     title: () => (
        //         <span>
        //             在库周转(目标日销)
        //             {/* <Tooltip
        //                         title={'=0.85*销售额 - 销售总成本 - 推广费-售后'}
        //                     >
        //                         <QuestionCircleOutlined />
        //                     </Tooltip> */}
        //         </span>
        //     ),
        //     dataIndex: '在库周转(目标日销)',
        //     // render: (text: number) => <span>{text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
        //     width: 110,
        // },
        // {
        //     title: () => (
        //         <span>
        //             在库+在途周转(目标日销)
        //             {/* <Tooltip
        //                         title={'=0.85*销售额 - 销售总成本 - 推广费-售后'}
        //                     >
        //                         <QuestionCircleOutlined />
        //                     </Tooltip> */}
        //         </span>
        //     ),
        //     dataIndex: '在库+在途周转(目标日销)',
        //     // render: (text: number) => <span>{text.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
        //     width: 110,
        // },
        {
            title: () => (
                <span>
                    成本占比(%)
                    <Tooltip
                        title={'=销售总成本/销售额'}
                    >
                        <QuestionCircleOutlined />
                    </Tooltip>
                </span>
            ),
            dataIndex: '成本占比',
            render: (text: number) => <span>{text.toFixed(2).toString()}%</span>,
            width: 125,
        },
        {
            title: () => (
                <span>
                    损耗占比(%)
                    <Tooltip
                        title={'=售后 / 销售额'}
                    >
                        <QuestionCircleOutlined />
                    </Tooltip>
                </span>
            ),
            dataIndex: '损耗占比',
            render: (text: number) => <span>{text.toFixed(2).toString()}%</span>,
            width: 125,
        },
        // {
        //     title: () => (
        //         <span>
        //             推广占比(%)
        //             <Tooltip
        //                 title={'=推广费 / 销售额'}
        //             >
        //                 <QuestionCircleOutlined />
        //             </Tooltip>
        //         </span>
        //     ),
        //     dataIndex: '推广占比',
        //     render: (text: number) => <span>{text.toFixed(4).toString()}%</span>,
        //     width: 125,
        // },
        {
            title: () => (
                <span>
                    广告占比(%)
                    <Tooltip
                        title={'=广告 / 销售额'}
                    >
                        <QuestionCircleOutlined />
                    </Tooltip>
                </span>
            ),
            dataIndex: '广告占比',
            render: (text: number) => <span>{text.toFixed(2).toString()}%</span>,
            width: 135,
        },
        {
            title: () => (
                <span>
                    毛利润率(%)
                    <Tooltip
                        title={'=净毛利润 / 销售额'}
                    >
                        <QuestionCircleOutlined />
                    </Tooltip>
                </span>
            ),
            dataIndex: '净毛利润率',
            render: (text: number) => <span>{text.toFixed(2).toString()}%</span>,
            width: 145,
        },
        // {
        //     title: () => (
        //         <span>
        //             销量贡献值(%)
        //             <Tooltip
        //                 title={'=销量 / 所有sku销量'}
        //             >
        //                 <QuestionCircleOutlined />
        //             </Tooltip>
        //         </span>
        //     ),
        //     dataIndex: '销量贡献率',
        //     render: (text: number) => <span>{text.toFixed(2).toString()}%</span>,
        //     width: 145,
        // },
        // {
        //     title: () => (
        //         <span>
        //             交易额贡献值(%)
        //             <Tooltip
        //                 title={'=交易额 / 所有sku交易额'}
        //             >
        //                 <QuestionCircleOutlined />
        //             </Tooltip>
        //         </span>
        //     ),
        //     dataIndex: '交易额贡献率',
        //     render: (text: number) => <span>{text.toFixed(2).toString()}%</span>,
        //     width: 170,
        // },
        // {
        //     title: () => (
        //         <span>
        //             广告贡献值(%)
        //             <Tooltip
        //                 title={'=广告费 / 所有sku推广费'}
        //             >
        //                 <QuestionCircleOutlined />
        //             </Tooltip>
        //         </span>
        //     ),
        //     dataIndex: '广告贡献率',
        //     render: (text: number) => <span>{text.toFixed(2).toString()}%</span>,
        //     width: 170,
        // },
        // {
        //     title: () => (
        //         <span>
        //             售后贡献值(%)
        //             <Tooltip
        //                 title={'=售后 / 所有sku售后'}
        //             >
        //                 <QuestionCircleOutlined />
        //             </Tooltip>
        //         </span>
        //     ),
        //     dataIndex: '售后贡献率',
        //     render: (text: number) => <span>{text.toFixed(2).toString()}%</span>,
        //     width: 145,
        // },
        // {
        //     title: () => (
        //         <span>
        //             毛利贡献值(%)
        //             <Tooltip
        //                 title={'=净毛利 / 所有sku净毛利'}
        //             >
        //                 <QuestionCircleOutlined />
        //             </Tooltip>
        //         </span>
        //     ),
        //     dataIndex: '净毛利贡献率',
        //     render: (text: number) => <span>{text.toFixed(2).toString()}%</span>,
        //     width: 170,
        // },
        {
            title: '运营',
            dataIndex: '运营',
            width: 100,
            ellipsis: true,
            copyable: true,
        },
        {
            title: '运维',
            dataIndex: '运维',
            width: 100,
            ellipsis: true,
            copyable: true,
        },
        {
            title: '组别',
            dataIndex: '组别',
            width: 120,
            ellipsis: true,
            copyable: true,
        },
        {
            title: '店铺',
            dataIndex: '店铺',
            width: 120,
            ellipsis: true,
            copyable: true,
        }
    ];

    const [columns, setcolumns] = useState(temp_columns) as any;
    const [attribute, setattribute] = useState(total_attribute) as any;
    const onFinish = async (values: any) => {
        if (values['开始时间'] != null) {
            values['开始时间'] = values['开始时间'].format("YYYY-MM-DD");
        }
        if (values['结束时间'] != null) {
            values['结束时间'] = values['结束时间'].format("YYYY-MM-DD");
        }
        const result = request(`/api/sku/sale/total`, {
            method: 'POST',
            data: { ...values },
            requestType: 'form',
        });
        if (await result) {
            const temp_res = await result;
            if ((temp_res != 'false') && (temp_res != 'noAuth')) {

                const resp_data = await result;
                const detail = document.getElementsByClassName("detail")[0] as HTMLElement;
                detail.style.display = "block";
                message.success('提交成功');
                console.log(temp_res);
                // 表格数据
                setdataT(resp_data.sku_sale_table);
                setdataE(resp_data.sku_sale_table);
                // 个人信息
                setnum_sum(resp_data.num_sum);
                setmoney_sum(resp_data.money_sum);
                setpromotion_sum(resp_data.promotion_sum);
                setafter_sale_sum(resp_data.after_sale_sum);
                setgross_profit_sum(resp_data.gross_profit_sum);
                setgross_profit_per(resp_data.gross_profit_per);
                setpromotion_per(resp_data.promotion_per);

            }
            else if (temp_res == 'false') {
                message.error('无对应sku信息');
            }
            else if (temp_res == 'noAuth') {
                message.error('账号过期，请重新登录');
            }
        }

    };
    // 列筛选器改变事件
    function ColChange(i: any) {
        if (`${i}` == '') {
            setcolumns(temp_columns);
            setattribute(total_attribute);
        }
        else {
            const col_array = `${i}`.split(',');
            setattribute(col_array);
            setcolumns(col_array.map((value) => {
                return temp_columns[total_attribute.indexOf(value)];
            }))
        }
    }
    // 列筛选器选项
    const Option = total_attribute.map((value: any) => {
        return { label: value == '净毛利润' ? '毛利润' : (value == '净毛利润率' ? '毛利润率' : (value == '净毛利润贡献率' ? '毛利润贡献率' : value)), value: value };
    })
    // 导出报表
    const downloadExcel = () => {
        const excel_datas = dataE;
        console.log(attribute);
        // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
        let str = attribute.join(",") + '\n';
        str = str.replace(new RegExp("净毛利润", ("gm")), '毛利润');
        // 增加\t为了不让表格显示科学计数法或者其他格式
        for (let i = 0; i < excel_datas.length; i++) {
            excel_datas[i]['sku'] = excel_datas[i]['sku'].toString().replace(new RegExp(",", ("gm")), "|")
            excel_datas[i]['运营'] = excel_datas[i]['运营'].toString().replace(new RegExp(",", ("gm")), "|")
            excel_datas[i]['运维'] = excel_datas[i]['运维'].toString().replace(new RegExp(",", ("gm")), "|")
            excel_datas[i]['组别'] = excel_datas[i]['组别'].toString().replace(new RegExp(",", ("gm")), "|")
            for (const key in attribute) {
                if (Object.prototype.hasOwnProperty.call(excel_datas[i], attribute[key])) {
                    str += `${excel_datas[i][attribute[key]]},`;
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
        link.download = 'sku对应信息表.csv';
        link.click();
    };
    return (
        <>
            <div style={{ backgroundColor: "white", marginBottom: 5, paddingTop: 2, paddingLeft: 10 }}>
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    onFinish={onFinish}
                    size='small'
                >
                    <Row gutter={24}>
                        {getFields()}
                    </Row>
                    <Col
                        span={24}
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => {
                                form.resetFields();
                                setdataT([]);
                                setdataE([]);
                                const detail = document.getElementsByClassName("detail")[0] as HTMLElement;
                                detail.style.display = "none";
                            }}
                        >
                            重置
                        </Button>
                        <a
                            style={{ fontSize: 12 }}
                            onClick={() => {
                                setExpand(!expand);
                            }}
                        >
                            {expand ? <><UpOutlined />隐藏选项</> : <><DownOutlined />下拉选项</>}
                        </a>
                    </Col>

                </Form>
            </div>
            <div style={{ backgroundColor: "white", paddingLeft: 10, paddingRight: 10 }}>
                <p style={{ display: "none" }} className="detail">美元--销量总计:　{num_sum}　　　交易额总计:　{money_sum}　　　广告费用总计:　{promotion_sum}　　　售后费用总计:　{after_sale_sum}　　　毛利润:　{gross_profit_sum}　　　广告占比:　{promotion_per}%　　　毛利润占比:　{gross_profit_per}%</p>
                <Row style={{ marginBottom: 5 }}>
                    <Col span={12}>
                        <span>列选择器：</span>
                        <Select style={{ width: 400, paddingLeft: 5 }} mode="multiple" defaultValue={['sku', '品名']} options={Option} onChange={ColChange} />
                    </Col>
                    <Col
                        span={12}
                        style={{
                            textAlign: 'right',
                            float: 'right'
                        }}>
                        <Space>
                            <Button type="primary" onClick={() => downloadExcel()}>导出Excel表格</Button>
                        </Space>
                    </Col>
                </Row>
                <Table
                    size='small'
                    columns={columns}
                    scroll={{ x: 1800, y: 500 }}
                    dataSource={dataT}
                    rowSelection={rowSelection}
                    pagination={{
                        defaultPageSize: 5,
                        pageSizeOptions: ["5", "10", "20", "50", "100"],
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => {
                            return (<div>总共{total} 条数据</div>)
                        }
                    }}
                />
            </div>
            <Modal title={<span>{sku}的具体数据: <br /> {skuName} </span>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1200}>
                <OfflineData
                    offlineData={eval(lineData)}
                    firstData={first_data}
                />
            </Modal>
        </>
    );
};

export default SkuTotal;