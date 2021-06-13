import { ChartCard, yuan, Field } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import { Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import React from 'react';
import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式

export default class OurChartCard extends React.Component {
    

    render() {
        let value = this.props.value;
        let chartType = this.props.chartType;

        //1. 主值
        let mainValue = value;
        //2. 尾部
        let footer = null;
        //3. 中间的周同比，日环比
        let items = [];

        //即便采用“开放所有样式”，也可以根据字段控制显示隐藏其它部分
        if ("all" === chartType) {
            mainValue = value.mainValue;
            footer = value.footer && <Field label={value.footer.text} value={numeral(value.footer.value).format('0,0')} />;
            items = value.items || [];
        }

        return (
            <ChartCard
                title="销售额"

                action={
                    <Tooltip title="指标说明">
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                avatar={
                    <img
                        style={{ width: 56, height: 56 }}
                        src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
                        alt="indicator"
                    />
                }
                total={() => <span dangerouslySetInnerHTML={{ __html: yuan(mainValue) }} />}
                footer={footer}
                contentHeight={46}
            >
                {/* 内部的周同比，日环比项目，有数据才展示 */}
                {items.length > 0 ? items.map((item, index) => {
                    // span挤在一起不好看，从第二个开始：marginLeft:16
                    return <span key={index} style={index>0? {marginLeft:16 } : {}} >
                        {item.text}
                        <Trend flag={item.flag} style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                            {item.value}
                        </Trend>
                    </span>
                }) : ""}

            </ChartCard>
        );
    }
}

const testData = {
    "mainValue": 126560,
	"footer": {"text":"日均销售额", "value":"1234"},
	"items": [
		{"text":"周同比", "value":"12%", "flag":"up"},
		{"text":"日环比", "value":"11%", "flag":"down"},
		{"text":"月总数", "value":"1234"},
	]
}

export function TestChart() {
    return(
        <>
        <OurChartCard value={testData} chartType="all" />
        <OurChartCard value="123458" chartType="simple" />
        </>
    );
}