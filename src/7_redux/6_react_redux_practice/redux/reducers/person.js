const initData = [{id: 1, name:"jaychou", age:40}]
export default function person(preState=initData, action) {
    const {type, data} = action
    switch (type) {
        case "add":
            return [data, ...preState];
        default:
            return preState;
    }
}