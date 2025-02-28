// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** axios 
import axios from 'axios'

const URL = 'http://localhost:8090/api/v1/payments'

export const find = createAsyncThunk(
  'payments/find', 
  async (id) => {   
    const response = await axios.get(`${URL}/${id}`)
    let payment = response.data
    return {
      payment: payment
    } 
})

export const add = createAsyncThunk(
  'payments/add', 
  async (payment, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/add`, payment)
      dispatch(getAllData())
      return {
        payment: response.data,
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
  'payments/getAllData', 
  async () => {
    const response = await axios.get(`${URL}`)
    return {
      payments: response.data,
      filteredPayments: response.data,
      total: response.data.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'payments/getPaginatedData', 
  async (config, { getState }) => {  
          
    const payments = getState().payments.payments
    const {
      q = '',
      page = 1,
      perPage = 10,
      sort = 'desc',
      sortColumn = 'reference'
    } = config
    
    const queryLowered = q.toLowerCase()
    const dataAsc = [...payments].sort((a, b) => {
      return (a[sortColumn] < b[sortColumn] ? -1 : 1)
    })

    let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
    let filteredData = dataToFilter.filter(
      payment => payment.reference.toLowerCase().includes(queryLowered)
    )
    let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
    return {
      total: payments.length,
      filteredPayments: paginateArray,
      params: config
    }    
})

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [],
    filteredPayments: [],
    payment: {},
    params: {},
    total: 1
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.payments = action.payload.payments
        state.filteredPayments = action.payload.filteredPayments
        state.total = action.payload.total
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.filteredPayments = action.payload.filteredPayments
        state.total = action.payload.total
        state.params = action.payload.params
      })       
      .addCase(find.fulfilled, (state, action) => {
        state.payment = action.payload.payment
      })   
      .addCase(add.fulfilled, (state, action) => {
        state.payment = action.payload.payment
      })
  }
})

export default paymentsSlice.reducer
