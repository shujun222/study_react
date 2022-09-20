import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { fetchPosts, selectPostById, selectPostIds } from './postsSlice'
import { Spinner } from '../../../common/components/Spinner'


export const PostsList = () => {
  const postStatus = useSelector(state => state.posts.status)
  const dispatch = useDispatch()

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const error = useSelector(state => state.posts.error)
  const orderedPostIds = useSelector(selectPostIds)
  console.log("orderedPostIds", orderedPostIds);

  // 如果打开这一句，整个posts肯定是被改变了的，那么PostList必定会重写渲染
  // const posts = useSelector(state => state.posts)

  let content;
  if (postStatus === 'loading') {
    content = <Spinner text='loading' />
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map(postId => <PostExcerpt key={postId} postId={postId}/>)
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


// 一个帖子点赞，只更新当前帖子，不想让其它帖子一起更新
// 1. React.memo()
// eslint-disable-next-line
let PostExcerpt2 = ({ post }) => (
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
)

// eslint-disable-next-line
PostExcerpt2 = React.memo(PostExcerpt2)


// 2. 只传入id
let PostExcerpt = ({ postId }) =>  {
  // console.log("postId", postId);
  const post = useSelector(state => selectPostById(state, postId))
  return (
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
  )
}
