import { createSlice } from '@reduxjs/toolkit'
import { getCartLocalStorage } from '../../utils/cart-handle'
import { CartItemModel } from '../../models/cart-item.model'

export type Cart = {
    items: CartItemModel[]
}

const initialState: Cart = {
    items: getCartLocalStorage()
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartState: (state) => {
        state.items = getCartLocalStorage();
    }
  },
})

export const { updateCartState } = cartSlice.actions

export default cartSlice.reducer