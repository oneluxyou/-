import { Row, Radio, Checkbox } from 'antd';
import { Line } from '@ant-design/charts';
import { useState } from 'react';

const OfflineData = ({
    offlineData,
    firstData,
}: {
    offlineData: any;
    firstData: any;
}) => {
    let temp_data = JSON.parse(JSON.stringify(offlineData));
    let temp_check = JSON.parse(JSON.stringify(offlineData));
    const [predata, setpredata] = useState<any[]>();
    const [value, setValue] = useState('');
    let check_dict: any = ["销售成本单价/USD", "销售总数/天/PC", "七天日销", "平均售价/USD", "销售额/天/USD", "销售总成本/USD", "损耗",
        "损耗率(%)", "毛利润/USD",
        "毛利润率(%)", "推广成本/USD", "净毛利润/USD", "净毛利润率(%)", "成本占比(%)", "推广占比(%)", "月SKU销量", "月SKU销售额", "月SKU推广费", "月损耗",
        "月SKU净毛利",
        "月SKU推广费率(%)", "月损耗率(%)", "月SKU净毛利润率", "月SKU销量/所有SKU销量(%)", "月SKU销售额/所有SKU销售额(%)", "月SKU推广费/所有SKU销售额(%)",
        "月SKU净毛利/所有SKU销售额(%)",
        "年SKU销量", "年SKU销售额", "年SKU推广费", "年损耗", "年SKU净毛利", "年SKU推广费率(%)", "年损耗率(%)", "年SKU净毛利润率(%)", "年SKU销量/所有SKU销量(%)",
        "年SKU销售额/所有SKU销售额(%)", "年SKU推广费/所有SKU销售额(%)", "年SKU净毛利/所有SKU销售额(%)"];
    const sale_dict = {
        'day': ["销售成本单价/USD", "销售总数/天/PC", "平均售价/USD", "销售额/天/USD", "销售总成本/USD", "损耗", "损耗率(%)",
            "毛利润/USD", "毛利润率(%)", "推广成本/USD", "净毛利润/USD", "净毛利润率(%)", "成本占比(%)", "推广占比(%)"],
        'month': ["销售成本单价/USD", "平均售价/USD", "月SKU净毛利", "月SKU推广费率(%)", "月损耗率(%)", "月SKU净毛利润率(%)", "月SKU销量/所有SKU销量(%)",
            "月SKU销售额/所有SKU销售额(%)", "月SKU推广费/所有SKU销售额(%)", "月SKU净毛利/所有SKU销售额(%)"],
        'year': ["销售成本单价/USD", "平均售价/USD", "年SKU销量", "年SKU销售额", "年SKU推广费", "年损耗", "年SKU净毛利", "年SKU推广费率(%)", "年损耗率(%)", "年SKU净毛利润率(%)", "年SKU销量/所有SKU销量(%)", "年SKU销售额/所有SKU销售额(%)",
            "年SKU推广费/所有SKU销售额(%)", "年SKU净毛利/所有SKU销售额(%)"],
        'sale': ["销售总数/天/PC", "七天日销"]
    }
    // 多选框默认
    const [plainOptions, setplainOptions] = useState<any[]>(check_dict);
    // 选择栏
    const [offlineDatatemp, setofflineDatatemp] = useState<any[]>(offlineData);
    let select_data: any = []
    // 多选栏
    const [seleceData, setseleceData] = useState<any>();
    const [checkData, setcheckData] = useState<any>(check_dict);
    const [checkedList, setCheckedList] = useState(check_dict);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    // 选择栏的筛选
    function onChange(e: any) {
        const CheckVis = document.getElementsByClassName("attribute")[0] as HTMLElement;
        setValue(e.target.value);
        setpredata(offlineData);
        console.log(offlineData);
        setseleceData(sale_dict[e.target.value]);
        CheckVis.style.display = "block";
        temp_data = []
        for (const iterator of offlineData) {
            select_data = sale_dict[e.target.value];
            if (select_data.indexOf(iterator.type) > -1 && checkData.indexOf(iterator.type) > -1) {
                temp_data.push(iterator);
            }
        }
        setofflineDatatemp(temp_data);
        setCheckedList(sale_dict[e.target.value]);
        setplainOptions(sale_dict[e.target.value]);
        console.log(offlineDatatemp);
    }
    // 全选设定
    function onCheckAllChange(e: any) {
        setpredata(offlineData);
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
        if (e.target.checked == true) {
            temp_check = []
            for (const iterator of offlineData) {
                if (seleceData.indexOf(iterator.type) > -1) {
                    temp_check.push(iterator);
                }
            }
            setofflineDatatemp(temp_check);
            setcheckData(check_dict)
        } else {
            setofflineDatatemp([]);
            setcheckData([]);
        }
    };
    // 多选栏的筛选
    function onChangeCheck(checkedValues: any[]) {
        setpredata(offlineData);
        setCheckedList(checkedValues);
        setIndeterminate(!!checkedValues.length && checkedValues.length < plainOptions.length);
        setCheckAll(checkedValues.length === plainOptions.length);
        temp_check = JSON.parse(JSON.stringify(offlineData));
        check_dict = []
        checkedValues.forEach(element => {
            check_dict.push(element);
        });
        setcheckData(check_dict);
        temp_check = []
        for (const iterator of offlineData) {
            if (check_dict.indexOf(iterator.type) > -1 && seleceData.indexOf(iterator.type) > -1) {
                temp_check.push(iterator);
            }
        }
        setofflineDatatemp(temp_check);
    }
    if (document.getElementsByClassName("attribute")[0]) {
        const CheckVis = document.getElementsByClassName("attribute")[0] as HTMLElement;
        if ((CheckVis.style.display = "block") && (offlineData != predata)) {
            CheckVis.style.display = "none"
        }
    }
    return (
        <>
            <Row>
                <Radio.Group onChange={onChange} value={offlineData == predata ? value : ''}>
                    <Radio.Button value="day">天数据</Radio.Button>
                    <Radio.Button value="month">月累计</Radio.Button>
                    <Radio.Button value="year">年累计</Radio.Button>
                    <Radio.Button value="sale">天销售数据</Radio.Button>
                </Radio.Group>
                <div style={{ display: "none" }} className="attribute" >
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                        全选
                    </Checkbox>
                    <Checkbox.Group options={plainOptions} value={checkedList} onChange={onChangeCheck} />
                </div>
            </Row>

            <Line
                forceFit
                height={400}
                responsive
                data={offlineData == predata ? offlineDatatemp : firstData}
                xField="date"
                yField="value"
                seriesField="type"
                legend={{
                    position: 'top-center'
                }}
                slider={{
                    start: 0,
                    end: 1,
                }}
            />
        </>
    )

}

export default OfflineData;
