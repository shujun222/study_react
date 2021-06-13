//一个很奇怪的现象，js为啥搞这么多循环方式，五花八门
// 不过感觉只要掌握for && map就好， 比如while,foreach很没用呀
// for foreach while some every filter map
// 对比点：1. 如何退出循环 return && break
//        2. 每个函数的侧重点是干吗的
// author: shujun
// date: 2020-08-15
import {print} from './utils';


export function testCycle() {
    let array = [1, 2, 3, 4];
    print("我们来研究下怎么把数组内的元素值翻倍... 原始数组：" + array);

    // 1. for 循环
    print();
    print("1. for 循环");
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        // for 循环和java中一样，break, return是可以生效的
        // if (element === 2)
        //     break;
        // if (element === 2)
        //     return;
          
        // while循环
        array[index] = element * 2;
    }
    print("循环后：", array);

    array = [1, 2, 3, 4];
    print();
    print("2. foreach其实就像map的阉割版。不过虽然可以结果赋值，但是没用，返回值是undefined。");
    print("可以return，不过作用类似与for里面的continue; break直接报错");
    const aa = array.forEach(element => {
        if (element === 1) {
            return 333;
        }
        print(element);
        return element*2;
    });
    print("循环后：", aa);

    print();
    print("3 while循环就不写了，太熟悉了，和for差不多");
   
    print();
    print("4 非常常用的map，每个元素都执行，每个元素对应有返回值");
    array = [1, 2, 3, 4];
    const doubled = array.map(element => {
        //map里面怎么return都是没有退出的，
        if (element === 1) {
            return false;
            // break; // break是违法的
        }
        // map如果不写return, 那就是简单循环，走了个过程；
        // 如果写了return, 每个元素都是会执行的，不可能中途退出
        return element*2;
    });
    print("doubled: ", doubled);

    print();
    print("5. every的作用, 相比map没啥用吧，只返回true||false;");
    print(" 判断每个元素都要符合条件");
    array = [1, 2, 3, 4];
    let flag = array.every( element => {
        if (element === 2) {
            // 好像单个元素的判断是没用的，但是也不报错； break就直接报错了
            return true;
        }
        return element > 5;
    });
    print("flag: ", flag);

    print();
    print("6 some和every类似，返回boolean，只要有元素符合就true");
    flag = array.some( element => {
        if (element === 2) {
            // 但是，but; 此处单个元素的判断是有用的； break就直接报错了
            // return false;
            // break;
        }
        return element > 5;
    });
    print("flag: ", flag);

    print();
    print("7. filer作用，类似map返回元素集合，但是是符合条件的元素");
    array = [1, 2, 3, 4];
    const result = array.filter(element => {
        return element > 2;
    });
    print("filter result: ", result);




    return 666;
}
