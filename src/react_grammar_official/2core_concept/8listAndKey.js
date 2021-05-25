/**
 * 如何通过map渲染组件，不想要console的warning，那就设置key吧
 * 感觉map是很简洁，但是我还是不想滥用，用多了，层级太多了，代码可读性好差
 * 
 * author: shujun
 * date: 2020-08-15
 * 
 */
import React from 'react';


/**
 * Warning: Each child in a list should have a unique "key" prop
 */
export function RenderList(props) {
    // console.log("key是关键词，子组件拿不到：" + props.key);
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map( number => 
        <li>{number}</li>
    );
    return doubled;
}

export function ListAndKey() {
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map( (number, key) => {
        // 1. Only do this if items have no stable IDs
        console.log("key: ", key);
        return (
            // 2. key should be set in the outer, near map 
            <ul key={key}>
                {number}

                {/* 3.1 key is nouseful to set here */}
                {/* <li key={key}>number*2</li> */}

                {/* 3.2 key是关键词，子组件拿不到： */}
                {/* <RenderList key={key} /> */}
            </ul>
        );
        
    });
    return doubled;
}