import { Input, Tooltip, Form } from 'antd';
import React from 'react';


class NumericInput extends React.Component {
    onChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        this.props.onChange(value.replace("，", ",").replace(/"/g, "").replace(/\s(?=$)/g, "").replace(/\s(?!$)/g, ",").replace(/'/g, "").replace(/,{2,}/g, ","));
    };

    // '.' at the end or only '-' in the input box.
    onBlur = () => {
        const { value, onBlur, onChange } = this.props;
        let valueTemp = value;
        if (valueTemp) {
            onChange(valueTemp.replace(/\s/g, ","));
        }
        if (onBlur) {
            onBlur();
        }
    };

    render() {
        const { value } = this.props;
        const title = value ? (
            <span className="numeric-input-title">{value !== '-' ? value : '-'}</span>
        ) : (
            '例如USAN1011324-2'
        );
        return (
            <Tooltip
                trigger={['focus']}
                title={title}
                placement="topLeft"
                overlayClassName="numeric-input"
            >
                <Input
                    {...this.props}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    placeholder="请输入sku"
                />
            </Tooltip>
        );
    }
}

class SkuInputDemo extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { value: '' };
    }

    onChange = (value: any) => {
        this.setState({ value });
    };

    render() {
        return (
            <Form.Item
                name={`sku`}
                label={`sku`}
                rules={[{ pattern: /[^,||^，]$/, message: '最后一位不能为,' }]}
            >
                <NumericInput style={{ width: 200 }} value={this.state.value} onChange={this.onChange} />
            </Form.Item>
        );
    }
}

export default SkuInputDemo;