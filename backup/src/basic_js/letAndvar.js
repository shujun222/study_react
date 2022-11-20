data = [
    {a:1, value: {a:1, b:2}},
    {a:2, value: {a:2, b:2}},
    {a:3, value: {a:3, b:2}}
]

index = 1;

// 1. 我的做法  data?.[index]?.value
let value = data[index].value
console.log("1", value);


// 2. for of
function getDataByIndex(data, index) {
    for (const [i, ele] of data.entries()) {
        if (i == index) {
            return ele.value
        }
    }
}
console.log("2", getDataByIndex(data, index));
