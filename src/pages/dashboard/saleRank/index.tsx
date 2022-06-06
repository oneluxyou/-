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
    const attribute = ['销量', '交易额', '成本', '广告', '损耗', '净毛利润'];
    const { data } = useRequest({
        url: '/api/rankTotal',
        method: 'post',
    });
    const [Tdata, setTdata] = useState() as any;
    const onChange = async (date: any) => {
        let values;
        if (date) {
            values = { '开始时间': date[0].format('YYYY-MM-DD'), '结束时间': date[1].format('YYYY-MM-DD') }
        } else {
            values = {
                '开始时间': '2022-01-01', '结束时间': data?.enddate
            }
        }

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
    // 添加对应的符号
    const symbol = {
        '销量': '销量',
        '交易额': '交易额(￥)',
        '成本': '成本(￥)',
        '广告': '广告(￥)', '损耗': '损耗(￥)', '净毛利润': '毛利润(￥)',
    }

    return (
        <>
            <span>时间:　</span>
            <RangePicker
                format={dateFormat}
                onChange={onChange}
            />
            <span>　</span>
            {/* <Tooltip title={"最新结束日期:　" + data?.enddate || ''}>
                <QuestionCircleOutlined />
            </Tooltip> */}
            <div style={{ textAlign: "center", color: "#EE7700", fontSize: 16 }}>
                <p><SoundOutlined />　默认时间为{data?.startdate} 到 {data?.enddate}</p>
            </div>
            <Tabs>
                {(Tdata ? JSON.parse(Tdata).sale : data?.sale)?.map((item: any) => (
                    < TabPane tab={item.index} key={item.index}>
                        <Row gutter={[4, 4]}>
                            {attribute?.map((attr) => (
                                <Col span={7} style={{ minWidth: "300px", marginLeft: 10 }}>
                                    <Card style={{ borderRadius: "15px" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <div style={{ fontFamily: "微软雅黑", fontSize: 24 }}>{attr == '净毛利润' ? '毛利润' : attr}</div>
                                            <div style={{ fontFamily: "华文细黑", fontSize: 30 }}>{item?.[attr + 'total'] + (attr == '销量' ? '' : (attr == '推广占比') || (attr == '损耗占比') || (attr == '广告占比') || (attr == '成本占比') ? '%' : '￥')}</div>
                                        </div>
                                        <hr />
                                        <Table
                                            size="small"
                                            columns={[
                                                {
                                                    title: '排名',
                                                    dataIndex: 'rank',
                                                    width: 40,
                                                },
                                                {
                                                    title: item.index,
                                                    dataIndex: item.index,
                                                },
                                                {
                                                    title: symbol[attr],
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