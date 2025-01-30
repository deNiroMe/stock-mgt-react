// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** axios 
import axios from 'axios'

const URL = 'http://localhost:8090/api/v1'

export const getOperations = createAsyncThunk(
  'operations/getOperations',
  async () => {
    const response = await axios.get(`${URL}/operations`)
    const sales = response.data.filter(item => item.type == 'SALE')
    const purchases = response.data.filter(item => item.type == 'PURCHASE')
    return {
      sales: sales,
      purchases: purchases,
      totalSales: sales.length,
      totalPurchases: purchases.length,
      filteredSales: sales.slice(0, 7),
      filteredPurchases: purchases.slice(0, 7)
    }
})


export const getPaginatedOperations = createAsyncThunk(
  'operations/getPaginatedOperations',
  async (config, { getState }) => {

    const state = getState().operations; // Get the current state of operations

    const {
      page = 1,
      perPage = 10,
      sort = 'asc',
      sortColumn = 'id',
      type = 'PURCHASE'
    } = config;

    let operations = type === 'SALE' ? state.sales : state.purchases;

    const dataAsc = [...operations].sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1));
    let dataToFilter = sort === 'asc' ? dataAsc : [...dataAsc].reverse();
    let paginateArray = dataToFilter.slice((page - 1) * perPage, page * perPage);

    return type === 'SALE'
      ? {
          sales: operations,
          totalSales: operations.length,
          filteredSales: paginateArray,
          purchases: state.purchases,
          totalPurchases: state.totalPurchases,
          filteredPurchases: state.filteredPurchases,
          params: config
        }
      : {
          purchases: operations,
          totalPurchases: operations.length,
          filteredPurchases: paginateArray,
          sales: state.sales,
          totalSales: state.totalSales,
          filteredSales: state.filteredSales,
          params: config
        };

  })



export const operationsSlice = createSlice({
  name: 'operations',
  initialState: {
    sales: [],
    purchases: [],
    filteredSales: [],
    filteredPurchases: [],
    totalPurchases: 1,
    totalSales: 1,
    params: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOperations.fulfilled, (state, action) => {
        state.sales = action.payload.sales
        state.purchases = action.payload.purchases
        state.totalSales = action.payload.totalSales
        state.filteredSales = action.payload.filteredSales
        state.totalPurchases = action.payload.totalPurchases
        state.filteredPurchases = action.payload.filteredPurchases
      })
      .addCase(getPaginatedOperations.fulfilled, (state, action) => {
        state.params = action.payload.params        
        state.purchases = action.payload.purchases 
        state.totalSales = action.payload.totalSales
        state.filteredSales = action.payload.filteredSales
        state.totalPurchases = action.payload.totalPurchases
        state.filteredPurchases = action.payload.filteredPurchases
      })
  }
})

export default operationsSlice.reducer
