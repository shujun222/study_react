import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, message } from 'antd';

/**
 * ant4 Form写法明显更简洁了，
 * 1. 不用getDeractor()了，
 * 2. css样式上直接给<Form>赋值layout={labelCol, wrapperCol}了，
 *    <Form.Item如果没有label, 那么layout会失效, 所以对于没有label的item要特别指定layout
 * 3. 样式上应该是默认一个Item一个Row，但是即便啥也不指定xl,sm之类的，屏幕缩放很小时，也会自动换行
 * 4. 表单内部函数调用，比如setFieldsValue，不用@form.create()了，但是需要
 *    函数：const [form] = Form.useForm();   
 *    class: formRef = React.createRef(); 
 *    this.formRef.current.setFieldsValue({
          note: 'Hi, man!',
        });


 */
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const itemStyle = {
    border: '1px solid green'
}

const Demo = () => {
  const onFinish = (values) => {
    message.info('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    message.info('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        username: 'sbjun',
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{border: '1px solid red'}}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
        style={itemStyle}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        style={itemStyle}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked" style={itemStyle}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout} style={itemStyle}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      如果没有label属性，layout就会整体失效，所以要指定tailLayout  
      <Form.Item style={itemStyle}>
        <Button type="primary">
          Test
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
