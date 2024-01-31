// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    supplier: {},
    cartInfo: {}
  },
  reducers: {
    addItem: (state, action) => {
      console.log(action.payload)
      state.items.push(action.payload)
    },
    setSupplier: (state, action) => {
      console.log(action.payload)
      state.supplier = action.payload
    },
    addCartDetails: (state, action) => {
      console.log(action.payload)
      state.cartInfo  = action.payload
    }
  }
})

export const {
  addItem,
  setSupplier,
  addCartDetails
} = cartSlice.actions

export default cartSlice.reducer
