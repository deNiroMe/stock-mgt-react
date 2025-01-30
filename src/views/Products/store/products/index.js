// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** axios 
import axios from 'axios'

export const getAllData = createAsyncThunk(
  'products/getAllData', 
  async () => {
    const response = await axios.get('http://localhost:8090/api/v1/products')
    return { 
      products: response.data, 
      total: response.data.length,
      filteredTotal: response.data.length,
      filteredProducts: response.data.slice(0, 10)
    }
})

export const setElementToEdit = createAsyncThunk(
  'products/setElementToEdit', 
  async (productId, { getState }) => { 
    const products = getState().products.products
    let sidebarOpen = true
    let product = products.find(c => c.id == productId)
    if(product == null) {
      sidebarOpen = false
      toEditProduct =  {}
    }
    return {
      toEditProduct: product,
      sidebarOpen: sidebarOpen
    }
})

export const find = createAsyncThunk(
  'products/find', 
  async (id) => { 
    const response = await axios.get(`http://localhost:8090/api/v1/products/${id}`) 
    let product = response.data
    if(response.data.suppliers === undefined || response.data.suppliers === null){
      product.suppliers = []
    }
    return {
      selectedProduct: product
    }
})

export const edit = createAsyncThunk(
  'products/edit', 
  async (product, {dispatch, rejectWithValue}) => {
    try{
      const response = await axios.put(`http://localhost:8090/api/v1/products/edit`, product)
      dispatch(getAllData())
      return {
        product: response.data,
        toEditProduct: {},
        showError: false
      }
    }catch(e) {
      console.log(e)
      return rejectWithValue({
        errors:e.response.data,
        showError: true
      })
    }
})

export const add = createAsyncThunk(
  'products/add', 
  async (product, {dispatch, rejectWithValue}) => {
    try{
      const response = await axios.post(`http://localhost:8090/api/v1/products/add`, product)
      dispatch(getAllData())
      return {
        product:response.data,
        showError: false
      }
    }catch(e) {
      return rejectWithValue({
        errors:e.response.data,
        showError: true
      })
    }
})

export const remove = createAsyncThunk(
  'products/remove', 
  async (productId, {dispatch, rejectWithValue}) => {
    try{
      await axios.delete(`http://localhost:8090/api/v1/products/remove/${productId}`)
      dispatch(getAllData())
      return {
        showError: false
      }
    }catch(e) {
      return rejectWithValue({
        errors: e.response.data,
        showError: true
      })
    }
})

export const getPaginatedData = createAsyncThunk(
  'products/getPaginatedData', 
  async (config, { getState }) => { 
      const products = getState().products.products
      const {
        q = '',
        page = 1,
        perPage = 10,
        sort = 'desc',
        sortColumn = 'id'
      } = config      
      const queryLowered = q.toLowerCase()
      const dataAsc = [...products].sort((a, b) => {
        return (a[sortColumn] < b[sortColumn] ? -1 : 1)
      })
      const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
      const filteredData = dataToFilter.filter(
        product => product.name.toLowerCase().includes(queryLowered) 
      )
      let paginatedArray = filteredData.slice((page - 1) * perPage, page * perPage)
      return {        
        total: products.length,
        filteredProducts: paginatedArray,
        products: products
      }    
})

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    selectedProduct: {
      suppliers : []
    },
    toEditProduct: {
      suppliers : []
    },
    params: {},
    total: 1,
    sidebarOpen: false,
    errors : {},
    showError: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.total = action.payload.total
        state.products = action.payload.products
        state.filteredProducts = action.payload.filteredProducts
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.total = action.payload.total
        state.params = action.payload.params
        state.products = action.payload.products        
        state.filteredProducts = action.payload.filteredProducts
      })
      .addCase(add.fulfilled, (state, action) => {
        state.showError = action.payload.showError
        state.selectedProduct = action.payload.product
      })
      .addCase(add.rejected, (state, action) => {
        state.errors = action.payload.errors
        state.showError = action.payload.product
      })
      .addCase(setElementToEdit.fulfilled, (state, action) => {
        state.sidebarOpen = action.payload.sidebarOpen
        state.toEditProduct = action.payload.toEditProduct
      })   
      .addCase(edit.fulfilled, (state, action) => {        
        state.products = action.payload.products
        state.toEditProduct = action.payload.toEditProduct
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.showError = action.payload.showError
      })
      .addCase(remove.rejected, (state, action) => {
        state.errors = action.payload.errors
        state.showError = action.payload.showError
      })
      .addCase(find.fulfilled, (state, action) => {
        state.selectedProduct = action.payload.selectedProduct
      })
  }
})

export default productsSlice.reducer
