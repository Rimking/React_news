import React from 'react'
import "./SearchModol.css"
import { Select, DatePicker, Space,Input } from 'antd';
import "antd/dist/antd.css"
import { AudioOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;
export default function SearchModol() {

  
  const handleChange = (value) => {
    // console.log(`selected ${value}`);

  }

  const onChange =(value, dateString)=> {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
  }

  const onOk =(value)=> {
    // console.log('onOk: ', value);
  }
  const onSearch = value => console.log(value);

  return (
    <div className="sea_con">
      <div style={{float:"left"}}>
      {/* <Select defaultValue="lucy" onChange={handleChange}>
        <Option value="jack">Jack</Option>

      </Select>
      <Select defaultValue="lucy" onChange={handleChange}>
        <Option value="jack">Jack</Option> */}

      {/* </Select> */}
      <Select defaultValue="lucy" onChange={handleChange}>
        <Option value="jack">Jack</Option>

      </Select>

      <Space direction="vertical" size={12}>
        <RangePicker
          format="YYYY-MM-DD"
          onChange={onChange}
          onOk={onOk}
        />
      </Space>
      </div>
      <div className='se_input'>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      </div>

      {/* 搜索框 */}
      


    </div>

  )


}
