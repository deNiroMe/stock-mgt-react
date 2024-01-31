// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { data } from '../data/data'

export const getAllData = createAsyncThunk(
  'payments/getAllData', 
  async () => {
    return { 
      payments: data.payments, 
      total: data.payments.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'payments/getPaginatedData', 
  async (config) => { 
        
      const {
        q = '',
        page = 1,
        perPage = 10,
        sort = 'asc',
        sortColumn = 'name'
      } = config      
      
      const queryLowered = q.toLowerCase()  

      const dataAsc = [...data.payments].sort((a, b) => {
        return (a[sortColumn] < b[sortColumn] ? -1 : 1)
      })

      let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
      let filteredData = dataToFilter.filter(
        invoice => invoice.reference.toLowerCase().includes(queryLowered) 
      )
      let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
      
      return {
          total: filteredData.length,
          payments: paginateArray
        }    
})

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [],
    invoice: {},
    params: {},
    total: 1
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.payments = action.payload.payments
        state.total = action.payload.total
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.payments = action.payload.payments
        state.total = action.payload.total
        state.params = action.payload.params
      })
  }
})

export default paymentsSlice.reducer
