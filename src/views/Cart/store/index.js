// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** axios 
import axios from 'axios'

const URL = 'http://localhost:8090/api/v1/cart'

export const addCart = createAsyncThunk(
  'cart/add', 
  async (_, {getState}) => {

    const stateCart = getState().cart

    let client 

    if(stateCart.newClient) {
      client = {
        newClient: true,
        id: stateCart.client.id,
        name: stateCart.client.name,
        phone:stateCart.client.phone,
        city: stateCart.client.city
      }
    } else {
      client = {
        newClient: false,
        id: stateCart.client.selectedClient.id,
        name: stateCart.client.selectedClient.name,
      }
    }

    let cart = {
      ...getState().cart.cartInfo,
      items: getState().cart.items,
      client: client
    }
    console.log(cart)
    const response = await axios.post(`${URL}/add`, cart)
    console.log(response)
})

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
