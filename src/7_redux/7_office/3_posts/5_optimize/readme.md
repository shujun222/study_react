https://cn.redux.js.org/tutorials/essentials/part-6-performance-normalization

这章节还是比较复杂的
1. 新增用户列表，用户post列表
2. 新增通知列表

关键来了
3. postsSlice.js中
   selectPostsByUser = (posts, userId) => posts.filter(post => post.user === userId)
   filter必定会产生新数组吧，一定会引发不必要的重写渲染，即便没改动
   例如：即便是刷新通知，导致所有useSelector全部运行，UserPage引用了selectPostsByUser，也受到影响

   引入记忆型selector: createSelector

4. 为了性能优化，如果我们可以使用map，很多地方o(n)的效率能成为o(1)
   {
  users: {
    ids: ["user1", "user2", "user3"],
    entities: {
        "user1": {id: "user1", firstName, lastName},
        "user2": {id: "user2", firstName, lastName},
        "user3": {id: "user3", firstName, lastName},
        }
    }
   }

   幸运的是，这个也无需手写，createEntityAdapter可以帮助我们完成。

   
   