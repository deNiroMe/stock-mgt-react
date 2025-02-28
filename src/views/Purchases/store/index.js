// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** axios 
import axios from 'axios'

const URL = 'http://localhost:8090/api/v1/purchases'

export const find = createAsyncThunk(
  'purchases/find', 
  async (id) => {  
    const response = await axios.get(`${URL}/${id}`)
    let purchase = response.data
    return {
      purchase: purchase
    } 
})

export const add = createAsyncThunk(
  'purchases/add', 
  async (purchases, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/add`, purchases)
      dispatch(getAllData())
      return {
        purchases: response.purchase,
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
  'purchases/getAllData', 
  async () => {
    const response = await axios.get(`${URL}`)
    return {
      purchases: response.data,
      filteredPurchases: response.data,
      total: response.data.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'purchases/getPaginatedData', 
  async (config, { getState }) => {
    const purchases = getState().purchases.purchases
    const {
      q = '',
      page = 1,
      perPage = 10,
      sort = 'desc',
      sortColumn = 'reference'
    } = config

    const queryLowered = q.toLowerCase()
    const dataAsc = [...purchases].sort((a, b) => {
      return (a[sortColumn] < b[sortColumn] ? -1 : 1)
    })

    let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
    let filteredData = dataToFilter.filter(
      p => p.reference.toLowerCase().includes(queryLowered)
    )
    let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
    
    return {
      total: purchases.length,
      filteredPurchases: paginateArray,
      params: config
    }  
})

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState: {
    purchases: [],
    filteredPurchases: [],
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
        state.filteredPurchases = action.payload.filteredPurchases
        state.total = action.payload.total
      })
      .addCase(add.fulfilled, (state, action) => {
        state.purchases = action.payload.purchases
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.filteredPurchases = action.payload.filteredPurchases
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(find.fulfilled, (state, action) => {
        state.purchase = action.payload.purchase
      })
  }
})

export default purchasesSlice.reducer
