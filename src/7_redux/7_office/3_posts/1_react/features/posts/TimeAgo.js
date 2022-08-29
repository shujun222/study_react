import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const timePeriod = formatDistanceToNow(parseISO(timestamp))
    timeAgo = ` ${timePeriod} ago`
  }

  return <span title={timestamp}><i>{timeAgo}</i></span>
  
}
