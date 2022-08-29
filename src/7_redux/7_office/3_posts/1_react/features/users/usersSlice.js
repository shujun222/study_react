import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
  let response = await axios.get("http://localhost:3006/fakeApi/users")
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // 这样是不起效果的, 为什么呢？
      // state = action.payload
      // state = state.concat(action.payload)

      return action.payload
    })
  }
})

export default usersSlice.reducer

