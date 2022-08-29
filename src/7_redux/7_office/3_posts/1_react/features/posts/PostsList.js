import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { Spinner } from '../../../common/components/Spinner'


export const PostsList = () => {
  const postStatus = ''

  useEffect(() => {
    if (postStatus === 'idle') {

    }
  }, [postStatus])

  const posts = ''
  const error = ''


  let content;
  if (postStatus === 'loading') {
    content = <Spinner text='loading' />
  } else if (postStatus === 'succeeded') {
    content = <PostExcerpt posts={posts} />
  } else if (postStatus === 'failed') {
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