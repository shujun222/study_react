import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const EditPostForm = ({ match, location }) => {
  const { postId } = match.params
  console.log("postId", postId);
  const {reactionAdded, postUpdated, state: post} = location

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const history = useHistory()

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      postUpdated({ id: postId, title, content })
      
      history.push({
        pathname: `/posts/${postId}`,
        state: post,
        reactionAdded,
        postUpdated
      })
    }
  }

  return (
    <section>
      <h2>编辑帖子</h2>
      <form>
        <label htmlFor="postTitle">帖子标题：</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        保存帖子
      </button>
    </section>
  )
}
