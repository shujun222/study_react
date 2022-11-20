import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchNotifications, selectAllNotifications } from '../../5_optimize/features/notifications/notificationsSlice'


export const Navbar = () => {
  const dispatch = useDispatch()

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  // 显示未读条数
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter(n => !n.read).length
  let unreadNotificationsBadge = (
    numUnreadNotifications > 0 && 
    <span className="badge">{numUnreadNotifications}</span>
  )

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">帖子列表</Link>
            <Link to="/users">用户列表</Link>
            <Link to="/notifications">Notifications</Link>
          </div>
          
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications {unreadNotificationsBadge}
          </button>
        </div>
      </section>
    </nav>
  )
}
