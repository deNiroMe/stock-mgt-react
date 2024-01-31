// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { data } from '../data/data'

export const find = createAsyncThunk(
  'invoices/find', 
  async (id) => {    
    let invoice = data.invoices.find(c => c.id == id)
    return {
      invoice: invoice
    }
})

export const add = createAsyncThunk(
  'invoices/add', 
  async (order) => {
    let array = [...data.invoices]
    array.push(order)
    data.invoices = [...array]
    return {
      invoices: array
    }
})


export const getAllData = createAsyncThunk(
  'invoices/getAllData', 
  async () => {
    return { 
      invoices: data.invoices, 
      total: data.invoices.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'invoices/getPaginatedData', 
  async (config) => { 
        
      const {
        q = '',
        page = 1,
        perPage = 10,
        sort = 'asc',
        sortColumn = 'name'
      } = config      
      
      const queryLowered = q.toLowerCase()  

      const dataAsc = [...data.invoices].sort((a, b) => {
        return (a[sortColumn] < b[sortColumn] ? -1 : 1)
      })

      let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
      let filteredData = dataToFilter.filter(
        invoice => invoice.reference.toLowerCase().includes(queryLowered) 
      )
      
      let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
      
      return {
          total: filteredData.length,
          invoices: paginateArray
        }    
})

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices: [],
    invoice: {
      client: {},
      salesPerson: {}
    },
    params: {},
    total: 1
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.invoices = action.payload.invoices
        state.total = action.payload.total
      })
      .addCase(add.fulfilled, (state, action) => {
        state.invoices = action.payload.invoices
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.invoices = action.payload.invoices
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(find.fulfilled, (state, action) => {
        state.invoice = action.payload.invoice
      })
  }
})

export default invoicesSlice.reducer
