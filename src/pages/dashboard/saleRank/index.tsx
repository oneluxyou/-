import { Tabs, Card, DatePicker, Row, Col, Table } from "antd";
import moment from 'moment';
const saleRank = () => {
    const { TabPane } = Tabs;
    const dateFormat = 'YYYY-MM-DD';
    const { RangePicker } = DatePicker;
    // mock数据
    const columns: any = [
        {
            title: '排名',
            dataIndex: 'rank',
        },
        {
            title: '销售',
            dataIndex: 'member',
        },
        {
            title: '销售额(￥)',
            dataIndex: 'sale',
        },
    ];

    const data = [
        {
            key: '1',
            rank: 1,
            member: "金1",
            sale: 5616,
        },
        {
            key: '2',
            rank: 2,
            member: "金2",
            sale: 5616,
        },
        {
            key: '3',
            rank: 3,
            member: "金3",
            sale: 5616,
        },
        {
            key: '4',
            rank: 4,
            member: "金4",
            sale: 5616,
        },
        {
            key: '5',
            rank: 5,
            member: "金5",
            sale: 5616,
        },
        {
            key: '6',
            rank: 6,
            member: "金6",
            sale: 5616,
        },
        {
            key: '7',
            rank: 7,
            member: "金7",
            sale: 5616,
        },
    ];
    return (
        <>
            <span>时间:　</span>
            <RangePicker
                defaultValue={[moment(moment().startOf('month').toDate(), dateFormat), moment(moment().toDate(), dateFormat)]}
                format={dateFormat}
            />
            <Tabs>
                <TabPane tab="小组" key="1">
                    <Row gutter={[16, 16]}>
                        <Col span={7} offset={1} style={{ minWidth: "350px" }}>
                            <Card style={{ borderRadius: "15px" }}>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontFamily: "微软雅黑", fontSize: 24 }}>本月即时销售额</div>
                                    <div style={{ fontFamily: "华文细黑", fontSize: 30 }}>￥1230303.26</div>
                                </div>
                                <hr />
                                <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 300 }} />
                            </Card>
                        </Col>
                        <Col span={7} offset={1} style={{ minWidth: "350px" }}>
                            <Card style={{ borderRadius: "15px" }}>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontFamily: "微软雅黑", fontSize: 24 }}>本月及时销售额</div>
                                    <div style={{ fontFamily: "华文细黑", fontSize: 30 }}>￥1230303.26</div>
                                </div>
                                <hr />
                                <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 300 }} />
                            </Card>
                        </Col>
                        <Col span={7} offset={1} style={{ minWidth: "350px" }}>
                            <Card style={{ borderRadius: "15px" }}>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontFamily: "微软雅黑", fontSize: 24 }}>本月及时销售额</div>
                                    <div style={{ fontFamily: "华文细黑", fontSize: 30 }}>￥1230303.26</div>
                                </div>
                                <hr />
                                <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 300 }} />
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="销售" key="2">
                    销售
                </TabPane>
            </Tabs>
        </>
    );
}
export default saleRank;