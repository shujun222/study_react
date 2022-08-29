import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { Spinner } from '../../../common/components/Spinner'


export const PostsList = () => {
  const postStatus = useSelector(state => state.posts.status)
  const dispatch = useDispatch()

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const posts = useSelector(state => selectAllPosts(state))
  const error = useSelector(state => state.posts.error)


  let content;
  if (postStatus === 'loading') {
    content = <Spinner text='loading' />
  } else if (postStatus === 'succeeded') {
    // hook不能放在条件语句中
    // const posts = useSelector(state => selectAllPosts(state))
    content = <PostExcerpt posts={posts} />
  } else if (postStatus === 'failed') {
    // const error = useSelector(state => state.posts.error)
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

function PostExcerpt({ posts }) {
  // 从configureStore中取出来的数据属于Immer, 让state成为不可变
  // const orderedPosts = posts.sort((a, b) => b.date.localeCompare(a.date))

  // 根据日期时间字符串，对帖子安装时间倒序进行排序
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return renderedPosts
}