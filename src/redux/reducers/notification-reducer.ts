import { createSlice } from '@reduxjs/toolkit'
import { NotificationModel } from '../../models/notification.model'

export type Notifications = {
    items: NotificationModel[]
}

const initialState: Notifications = {
    items: []
}

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, actions) => {
        state.items = [actions.payload, ...state.items];
    },
    setNotification: (state, actions) => {
        state.items = actions.payload;
    }
  },
})

export const { addNotification, setNotification } = notificationSlice.actions

export default notificationSlice.reducer