https://www.bilibili.com/video/BV1a54y1b7XH?p=5&vd_source=10d355be19883e4a50b66949c50a67aa

diff算法: 根据老的fiber树和最新的jsx对比生成新的fiber树的过程

1. 只对同级节点进行对比，如果dom节点跨层级移动，react不会复用它
2. 不同类型的元素会产生不同的结构，会销毁老结构，创建新结构
3. 通过key标识移动的元素






具体算法过程：
1. 新的节点只有一个
1.1 key相同，type相同
<div>
    <h1 key="k1">h1</h1> <!-- 找到了，剩下的删除 -->
</div>
/******************/
<div>
    <h1 key="k1">h1-hahaha</h1>
</div>

新老节点都一样，复用老节点DOM元素，不新增内存空间了，逐个比较attribute & children content
h1.innerHTML = "h1-hahaha"

1.2 key相同，type不同
<div>
    <h1 key="k1">h1</h1>  <!-- 标记为删除, 后面都不比较了，全部删掉 -->
    ...                   
    ... 
</div>
/******************/
<div>
    <h2 key="k1">h2</h2>
</div>

1.3 key不同，删掉，继续往下找(key && type)一致的
例子0：
<div>
    <h1>h1</h1>
</div>
/******************/
<div>
    <h2>h1</h2>
</div>

例子1：
<div>
    <h1 key="k1">h1</h1>
</div>
/******************/
<div>
    <h1 key="k2">h1</h1>
</div>

type, key不一样，都认为不能复用，
a. 老的fiber节点就相当于废弃了，标记为删除操作
b. 创建新的fiber节点，标记为插入
c. commit阶段
   div1.removeChild("h1")
   div1.appendChild("h2")

例子2：
<div>
    <h1 key="k1">h1</h1>  <!-- 标记为删除 -->
    <h2 key="k2">h2</h2>  <!-- 复用 -->
    ...                   <!-- 标记为删除 -->
    ... 
</div>
/******************/
<div>
    <h2 key="k2">h2</h2>
</div>
 

2. 新的节点有多个
经过两轮遍历
a. 处理更新。update 属性和类型type。
   假设前面不变的更多，1-100个元素，假设前面60个都是没变，先标记前面的60个，再对后续40个构建map并处理第二步
b. 处理新增、删除、移动
   移动时尽量少量移动，必须有一个要动，新地位高的不动，新地位低的动

<!-- 1. fiber节点 -->
<ul>
    <li key="A">A</li>
    <li key="B">B</li>
    <li key="C">C</li>
    <li key="D">D</li>
</ul>
/*****************************/
 <!-- JSX节点 -->
<ul>
    <div key="A">A-new</div>
    <li key="B">B2</li>
    <li key="C">C</li>
    <li key="D">D</li>
</ul>
删除老li A
插入div A
更新B 更新C 更新D





 





