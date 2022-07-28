import React from 'react';
import {Form, Input} from 'antd';
import 'antd/dist/antd.css';

class NormalForm extends React.Component {
    render() {
        let {getFieldDecorator} = this.props.form
        let formItemLayout = {labelCol: {span: 5}, wrapperCol: {span: 12, offset: 1}}
        return (
            <Form>
                <Form.Item {...formItemLayout} label='活动样式名称'>
                    {getFieldDecorator('name', {
                        rules: [
                            {required: true, message: '请录入活动样式名称'},
                            {whitespace: true, message: '不能为空格'}
                        ]
                    })(
                        <Input placeholder='活动样式名称尽量不超过10个字' style={{width: 300}}/>
                    )}
                </Form.Item>

                <Form.Item {...formItemLayout} label='密码'>
                    {getFieldDecorator('psd', {
                        rules: [
                            {required: true, message: '请录入密码'}
                        ]
                    })(
                        <Input placeholder='输入密码' style={{width: 300}}/>
                    )}
                </Form.Item>

            </Form>
        )
    }
}

NormalForm = Form.create({})(NormalForm);
export default NormalForm;
