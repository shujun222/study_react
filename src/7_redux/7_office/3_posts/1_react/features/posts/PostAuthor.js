import React from 'react'

export const PostAuthor = ({ userId, userData }) => {
  const author = userData.find(user => user.id === userId)

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
