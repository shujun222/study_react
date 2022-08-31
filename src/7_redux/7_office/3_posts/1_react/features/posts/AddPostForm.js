import axios from 'axios'
import React, { useState } from 'react'

export const AddPostForm = ({userData=[], addNewPost}) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle"

  const onSavePostClicked = async() => {
    if (canSave) {

      try {
        setAddRequestStatus('pending')
        let postBody = {title, content, user: userId}

        let response = await axios.post('http://localhost:3006/fakeApi/addNewPost'
            , postBody);
        response = response.data

        // const response = await fetch('http://localhost:3006/fakeApi/addNewPost', {
        //   method: 'post',
        //   body: JSON.stringify(postBody),
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // }).then(response => response.json())


        addNewPost(response)

        setTitle('')
        setUserId('')
        setContent('')
      } catch (error) {
        // catch不住addNewPost网络错误呀
        alert(222)
        console.error('Failed to save the post: ', error)
      } finally {
        setAddRequestStatus('idle')
      }
      
    }
  }

  const usersOptions = userData.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>添加新帖子</h2>
      <form>
        <label htmlFor="postTitle">帖子标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            保存帖子
        </button>

      </form>
    </section>
  )
}

