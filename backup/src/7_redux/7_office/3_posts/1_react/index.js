import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import '../common/css/index.css'
import '../common/css/primitiveui.css'
import { Navbar } from '../common/components/Navbar'
import { PostsList } from './features/posts/PostsList'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { AddPostForm } from './features/posts/AddPostForm'

const initPosts = {
  posts: [],
  status: 'idle',
  error: null
}

function App() {
  // post全局数据
  const [postData, setPostData] = useState(initPosts)
  const[userData, setUserData] = useState([])

  useEffect(() => {
    setPostData({
      posts: [],
      status: 'loading',
      error: null
    })
    axios.get("http://localhost:3006/fakeApi/posts").then(response => {
      let data = {
        posts: response.data,
        status: 'succeeded',
        error: null
      }
      setPostData(data)
    })

    axios.get("http://localhost:3006/fakeApi/users").then(response => {
      setUserData(response.data)
    })

  }, [])

  function reactionAdded( postId, reaction ) {
    const existingPost = postData.posts.find(post => post.id === postId)
    if (existingPost) {
        existingPost.reactions[reaction]++
    }
    setPostData({...postData})
  }

  function addNewPost(post) {
    postData.posts.push(post)
    setPostData({...postData})
  }

  function postUpdated(newPost) {
    const { id, title, content } = newPost
    let oldPost = postData.posts.find(p => p.id === id)
    oldPost.title = title
    oldPost.content = content
    setPostData({...postData})
  }

  console.log("postData", postData);
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/"
            render={() => <>
              <AddPostForm userData={userData} addNewPost={addNewPost} />
              <PostsList {...postData} reactionAdded={reactionAdded} postUpdated={postUpdated} userData={userData} />
            </>}
          />

          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
