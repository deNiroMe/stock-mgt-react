// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** axios 
import axios from 'axios'

const URL = 'http://localhost:8090/api/v1/sales'

export const find = createAsyncThunk(
  'invoices/find', 
  async (id) => {   
    const response = await axios.get(`${URL}/${id}`)
    let invoice = response.data
    return {
      invoice: invoice
    } 
})

export const add = createAsyncThunk(
  'invoices/add', 
  async (order, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/add`, order)
      dispatch(getAllData())
      return {
        order: response.order,
        showError: false
      }
    } catch (e) {
      return rejectWithValue({
        errors: e.response.data,
        showError: true
      })
    }
})


export const getAllData = createAsyncThunk(
  'invoices/getAllData', 
  async () => {
    const response = await axios.get(`${URL}`)
    return {
      invoices: response.data,
      filteredInvoices: response.data,
      total: response.data.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'invoices/getPaginatedData', 
  async (config, { getState }) => {
    const orders = getState().invoices.invoices
    const {
      q = '',
      page = 1,
      perPage = 10,
      sort = 'desc',
      sortColumn = 'reference'
    } = config

    const queryLowered = q.toLowerCase()
    const dataAsc = [...orders].sort((a, b) => {
      return (a[sortColumn] < b[sortColumn] ? -1 : 1)
    })

    let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
    let filteredData = dataToFilter.filter(
      order => order.reference.toLowerCase().includes(queryLowered)
    )
    let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
    
    return {
      total: orders.length,
      filteredInvoices: paginateArray,
      params: config
    }   
})

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices: [],
    filteredInvoices:[],
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
        state.total = action.payload.total,
        state.filteredInvoices = action.payload.filteredInvoices
      })
      .addCase(add.fulfilled, (state, action) => {
        state.invoices = action.payload.invoices
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.filteredInvoices = action.payload.filteredInvoices
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(find.fulfilled, (state, action) => {
        state.invoice = action.payload.invoice
      })
  }
})

export default invoicesSlice.reducer
