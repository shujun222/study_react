import React from 'react'
import { Link } from 'react-router-dom'
import {ReactionButtons} from './ReactionButtons'

export const SinglePostPage = ({ match, location }) => {
  const { postId } = match.params
  console.log("postId", postId);
  console.log("location", location);
  const {reactionAdded, postUpdated, state: post} = location

  if (!post) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} reactionAdded={reactionAdded} />
        <Link to={{pathname:`/editPost/${post.id}`, state: post, reactionAdded, postUpdated}} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}