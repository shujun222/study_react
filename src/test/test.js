import React from 'react';

import PropTypes from 'prop-types';



class Select extends React.Component {
    constructor(props) {
        super();
        this.state = {val: 5};
    }

    componentDidMount() { // 渲染完成后调用一次，这个时候DOM结构已经渲染了
        console.log("didmount...");
        this.setState({
            val: this.state.val+'=渲染完成了'
        }, () => {
            console.log("did console: " + this.state.val)
        });
        console.log("what?");
    }


    componentDidUpdate() { // 组件更新结束之后执行，在初始化render时不执行
        console.info("update ...");
        this.setState({
            val: this.state.val+'=更新中'
        }, () => {
            console.log("upding: ", this.state.val);
            console.warn("warn");
            console.error("error...");
        });
    }

    render() {
        console.log("render...");
        const value = this.state.val;
        const options = [1,2,3,4,5,6];
        return (
            <div>
                <h1>{value}</h1>
                <select>
                    {options.map(option => 
                        <option value={option} key={option}>
                            {option}
                        </option>
                    )}
                </select>
            </div>

        );
    }
}

export default Select;