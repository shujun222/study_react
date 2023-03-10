import React from 'react'
import { useDispatch } from 'react-redux'

import { reactionAdded } from './postsSlice'

const reactionEmoji = {
  thumbsUp: 'ð',
  hooray: 'ð',
  heart: 'â¤ï¸',
  rocket: 'ð',
  eyes: 'ð'
}

export const ReactionButtons = ({ post }) => {
  // ç´æ¥ä¿®æ¹stateä¸è¡å¦ï¼ Cannot assign to read only property 'title' of object '#<Object>'
  // post.title = "sbjun"

  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}