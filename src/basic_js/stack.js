function swap(a, b) {
    a.push(3)
    [a, b] = [[222], [666]]
    console.log("inner", a, b);
}

// let a = 1, b = 2;
// swap(a, b)
// console.log(a, b);  // 1, 2

// let a1 = [666], b1 = [222]
// swap(a1, b1)
// console.log(a1, b1); // [666], [222]


// let a0 = [666]
// function setArray(a) {
//     a.push(3)
// }
// setArray(a0)
// console.log(a0); // [666, 3]




// 从factorial阶乘分析递归与尾递归
function factorial1(n) {
    if (n == 0) {
        return 1;
    } 

    return n * factorial1(n - 1);
}

function factorial(n) {
    let result = 1;
    for (let index = 2; index <= n; index++) {
        try {
            result = index * result
        } catch {
            console.log();
        }
    }
    return result;
}

const factorial2 = (n, total) =>{
    if (n == 0) {
        return total;
    } 

    return factorial2(n - 1, n * total);
}

// console.log(factorial1(5));
// console.log(factorial1(5, 1));
// console.log(factorial(5));

dict = {
    a: [1, 2, 4],
    b: [666, 22],
    c: [2]
}

const dictToArray = dict =>
  Object.keys(dict).map(name => dict[name])
  
console.log(dictToArray, dictToArray.name);
console.log(dictToArray(dict));

const dictToArray2 = Object.keys(dict);  
console.log(dictToArray2);