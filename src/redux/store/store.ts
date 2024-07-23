import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../reducers/cart-reducer'
import notificationReducer from '../reducers/notification-reducer'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    notification: notificationReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch