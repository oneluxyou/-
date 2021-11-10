import React from 'react';
import { PageContainer } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Button,Alert} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {gettable} from "@/services/table";
import {getTodoLists} from "@/services/todo";
import request from "umi-request";


class App extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  render(){

    const columns = [{"title":"SKU\u5e8f\u53f7","dataIndex":0},{"title":"SKU","dataIndex":1},{"title":"xxx","dataIndex":2, "width": '100'},{"title":"2021-10-29","dataIndex":3},{"title":"2021-10-30","dataIndex":4},{"title":"2021-10-31","dataIndex":5},{"title":"2021-11-01","dataIndex":6},{"title":"2021-11-02","dataIndex":7},{"title":"2021-11-03","dataIndex":8},{"title":"2021-11-04","dataIndex":9},{"title":"2021-11-05","dataIndex":10},{"title":"2021-11-06","dataIndex":11},{"title":"2021-11-07","dataIndex":12},{"title":"2021-11-08","dataIndex":13},{"title":"2021-11-09","dataIndex":14},{"title":"2021-11-10","dataIndex":15},{"title":"2021-11-11","dataIndex":16},{"title":"2021-11-12","dataIndex":17},{"title":"2021-11-13","dataIndex":18},{"title":"2021-11-14","dataIndex":19},{"title":"2021-11-15","dataIndex":20},{"title":"2021-11-16","dataIndex":21},{"title":"2021-11-17","dataIndex":22},{"title":"2021-11-18","dataIndex":23},{"title":"2021-11-19","dataIndex":24},{"title":"2021-11-20","dataIndex":25},{"title":"2021-11-21","dataIndex":26},{"title":"2021-11-22","dataIndex":27},{"title":"2021-11-23","dataIndex":28},{"title":"2021-11-24","dataIndex":29},{"title":"2021-11-25","dataIndex":30},{"title":"2021-11-26","dataIndex":31},{"title":"2021-11-27","dataIndex":32},{"title":"2021-11-28","dataIndex":33},{"title":"2021-11-29","dataIndex":34},{"title":"2021-11-30","dataIndex":35},{"title":"2021-12-01","dataIndex":36},{"title":"2021-12-02","dataIndex":37},{"title":"2021-12-03","dataIndex":38},{"title":"2021-12-04","dataIndex":39},{"title":"2021-12-05","dataIndex":40},{"title":"2021-12-06","dataIndex":41},{"title":"2021-12-07","dataIndex":42},{"title":"2021-12-08","dataIndex":43},{"title":"2021-12-09","dataIndex":44},{"title":"2021-12-10","dataIndex":45},{"title":"2021-12-11","dataIndex":46},{"title":"2021-12-12","dataIndex":47},{"title":"2021-12-13","dataIndex":48},{"title":"2021-12-14","dataIndex":49},{"title":"2021-12-15","dataIndex":50},{"title":"2021-12-16","dataIndex":51},{"title":"2021-12-17","dataIndex":52},{"title":"2021-12-18","dataIndex":53},{"title":"2021-12-19","dataIndex":54},{"title":"2021-12-20","dataIndex":55},{"title":"2021-12-21","dataIndex":56},{"title":"2021-12-22","dataIndex":57},{"title":"2021-12-23","dataIndex":58},{"title":"2021-12-24","dataIndex":59},{"title":"2021-12-25","dataIndex":60},{"title":"2021-12-26","dataIndex":61},{"title":"2021-12-27","dataIndex":62},{"title":"2021-12-28","dataIndex":63},{"title":"2021-12-29","dataIndex":64},{"title":"2021-12-30","dataIndex":65},{"title":"2021-12-31","dataIndex":66},{"title":"2022-01-01","dataIndex":67},{"title":"2022-01-02","dataIndex":68},{"title":"2022-01-03","dataIndex":69},{"title":"2022-01-04","dataIndex":70},{"title":"2022-01-05","dataIndex":71},{"title":"2022-01-06","dataIndex":72},{"title":"2022-01-07","dataIndex":73}];

    return(
      <ProTable
        columns={columns}
        request={async (params = {}) => {
          return request<{
            method:'GET',
            data: [];
          }>('http://192.168.1.148:5000/data', {
            params,
          });
        }}

        bordered
        scroll={{ x: 2000 }}
        title={() => 'Header'}
        footer={() => 'Footer'}
      />
    )
  }

}

export default () => {
  return(
    <App />
  )
}

