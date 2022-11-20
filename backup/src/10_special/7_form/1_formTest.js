/**
 * 我理解受控组件应该是 有value && onChange, onChange改变的是state，value绑定state
 * 非受控组件：不指定value，可以自由修改；
 * 最后不管受控组件，还是非受控，都应该可以自由修改值的；
 * 
 * Author: shujun
 * Date: 2020-08-16
 */
import React from 'react';

export default class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handChange = (event) => {
        this.setState({value: event.target.value});
    }

    handSubmit = (event) => {
        alert("提交的名字: " + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handSubmit}>
                名字：
                <input type="text" value={this.state.value} onChange={this.handChange} />
                
                <select>
                    <option value="grapefruit">葡萄柚</option>
                    <option value="lime">lmie</option>
                    <option value="mango">mango</option>
                </select>

                {/* 完全没感受到这个multiple有什么用 */}
                <select multiple={true} >
                    <option value="grapefruit">葡萄柚</option>
                    <option value="lime">lmie</option>
                    <option value="mango">mango</option>
                </select>

                <input type="file" multiple />

                <input type="submit" value="提交" />
            </form>
        );
    }

}


/**
 * 搞个小例子练练手，熟悉下受控组件
 * 演示什么是一石二鸟？
 * 一个函数用在两个控件上
 */
export class Reservation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        numberOfGuests: 2
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      
      // name不是问题，能自动识别的
      const name = target.name;
      console.log("name: ", name);
      console.log("value: ", target.value);

      // checkbox的target.value咋怎么都是“on”? 所以要通过这个转换成true||false
      const value = target.name === 'isGoing' ? target.checked : target.value;
      console.log("value after check: ", value);
      // 神奇了，原来对象的key值也能用变量表示。
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <form>
          <label>
            参与:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            来宾人数:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
  }


