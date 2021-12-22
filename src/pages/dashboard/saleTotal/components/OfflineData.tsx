import { Card, Col, Row, Tabs, Radio, Checkbox } from 'antd';
import { RingProgress, Line } from '@ant-design/charts';
import type { OfflineDataType } from '../data.d';
import { useState } from 'react';

import NumberInfo from '../NumberInfo';
const CustomTab = ({
  data,
  currentTabKey: currentKey,
}: {
  data: OfflineDataType;
  currentTabKey: string;
}) => (
  <Row gutter={8} style={{ width: 160, margin: '8px 0' }}>
    <Col span={12}>
      <NumberInfo
        title={data.name}
        subTitle="销售额占比"
        gap={2}
        total={`${data.cvr * 100}%`}
        theme={currentKey !== data.name ? 'light' : undefined}
      />
    </Col>
    <Col span={12} style={{ paddingTop: 36 }}>
      <RingProgress forceFit height={60} width={60} percent={data.cvr} />
    </Col>
  </Row>
);

const { TabPane } = Tabs;
const OfflineData = ({
  activeKey,
  loading,
  offlineData,
  handleTabChange,
}: {
  activeKey: string;
  loading: boolean;
  offlineData: OfflineDataType[];
  handleTabChange: (activeKey: string) => void;
}) => {
  const temp_data = JSON.parse(JSON.stringify(offlineData));
  let temp_check = JSON.parse(JSON.stringify(offlineData));;
  let check_i = 0;
  let temp = [];
  let i = 0;
  let temp_check_data = [];
  let check_dict: any = ["日销售额", "日销量", "日推广成本", "日推广占比(%)", "日售后费用", "日售后占比(%)", "日净毛利润", "日净毛利润率(%)", "月销售额", "月销量", "月推广成本", "月推广占比(%)", "月售后费用", "月售后占比(%)", "月净毛利润", "月净毛利润率(%)", "年销售额", "年销量", "年推广成本", "年推广占比(%)", "年售后费用", "年售后占比(%)", "年净毛利润", "年净毛利润率(%)"];
  // 多选框默认
  const plainOptions = ["销售额", "销量", "推广成本", "推广占比(%)", "售后费用", "售后占比(%)", "净毛利润", "净毛利润率(%)"];
  const defaultCheckedList = ["销售额", "销量", "推广成本", "推广占比(%)", "售后费用", "售后占比(%)", "净毛利润", "净毛利润率(%)"]
  // 选择栏
  const [offlineDatatemp, setofflineDatatemp] = useState<OfflineDataType[]>(temp_data);
  const sale_dict = {
    'day': ["日销售额", "日销量", "日推广成本", "日推广占比(%)", "日售后费用", "日售后占比(%)", "日净毛利润", "日净毛利润率(%)"],
    'month': ["月销售额", "月销量", "月推广成本", "月推广占比(%)", "月售后费用", "月售后占比(%)", "月净毛利润", "月净毛利润率(%)"],
    'year': ["年销售额", "年销量", "年推广成本", "年推广占比(%)", "年售后费用", "年售后占比(%)", "年净毛利润", "年净毛利润率(%)"]
  }
  let select_data: any = []
  // 多选栏
  const [seleceData, setseleceData] = useState<any>();
  const [checkData, setcheckData] = useState<any>(["日销售额", "日销量", "日推广成本", "日推广占比(%)", "日售后费用", "日售后占比(%)", "日净毛利润", "日净毛利润率(%)", "月销售额", "月销量", "月推广成本", "月推广占比(%)", "月售后费用", "月售后占比(%)", "月净毛利润", "月净毛利润率(%)", "年销售额", "年销量", "年推广成本", "年推广占比(%)", "年售后费用", "年售后占比(%)", "年净毛利润", "年净毛利润率(%)"]);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  // 选择栏的筛选
  function onChange(e: any) {
    const display = document.getElementsByClassName("attribute")[0] as HTMLElement;
    setseleceData(sale_dict[e.target.value]);
    console.log(checkData)
    if (e.target.value == "null") {
      display.style.display = "none";
      setofflineDatatemp([]);
    }
    else {
      display.style.display = "block";
      for (const iterator of offlineData) {
        temp = []
        for (const iterator2 of iterator.data) {
          select_data = sale_dict[e.target.value];
          if (select_data.indexOf(iterator2.type) > -1 && checkData.indexOf(iterator2.type) > -1) {
            temp.push(iterator2);
          }
        }
        temp_data[i].data = temp;
        i++;
      }
      setofflineDatatemp(temp_data);
    }
  }
  // 全选设定
  function onCheckAllChange(e: any) {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    if (e.target.checked == true) {
      console.log(e.target.checked)
      setofflineDatatemp(temp_data);
      setcheckData(["日销售额", "日销量", "日推广成本", "日推广占比(%)", "日售后费用", "日售后占比(%)", "日净毛利润", "日净毛利润率(%)", "月销售额", "月销量", "月推广成本", "月推广占比(%)", "月售后费用", "月售后占比(%)", "月净毛利润", "月净毛利润率(%)", "年销售额", "年销量", "年推广成本", "年推广占比(%)", "年售后费用", "年售后占比(%)", "年净毛利润", "年净毛利润率(%)"])
    } else {
      setofflineDatatemp([]);
      setcheckData([]);
    }
  };
  // 多选栏的筛选
  function onChangeCheck(checkedValues: any[]) {
    setCheckedList(checkedValues);
    setIndeterminate(!!checkedValues.length && checkedValues.length < plainOptions.length);
    setCheckAll(checkedValues.length === plainOptions.length);
    temp_check = JSON.parse(JSON.stringify(offlineData));
    check_dict = []
    checkedValues.forEach(element => {
      if (element == "销售额") {
        check_dict.push("日销售额");
        check_dict.push("月销售额");
        check_dict.push("年销售额");
      } else if (element == "销量") {
        check_dict.push("日销量")
        check_dict.push("月销量")
        check_dict.push("年销量")
      } else if (element == "推广成本") {
        check_dict.push("日推广成本")
        check_dict.push("月推广成本")
        check_dict.push("年推广成本")
      } else if (element == "推广占比(%)") {
        check_dict.push("日推广占比(%)")
        check_dict.push("月推广占比(%)")
        check_dict.push("年推广占比(%)")
      } else if (element == "售后费用") {
        check_dict.push("日售后费用")
        check_dict.push("月售后费用")
        check_dict.push("年售后费用")
      } else if (element == "售后占比(%)") {
        check_dict.push("日售后占比(%)")
        check_dict.push("月售后占比(%)")
        check_dict.push("年售后占比(%)")
      } else if (element == "净毛利润") {
        check_dict.push("日净毛利润")
        check_dict.push("月净毛利润")
        check_dict.push("年净毛利润")
      } else if (element == "净毛利润率(%)") {
        check_dict.push("日净毛利润率(%)")
        check_dict.push("月净毛利润率(%)")
        check_dict.push("年净毛利润率(%)")
      }
    });
    setcheckData(check_dict)
    for (const iterator of offlineData) {
      temp_check_data = []
      for (const iterator2 of iterator.data) {
        if (check_dict.indexOf(iterator2.type) > -1 && seleceData.indexOf(iterator2.type) > -1) {
          temp_check_data.push(iterator2);
        }
      }
      temp_check[check_i].data = temp_check_data;
      check_i++;
    }
    setofflineDatatemp(temp_check);
  }
  return (
    <Card loading={loading} bordered={false} style={{ marginTop: 32 }}>
      <Row>
        <Radio.Group onChange={onChange}>
          <Radio.Button value="day">天数据</Radio.Button>
          <Radio.Button value="month">月累计</Radio.Button>
          <Radio.Button value="year">年累计</Radio.Button>
          <Radio.Button value="null">隐藏数据</Radio.Button>
        </Radio.Group>
        <div style={{ display: "none", marginLeft: 50 }} className="attribute" >
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            全选
          </Checkbox>
          <Checkbox.Group options={plainOptions} value={checkedList} onChange={onChangeCheck} style={{ marginTop: 5 }} />
        </div>
      </Row>
      <Tabs activeKey={activeKey} onChange={handleTabChange} animated={false}>

        {offlineDatatemp.map((shop) => (
          <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
            <div style={{ padding: '0 24px' }}>
              <Line
                forceFit
                height={400}
                data={shop?.data}
                responsive
                xField="date"
                yField="value"
                seriesField="type"
                slider={{
                  start: 0.85,
                  end: 1,
                }}
              />
            </div>
          </TabPane>
        ))}
      </Tabs>
    </Card>
  )

}

export default OfflineData;
