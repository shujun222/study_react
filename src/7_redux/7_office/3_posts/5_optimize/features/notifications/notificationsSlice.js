import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
        const allNotifications = selectAllNotifications(getState())
        console.log("allNotifications", allNotifications);
        // get0厉害了，还能这么取的呢
        const [latestNotification] = allNotifications
        console.log("latestNotification", latestNotification);

        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const response = await axios.get(`http://localhost:3006/fakeApi/notifications?since=${latestTimestamp}`)
        console.log("resposne", response.data);
        return response.data
    }
)

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const notificationsSlice = createSlice({
    name: 'notifications',
    // initialState: [],
    // 性能优化替换
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        allNotificationsRead(state, action) {
            // state.forEach(notification => {
            //     notification.read = true
            //     notification.isNew = false
            // })
            
            // 性能优化替换
            Object.values(state.entities).forEach(notification => {
                notification.read = true
            })
        }
    },

    // extraReducers: {
    //     [fetchNotifications.fulfilled]: (state, action) => {
    //         const lastNotifications = action.payload.map(notification => ({
    //             ...notification,
    //             read: false,
    //             isNew: true,
    //         }))

    //         // state.forEach(notification => {
    //         //     // Any notifications we've read are no longer new
    //         //     notification.isNew = !notification.read
    //         // })

    //         state.push(...lastNotifications)
    //         // Sort with newest first
    //         state.sort((a, b) => b.date.localeCompare(a.date))
    //     }
    // }

    // 性能优化替换
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            // Add client-side metadata for tracking new notifications
            const notificationsWithMetadata = action.payload.map(notification => ({
                ...notification,
                read: false,  // 在NotificationList页面触发allNotificationsRead更改
                isNew: true, // 显示颜色用的，isNew: 浅绿色
            }))

            // 更新原来的为 isNew: false
            Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read
            })

            notificationsAdapter.upsertMany(state, notificationsWithMetadata)
        }
    },

})

export default notificationsSlice.reducer

export const { allNotificationsRead } = notificationsSlice.actions


// 性能优化替换
export const {
    selectAll: selectAllNotifications,
  } = notificationsAdapter.getSelectors((state) => state.notifications)


