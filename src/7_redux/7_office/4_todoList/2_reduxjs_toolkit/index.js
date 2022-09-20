import React from 'react'
import '../common/index.css'
import '../common/primitiveui.css'
import { Provider } from 'react-redux'
import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'
import Footer from './features/footer/Footer'
import store from './store'

import { fetchTodos } from './features/todos/todosSlice'

store.dispatch(fetchTodos())


export default function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <nav>
                    <section>
                        <h1>Redux Fundamentals Example</h1>
                    </section>
                </nav>
                <main>
                    <section className="medium-container">
                        <h2>Todos</h2>
                        <div className="todoapp">
                            <Header />
                            <TodoList />
                            <Footer />
                        </div>
                    </section>
                </main>
            </div>

        </Provider>

    )
}
