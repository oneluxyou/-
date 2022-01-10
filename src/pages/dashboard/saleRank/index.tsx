import { Tabs, Card, DatePicker, Row, Col, Table, Tooltip, message } from "antd";
import { QuestionCircleOutlined, SoundOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import type { FC } from 'react';
import { useState } from 'react';
import request from 'umi-request';
const SaleRank: FC<any> = () => {
    const { TabPane } = Tabs;
    const dateFormat = 'YYYY-MM-DD';
    const { RangePicker } = DatePicker;
    const attribute = ['销量', '销售额', '推广', '损耗', '毛利润', '净毛利润'];
    const { data } = useRequest({
        url: '/api/rankTotal',
        method: 'post',
    });
    const [Tdata, setTdata] = useState() as any;
    const onChange = async (date: any) => {
        const values = { '开始时间': date[0].format('YYYY-MM-DD'), '结束时间': date[1].format('YYYY-MM-DD') }
        const result = request(`/api/rankTotal`, {
            method: 'POST',
            data: { ...values },
            requestType: 'form',
        });
        if (await result) {
            if (await result != 'false') {
                const resp_data = await result;
                // 表格数据
                setTdata(JSON.stringify(resp_data.data));
                message.success('提交成功');
            }
            else {
                message.error('提交失败');
            }
        }
        else {
            message.error('提交失败');
        }
    }
    // function onChange(dates: any, dateStrings: any) {
    //     console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);

    // }
    return (
        <>
            <span>时间:　</span>
            <RangePicker
                format={dateFormat}
                onChange={onChange}
            />
            <span>　</span>
            <Tooltip title={"最新结束日期:　" + data?.enddate || ''}>
                <QuestionCircleOutlined />
            </Tooltip>
            <div style={{ textAlign: "center", color: "#EE7700", fontSize: 16 }}>
                <p><SoundOutlined />　数据处理按照匹配表记录处理，每周二更新上周数据</p>
                <p>ebay、wayfair的广告还未纳入,部分产品的成本单价未确定，毛利润和净毛利润的数据会有所偏高</p>
            </div>
            <Tabs>
                {(Tdata ? JSON.parse(Tdata).sale : data?.sale)?.map((item: any) => (
                    < TabPane tab={item.index} key={item.index}>
                        <Row gutter={[16, 16]}>
                            {attribute?.map((attr) => (
                                <Col span={7} offset={1} style={{ minWidth: "350px" }}>
                                    <Card style={{ borderRadius: "15px" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <div style={{ fontFamily: "微软雅黑", fontSize: 24 }}>{attr}</div>
                                            <div style={{ fontFamily: "华文细黑", fontSize: 30 }}>{item?.[attr + 'total'] + (attr == '销量' ? '' : '￥')}</div>
                                        </div>
                                        <hr />
                                        <Table columns={[
                                            {
                                                title: '排名',
                                                dataIndex: 'rank',
                                                width: 50,
                                            },
                                            {
                                                title: item.index,
                                                dataIndex: item.index,
                                            },
                                            {
                                                title: attr == '销量' ? attr : attr + '(￥)',
                                                dataIndex: attr,
                                                render: (text) => <span>{text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>,
                                            },
                                        ]} dataSource={item?.[attr]} pagination={false} scroll={{ y: 300 }} />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </TabPane>
                ))}
            </Tabs>
        </>
    );
}
export default SaleRank;