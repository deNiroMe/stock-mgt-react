// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    client: {},
    cartInfo: {}
  },
  reducers: {
    addItem: (state, action) => {
      console.log(action.payload)
      state.items.push(action.payload)
    },
    setClient: (state, action) => {
      console.log(action.payload)
      state.client = action.payload
    },
    addCartDetails: (state, action) => {
      console.log(action.payload)
      state.cartInfo  = action.payload
    }
  }
})

export const {
  addItem,
  setClient,
  addCartDetails
} = cartSlice.actions

export default cartSlice.reducer
