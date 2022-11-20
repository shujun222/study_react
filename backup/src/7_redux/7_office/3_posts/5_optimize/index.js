import React from 'react'
import { Provider } from 'react-redux'
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
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { AddPostForm } from './features/posts/AddPostForm'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { NotificationsList } from './features/notifications/NotificationsList'

import store from './store'
import { fetchUser } from './features/users/usersSlice'

function App() {
  store.dispatch(fetchUser())

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/"
              render={() => <>
                <AddPostForm />
                <PostsList />
              </>}
            />

            <Route exact path="/posts/:postId" component={SinglePostPage} />
            <Route exact path="/editPost/:postId" component={EditPostForm} />
            
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/users/:userId" component={UserPage} />

            <Route exact path="/notifications" component={NotificationsList} />

            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
