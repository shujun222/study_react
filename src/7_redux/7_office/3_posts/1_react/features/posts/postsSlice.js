import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const posts = []

const initialState = {
    posts,
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts222/fetchPosts', async () => {
    const response = await axios.get('http://localhost:3006/fakeApi/posts')
    return response.data
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    // The payload creator receives the partial `{title, content, user}` object
    async initialPost => {
        const response = await axios.post('http://localhost:3006/fakeApi/addNewPost', initialPost)
        return response.data
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            let post = state.posts.find(p => p.id === id)
            post.title = title
            post.content = content
        },

        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },

    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                console.log("fulfilled", state, action);
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                console.log("rejected", state, action);
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
    }
})

export const { postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)
