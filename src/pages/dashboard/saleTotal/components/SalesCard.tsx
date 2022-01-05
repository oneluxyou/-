import { FileExcelOutlined } from '@ant-design/icons';
import { Card, Tabs, Button, Tooltip, Table } from 'antd';
import type { SearchDataType } from '../data.d';
import styles from '../style.less';
// import $ from 'jquery'
export type TimeType = 'today' | 'week' | 'month' | 'year';

const { TabPane } = Tabs;

const columns: any = [
  {
    title: '店铺',
    width: 55,
    dataIndex: 'store',
    key: '1',
    fixed: 'left',
  },
  {
    title: '销量',
    width: 40,
    dataIndex: 'saleNum',
    key: '2',
  },
  {
    title: '销售额',
    dataIndex: 'saleMoney',
    key: '3',
    width: 70,
  },
  {
    title: '推广成本',
    dataIndex: 'promotionCost',
    key: '4',
    width: 65,
  },
  {
    title: '推广占比(%)',
    dataIndex: 'promotionPer',
    key: '5',
    width: 60,
  },
  {
    title: '售后费用',
    dataIndex: 'afterSale',
    key: '6',
    width: 65,
  },
  {
    title: '售后占比(%)',
    dataIndex: 'afterSalePer',
    key: '7',
    width: 60,
  },
  {
    title: '毛利润',
    dataIndex: 'grossProfit',
    key: '8',
    width: 65,
  },
  {
    title: '毛利润率(%)',
    dataIndex: 'grossPer',
    key: '9',
    width: 60,
  },
  {
    title: '销量贡献率(%)',
    dataIndex: 'numContribute',
    key: '10',
    fixed: 'right',
    width: 70,
  },
  {
    title: '销售额贡献率(%)',
    dataIndex: 'moneyContribute',
    key: '11',
    fixed: 'right',
    width: 75,
  },
  {
    title: '毛利润贡献率(%)',
    dataIndex: 'profitContribute',
    key: '12',
    fixed: 'right',
    width: 75,
  },
];


const SalesCard = ({
  loading,
  monthData,
  date,
}: {
  loading: boolean;
  monthData: SearchDataType[];
  date: string,
}) => {

  const operations =
    < div >
      <Button style={{ marginRight: 10 }}><Tooltip title={date}><a href="/api/saleTotalExcel"><FileExcelOutlined />导出Excel表格</a></Tooltip></Button>
    </div >
  // const data = [
  //   {
  //     type: '分类一',
  //     value: 27,
  //   },
  //   {
  //     type: '分类二',
  //     value: 25,
  //   },
  //   {
  //     type: '分类三',
  //     value: 18,
  //   },
  //   {
  //     type: '分类四',
  //     value: 15,
  //   },
  //   {
  //     type: '分类五',
  //     value: 10,
  //   },
  //   {
  //     type: '其他',
  //     value: 5,
  //   },
  // ];
  // const config = {
  //   appendPadding: 10,
  //   data: data,
  //   angleField: 'value',
  //   colorField: 'type',
  //   radius: 0.9,
  //   label: {
  //     type: 'inner',
  //     offset: '-30%',
  //     content: function content(_ref: { percent: any; }) {
  //       const percent = _ref.percent;
  //       return ''.concat((percent * 100).toFixed(0), '%');
  //     },
  //     style: {
  //       fontSize: 14,
  //       textAlign: 'center',
  //     },
  //   },
  //   interactions: [{ type: 'element-active' }],
  // };
  // const tab_dict = { 1: ['销量', '销售额', '推广成本', '售后'], 2: ['毛利润', '销量贡献率', '销售额贡献率', '毛利润贡献率'] }
  // const tabChange = (e: any) => {
  //   console.log(tab_dict[e.target.value])
  // }
  return (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
          tabBarExtraContent={operations}
        >
          {monthData.map((shop) => (
            <TabPane tab={shop.name} key={shop.index}>
              <Table
                scroll={{ x: 1400 }}
                dataSource={shop.salesData}
                columns={columns}
                pagination={false}
                rowKey="key"
              />
              {/* <Radio.Group defaultValue="1" onChange={tabChange} style={{ paddingTop: -110 }}>
                <Radio.Button value="1">销量||销售额||推广成本||售后</Radio.Button>
                <Radio.Button value="2">毛利润||销量贡献率||销售额贡献率||毛利润贡献率</Radio.Button>
              </Radio.Group>
              <br />
              <br />
              <Row>
                <Col className="gutter-row" span={6}>
                  <p style={{ textAlign: "center" }} id="pie1">销量占比</p>
                  <Pie {...config} />;
                </Col>
                <Col className="gutter-row" span={6}>
                  <p style={{ textAlign: "center" }} id="pie2">销量占比</p>
                  <Pie {...config} />;
                </Col>
                <Col className="gutter-row" span={6}>
                  <p style={{ textAlign: "center" }} id="pie3">销量占比</p>
                  <Pie {...config} />;
                </Col>
                <Col className="gutter-row" span={6}>
                  <p style={{ textAlign: "center" }} id="pie4">销量占比</p>
                  <Pie {...config} />;
                </Col>
              </Row> */}
            </TabPane>
          ))}
        </Tabs>
        <br />
      </div>
    </Card >
  );
}
export default SalesCard;
