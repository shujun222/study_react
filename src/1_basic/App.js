import React, { Component } from 'react'
import { WaterWave, Bar } from 'ant-design-pro/lib/Charts';
import { DatePicker } from 'antd';

import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';


const salesData = [
    {"x":"1月","y":469},
    {"x":"2月","y":292},
    {"x":"3月","y":257},
    {"x":"4月","y":940},
    {"x":"5月","y":825},
    {"x":"6月","y":1060},
]

export default class App extends Component {
    render() {
        return (<>
            <h1>组件初印象</h1>
            html5: <input type="date" /> &nbsp; &nbsp;
            antd: <DatePicker /> 
            <p />
            <WaterWave height={161} title="补贴资金剩余" percent={34} />
            <WaterWave height={161} title="今日小目标" percent={50} />
            <Bar height={200} width={500} title="销售额趋势" data={salesData} />
        </>)
    }
}
