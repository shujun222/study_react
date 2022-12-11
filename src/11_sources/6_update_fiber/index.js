
// 没起效果？ 难道babel自动编译，不需要引入react了？
import React from "./react";

// import ReactDOM from 'react-dom'
import ReactDOM from './react-dom'


let style = { color: 'green', border: '1px solid red', padding: '10px', margin: '5px' }

let element = (
    <div style={style} key="A">
        A1 TEXT
        <div style={style} key="B1">
            B1 TEXT
            <div style={style} key="C1">C1 TEXT</div>
            <div style={style} key="C2">C2 TEXT</div>
        </div>
        <div style={style} key="B2">B2 TEXT</div>
    </div>
)

console.log("react visual dom", element);

element = React.createElement("div", {
    style: style,
    key: "A"
}, "A1 TEXT",

    React.createElement("div", {
        style: style,
        key: "B1"
    }, "B1 TEXT", React.createElement("div", {
        style: style,
        key: "C1"
    }, "C1 TEXT"), React.createElement("div", {
        style: style,
        key: "C2"
    }, "C2 TEXT")),

    React.createElement("div", {
        style: style,
        key: "B2"
    }, "B2 TEXT"));


console.log("my visual dom: ", element);
console.log("");
let root = document.getElementById("root")

ReactDOM.render(element, root)


// 2. 比原来只做了更新
document.getElementById("render2").onclick = function () {
    let element = (
        <div style={style} key="A">
            A1 TEXT - new
            <div style={style} key="B1">
                B1 TEXT - new
                <div style={style} key="C1">C1 TEXT - new</div>
                <div style={style} key="C2">C2 TEXT</div>
            </div>
            <div style={style} key="B2">B3 TEXT - new</div>
        </div>
    )
    console.log("react visual dom", element);

    element = React.createElement("div", {
        style: style,
        key: "A"
    }, "A1 TEXT - new", React.createElement("div", {
        style: style,
        key: "B1"
    }, "B1 TEXT - new", React.createElement("div", {
        style: style,
        key: "C1"
    }, "C1 TEXT - new"), React.createElement("div", {
        style: style,
        key: "C2"
    }, "C2 TEXT")), React.createElement("div", {
        style: style,
        key: "B2"
    }, "B3 TEXT - new"));;

    console.log("my visual dom: ", element);
    console.log("");
    ReactDOM.render(element, root)
}

// 3. 做了更新、删除、新增
document.getElementById("render3").onclick = function () {
    let element = (
        <div style={style} key="A">
            A1 TEXT - new3
            <div style={style} key="B1">
                B1 TEXT - new3
                <div style={style} key="C1">C1 TEXT</div>
            </div>
            <div style={style} key="B2">B2 TEXT</div>
        </div>
    )
    console.log("react visual dom", element);

    element = React.createElement("div", {
        style: style,
        key: "A"
    }, "A1 TEXT - new3", React.createElement("div", {
        style: style,
        key: "B1"
    }, "B1 TEXT - new3", React.createElement("div", {
        style: style,
        key: "C1"
    }, "C1 TEXT")), React.createElement("div", {
        style: style,
        key: "B2"
    }, "B2 TEXT"), React.createElement("div", {
        style: style,
        key: "B3"
    }, "B3 TEXT - new3"));

    console.log("my visual dom: ", element);
    console.log("");
    ReactDOM.render(element, root)
}


