/**
 * 子组件如何更改父组件的state呢？
 * 父组件传递下来的props不满足要求，往往需要修改
 * 
 * 
 * Author: shujun
 * Date: 2020-10-25
 */

import React from 'react';


export default class Father extends React.Component{
    state = {
        inputValue: 'shujun',
        objValue: {'name': 'jay', 'sex': 'boy'}
    };

    changeInputValue = (e)=> {
        this.setState({inputValue: e.target.value});
    }

    changeObjValue = (e)=> {
        let objValue = this.state.objValue;
        objValue.name = e.target.value;
        this.setState({objValue});
    }

    render(){
        const {inputValue, objValue} = this.state;
        return <div style={{width: '600px', paddingBottom: '20px', border: '1px solid red' }}>
            <h3>father:</h3> 
            <p>
                react的state是可以修改，props是不让修改的，为什么要这么做呢，还不理解 ,,ԾㅂԾ,, <br/>
                但是我现在就是想要修改props, 因为这样的场景很多：父组件传递下来的props不满足要求，往往需要修改
            </p>
            <input value={inputValue} onChange={this.changeInputValue}/>
            state:  inputValue -- {inputValue}  <br/>

            <input value={objValue.name} onChange={this.changeObjValue}/>
            state:  objValue -- {JSON.stringify(objValue)}  <br/>

            <Son1 inputValue={inputValue} objValue={objValue} />

            <Son2 inputValue={inputValue} objValue={objValue} 
                changeInputValue={this.changeInputValue} changeObjValue={this.changeObjValue} />
        </div>    
    }
    
}


class Son1 extends React.Component {
    constructor(props){
        super();
        this.state = {flag: true};
    }

    changeInputProps = (e)=> {
        this.props.inputValue = e.target.value;
    }

    changeObjProps = (e)=> {
        console.log(e.target.value);
        let objValue = this.props.objValue;
        objValue.name = e.target.value;
        console.log(objValue);
        this.setState({flag: true});
    }

    render() {
        const {inputValue, objValue} = this.props;

        return <div style={{border: '1px solid green', marginTop: '20px'}}>
            <h3>Son1: </h3>
            <p>
                只要props是对象，不改对象指针，只修改对象里面的内容, 照样能修改props, O(∩_∩)O
                <br/> 但是注意：在change props后，一定要假装在setState, 引发render
            </p>

            <input value={inputValue} onChange={this.changeInputProps}/>
            props:  inputValue -- {inputValue}  <br/>

            <input value={objValue.name} onChange={this.changeObjProps}/>
            props:  objValue -- {JSON.stringify(objValue)}  <br/>
        </div>;
    }
 }


 class Son2 extends React.Component {
    changeObjProps = (e)=> {
        this.props.changeObjValue(e);
    }

    render() {
        const {inputValue, objValue} = this.props;

        return <div style={{border: '1px solid green', marginTop: '20px'}}>
            <h3>Son2: </h3>
            <p>
                1. 父组件传递修改方法下来，子组件中调用父组件方法，修改的实际是父组件的state <br/>
                2. 父组件state修改了，
            </p>

            <input value={inputValue} onChange={(e)=>this.props.changeInputValue(e)}/>
            props:  inputValue -- {inputValue}  <br/>

            <input value={objValue.name} onChange={this.changeObjProps}/>
            props:  objValue -- {JSON.stringify(objValue)}  <br/>
        </div>;
    }
 }

 