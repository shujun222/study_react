import React from 'react'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../../common/components/Spinner'


export const PostsList = ({status, posts, error, reactionAdded, postUpdated, userData}) => {
  let content;
  if (status === 'loading') {
    content = <Spinner text='loading' />
  } else if (status === 'succeeded') {
    content = <PostExcerpt posts={posts} reactionAdded={reactionAdded} postUpdated={postUpdated} userData={userData} />
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

function PostExcerpt({ posts, reactionAdded, postUpdated, userData }) {
  // 根据日期时间字符串，对帖子安装时间倒序进行排序
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} userData={userData} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} reactionAdded={reactionAdded} />

      <Link to={{pathname: `/posts/${post.id}`, state: post, reactionAdded, postUpdated }} 
        className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return renderedPosts
}