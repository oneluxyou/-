import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Statistic, Progress } from 'antd';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import request from "umi-request";
import { Pie, measureTextWidth } from '@ant-design/charts';
import { useRequest, useAccess, Access } from 'umi';


const App: React.FC = () => {
    const access = useAccess();
    const { Divider } = ProCard;
    const [responsive, setResponsive] = useState(false);
    const onTableChange = () => { };
    const actionRef = useRef<ActionType>();
    const arr: ProColumns[] =
        [{ title: '工厂', dataIndex: "工厂", key: "工厂", width: 50 },
        { title: 'SKU', dataIndex: "SKU", key: "SKU", width: 130 },
        { title: 'SKU名称', dataIndex: 'SKU名称', key: "SKU名称", search: false, width: 350 },
        {
            title: '销量完成度(全平台)(%)', dataIndex: '完成率', key: "完成率", search: false,
            sorter: (a: { 完成率: number; }, b: { 完成率: number; }) => a.完成率 - b.完成率,
            render: (text: number) => <Progress percent={text} showInfo={false} />,
        },
        {
            title: '工厂不良率(%)', dataIndex: '不良率', key: "不良率", search: false, align: 'center',
            render: (text: number) => <span>{text.toString()}</span>,
        },
        {
            title: '预估费用', dataIndex: '预估费用', key: "预估费用", search: false,
            sorter: (a: { 预估费用: number; }, b: { 预估费用: number; }) => a.预估费用 - b.预估费用,
            render: (text: number) => <span>{text.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
        },
        {
            title: '时间区间',
            key: 'dateTimeRange',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            search: {
                transform: (value: any) => ({ startTime: value[0], endTime: value[1] })
            },
            hideInTable: true,
        },
        ];
    const arr1: ProColumns[] =
        [{ title: '工厂', dataIndex: "工厂", key: "工厂", width: 50 },
        { title: 'SKU', dataIndex: "SKU", key: "SKU", width: 130 },
        { title: 'SKU名称', dataIndex: 'SKU名称', key: "SKU名称", search: false, width: 350 },
        {
            title: '工厂不良率(%)', dataIndex: '不良率', key: "不良率", search: false, align: 'center',
            render: (text: number) => <span>{text.toString()}</span>,
        },
        {
            title: '预估费用', dataIndex: '预估费用', key: "预估费用", search: false,
            sorter: (a: { 预估费用: number; }, b: { 预估费用: number; }) => a.预估费用 - b.预估费用,
            render: (text: number) => <span>{text.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
        },
        {
            title: '时间区间',
            key: 'dateTimeRange',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            search: {
                transform: (value: any) => ({ startTime: value[0], endTime: value[1] })
            },
            hideInTable: true,
        },
        ];
    // 饼图数据
    const [quantity, setquantity] = useState<any>([{}]);
    const [quantity_max, setquantity_max] = useState<any>({});
    const [cost, setcost] = useState<any>([{}]);
    const [cost_max, setcost_max] = useState<any>({});
    // 文本数据
    const [all_sum, setall_sum] = useState([]) as any;
    const [badsum, setbadsum] = useState([]) as any;
    const [buliang_a, setbuliang_a] = useState([]) as any;
    const [buliang_b, setbuliang_b] = useState([]) as any;

    function renderStatistic(containerWidth: number, text: string, style: { fontSize: number; }) {
        const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

        let scale = 1;

        if (containerWidth < textWidth) {
            scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
        }

        const textStyleStr = `width:${containerWidth}px;`;
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
    }

    // @ts-ignore
    const config1 = {
        theme: { "styleSheet": { "brandColor": "#FF6B3B", "paletteQualitative10": ["#FF6B3B", "#E19348", "#FFC100", "#7b68ee", "#9FB40F", "#DAD5B5", "#626681", "#0E8E89", "#F383A2", "#247FEA"], "paletteQualitative20": ["#FF6B3B", "#E19348", "#FFC100", "#7b68ee", "#9FB40F", "#DAD5B5", "#626681", "#0E8E89", "#F383A2", "#247FEA", "#2BCB95", "#B1ABF4", "#1D42C2", "#1D9ED1", "#D64BC0", "#255634", "#8C8C47", "#8CDAE5", "#8E283B", "#791DC9"] } },
        height: 250,
        appendPadding: 10,
        data: quantity,
        angleField: 'value',
        colorField: 'type',
        radius: 0.7,
        innerRadius: 0.64,
        label: {
            type: 'spider',
            offset: '70%',
            style: {

                textAlign: 'center',
            },
            autoRotate: true,
            content: (datum: { value: any, data: any[] }) => {
                return `${(datum.value / quantity_max * 100).toFixed(2)}%`;
            },
        },

        statistic: {
            title: {
                offsetY: -4,
                style: {
                    fontSize: '14px',
                },
                customHtml: (container: { getBoundingClientRect: () => { width: any; height: any; }; }, view: any, datum: { type: any; }) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                    const text = datum ? datum.type : '总计';
                    return renderStatistic(d, text, {
                        fontSize: 14,
                    });
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontSize: '14px',
                },
                customHtml: (container: { getBoundingClientRect: () => { width: any; }; }, view: any, datum: { value: any; }, data: any[]) => {
                    const { width } = container.getBoundingClientRect();
                    const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
                    return renderStatistic(width, text, {
                        fontSize: 10

                        ,
                    });
                },
            },
        },
        // 添加 中心统计文本 交互
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
            {
                type: 'pie-statistic-active',
            },
        ],
    };
    const config2 = {
        theme: { "styleSheet": { "brandColor": "#FF6B3B", "paletteQualitative10": ["#FF6B3B", "#E19348", "#FFC100", "#7b68ee", "#9FB40F", "#DAD5B5", "#626681", "#0E8E89", "#F383A2", "#247FEA"], "paletteQualitative20": ["#FF6B3B", "#E19348", "#FFC100", "#7b68ee", "#9FB40F", "#DAD5B5", "#626681", "#0E8E89", "#F383A2", "#247FEA", "#2BCB95", "#B1ABF4", "#1D42C2", "#1D9ED1", "#D64BC0", "#255634", "#8C8C47", "#8CDAE5", "#8E283B", "#791DC9"] } },
        height: 250,
        appendPadding: 10,
        data: cost,
        angleField: 'value',
        colorField: 'type',
        radius: 0.7,
        innerRadius: 0.64,
        meta: {
            value: {},
        },
        label: {
            type: 'spider',
            offset: '70%',
            style: {

                textAlign: 'center',
            },
            autoRotate: true,
            content: (datum: { value: any, data: any[] }) => {
                return `${(datum.value / cost_max * 100).toFixed(2)}%`;
            },
        },
        statistic: {
            title: {
                offsetY: -4,
                style: {
                    fontSize: '14px',
                },
                customHtml: (container: { getBoundingClientRect: () => { width: any; height: any; }; }, view: any, datum: { type: any; }) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                    const text = datum ? datum.type : '总计';
                    return renderStatistic(d, text, {
                        fontSize: 14,
                    });
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontSize: '14px',
                },
                customHtml: (container: { getBoundingClientRect: () => { width: any; }; }, view: any, datum: { value: any; }, data: any[]) => {
                    const { width } = container.getBoundingClientRect();
                    const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
                    return renderStatistic(width, text, {
                        fontSize: 10

                        ,
                    });
                },
            },
        },
        // 添加 中心统计文本 交互
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
            {
                type: 'pie-statistic-active',
            },
        ],
    };

    return (

        <>
            <RcResizeObserver
                key="resize-observer"
                onResize={(offset) => {
                    setResponsive(offset.width < 560);
                }}
            >

                <ProCard.Group title="原因分析" direction={responsive ? 'column' : 'row'} >

                    <ProCard colSpan="45%">
                        <Statistic title="原因数量占比(个)" value={quantity_max} />
                        <Pie {...config1} />
                    </ProCard>

                    <Divider type={responsive ? 'horizontal' : 'vertical'} />
                    <ProCard colSpan="45%">
                        <Statistic title="原因金额占比(￥)" value={cost_max} />
                        <Pie {...config2} />
                    </ProCard>
                </ProCard.Group>
            </RcResizeObserver>
            <Access accessible={access.NotSalerAuth()} >
                <ProTable
                    columns={arr}
                    request={async (skusearch = {}) => {
                        console.log(skusearch);
                        const result = request('/api/after_sale/ana', {
                            method: 'POST',
                            data: { ...skusearch },
                            requestType: 'form',
                            success: true,
                        });
                        const data = await result;
                        setquantity(data.quantity);
                        setcost(data.cost);
                        setquantity_max(data.quantity_max);
                        setcost_max(data.cost_max);
                        setall_sum(data.all_sum);
                        setbadsum(data.badsum);
                        setbuliang_a(data.buliang_a);
                        setbuliang_b(data.buliang_b);
                        return result;

                    }}
                    search={{
                        labelWidth: "auto",
                        defaultCollapsed: false,
                    }}
                    toolbar={{
                        actions: [
                            <span> 在售SKU{all_sum}个　　不良SKU占{badsum}%　　不良率（工厂售后总数/对应SKU总销量）为{buliang_a}%　　不良率（工厂售后总数/工厂全销量）为{buliang_b}%
                            </span>,
                        ],
                    }}

                    actionRef={actionRef}
                    onChange={onTableChange}

                    pagination={{
                        pageSize: 100,
                    }}

                    scroll={{ x: 1000, y: 400 }}

                    headerTitle='售后分析表'

                />
            </Access>
            <Access accessible={access.SalerAuth()} >
                <ProTable
                    columns={arr1}
                    request={async (skusearch = {}) => {
                        const result = request('/api/after_sale/ana', {
                            method: 'POST',
                            data: { ...skusearch },
                            requestType: 'form',
                            success: true,
                        });
                        const data = await result;
                        setquantity(data.quantity);
                        setcost(data.cost);
                        setquantity_max(data.quantity_max);
                        setcost_max(data.cost_max);
                        setall_sum(data.all_sum);
                        setbadsum(data.badsum);
                        setbuliang_a(data.buliang_a);
                        setbuliang_b(data.buliang_b);
                        return result;

                    }}
                    search={{
                        labelWidth: "auto",
                        defaultCollapsed: false,
                    }}
                    toolbar={{
                        actions: [
                            <span> 在售SKU{all_sum}个　　不良SKU占{badsum}%　　不良率（工厂售后总数/对应SKU总销量）为{buliang_a}%　　不良率（工厂售后总数/工厂全销量）为{buliang_b}%
                            </span>,
                        ],
                    }}

                    actionRef={actionRef}
                    onChange={onTableChange}

                    pagination={{
                        pageSize: 100,
                    }}

                    scroll={{ x: 1000, y: 400 }}

                    headerTitle='售后分析表'

                />
            </Access>
        </>
    )
}

export default App
