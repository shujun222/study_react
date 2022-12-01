https://www.bilibili.com/video/BV1a54y1b7XH?p=6&vd_source=10d355be19883e4a50b66949c50a67aa

1. react16
document捕获
原生捕获
原生冒泡

react捕获
react冒泡
documen冒泡


2. react17
1. react最外层事件不挂载在document上了，而是root
2. 顺序：
   document捕获
   react捕获
   原生捕获
   原生冒泡
   react冒泡
   document冒泡


问题：
1. 原生为什么是父级先捕获，再子级
   是 addEventListener事件的注册先后吗？

