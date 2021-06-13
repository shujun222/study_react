/**
 * 1. js判断对象的好方法 
 * 2. 判断是否为json格式化数据
 * 
 * Author: shujun
 * Date: 2020-8-09
 */

import {print} from './utils';


/**
 * 1. js判断对象的好方法; 基本类型就用typeof
 * // 根据typeof判断对象也不太准确
表达式	                      返回值
typeof undefined	       'undefined'
typeof null	               'object'            需要注意的
typeof true	               'boolean'
typeof 123	               'number'
typeof "abc"	           'string'
typeof function() {}	   'function'
typeof {}	               'object'                     需要区别的
typeof []	               'object'                     需要区别的
tpyeof ""                  'string'            需要注意的

 * @param {*} a 
 */
export function tellType(a){
    print(a);
    print("typeof: ", typeof a);
    // typeof写的不好呀，object 和 array都返回 ‘object’, 还需要再判断
    if ("object" === typeof a) {
        if (Array.isArray(a)) {
            print("is array")
        } else {
            print("is object");
        }
    }
    return typeof a;
}


// tellType("shujun");
// print(tellType(123) === "number");
// tellType({"a": 2});
// tellType([1,2, 3]);


// 2. 判断是否为json格式化数据
function testJson(str) {
    try {
        let jsonObj = JSON.parse(str);
        print("jsonObj tpyeof: ", typeof jsonObj);
        if ("string" === typeof str && "object" === typeof jsonObj) {
            return true;
        }
    } catch (error) {
        print(error);
    }
    return false; 

    
}

print(testJson('{"a":1, "b":2}'));
print(testJson('[1, 2, 3]'));
print(testJson('[1, 2, 3],2'));
print(testJson(123));
print(testJson("123"));
print(testJson("null"));  //这里还是有bug，厉害，厉害
print(testJson(null));