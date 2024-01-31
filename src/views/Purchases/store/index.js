// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { data } from '../data/data'

export const find = createAsyncThunk(
  'purchases/find', 
  async (id) => {    
    let purchase = data.purchases.find(c => c.id == id)
    console.log(purchase)
    return {
      purchase: purchase
    }
})

export const add = createAsyncThunk(
  'purchases/add', 
  async (order) => {
    let array = [...data.purchases]
    array.push(order)
    data.purchases = [...array]
    return {
      purchases: array
    }
})


export const getAllData = createAsyncThunk(
  'purchases/getAllData', 
  async () => {
    return { 
      purchases: data.purchases, 
      total: data.purchases.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'purchases/getPaginatedData', 
  async (config) => { 
        
      const {
        q = '',
        page = 1,
        perPage = 10,
        sort = 'asc',
        sortColumn = 'name'
      } = config      
      
      const queryLowered = q.toLowerCase()  

      const dataAsc = [...data.purchases].sort((a, b) => {
        return (a[sortColumn] < b[sortColumn] ? -1 : 1)
      })

      let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
      let filteredData = dataToFilter.filter(
        purchase => purchase.reference.toLowerCase().includes(queryLowered) 
      )
      
      let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
      
      return {
          total: filteredData.length,
          purchases: paginateArray
        }    
})

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState: {
    purchases: [],
    purchase: {
      supplier: {},
      salesPerson: {}
    },
    params: {},
    total: 1
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.purchases = action.payload.purchases
        state.total = action.payload.total
      })
      .addCase(add.fulfilled, (state, action) => {
        state.purchases = action.payload.purchases
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.purchases = action.payload.purchases
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(find.fulfilled, (state, action) => {
        state.purchase = action.payload.purchase
      })
  }
})

export default purchasesSlice.reducer
