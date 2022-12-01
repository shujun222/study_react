虚拟DOM:
1. 是什么
   bebal会将jsx转为React.createElement, 这个函数返回的一个json对象，树形结构，这就是虚拟dom
2. react为什么要引入虚拟dom
   a. 提高性能：大量更新dom操作费性能，全部在visual dom中搞好，一次更新多high呀
   b. 防止xxs跨站攻击：不让直接操作dom就好，虚拟dom里面会进行转义
   c. 跨平台：react, react-dom是分开的，react负值解析和构建，react-dom负责渲染到页面，不同平台替换掉react-dom就好
3. 优势：上面那个引入原因
   劣势：
        a. 不能极致优化
        b. 占用内存
        c. 遍历数得递归，所以又有了fiber结构
  