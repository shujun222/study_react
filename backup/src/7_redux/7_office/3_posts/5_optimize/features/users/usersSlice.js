import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'axios'

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
  let response = await axios.get("http://localhost:3006/fakeApi/users")
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled]: usersAdapter.setAll
  }

  // extraReducers(builder) {
  //   builder.addCase(fetchUser.fulfilled, (state, action) => {
  //     return action.payload
  //   })
  // }
})

export default usersSlice.reducer

// export const selectAllUsers = state => state.users
// export const selectUserById = (state, userId) =>
//   state.users.find(user => user.id === userId)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users)
