// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { data } from '../data/data'

export const setElementToEdit = createAsyncThunk(
  'products/setElementToEdit', 
  async (productId) => {
    let sidebarOpen = true
    let product = data.products.find(c => c.id == productId)
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
    console.log(id)
    let product = data.products.find(c => c.id == id)
    return {
      selectedProduct: product
    }
})

export const edit = createAsyncThunk(
  'products/edit', 
  async (product) => {
    let array = [...data.products]
    const index = array.findIndex((c => product.id == c.id));
    array[index] = product
    data.products = [...array]
    return {
      toEditProduct: {},
      products: array
    }
})

export const add = createAsyncThunk(
  'products/add', 
  async (product) => {
    let array = [...data.products]
    array.push(product)
    data.products = [...array]
    console.log(product)
    return {
      selectedProduct: product,
      products: array
    }
})

export const remove = createAsyncThunk(
  'products/remove', 
  async (productId) => {
    const index = data.products.findIndex(t => t.id === productId)
    let array = [...data.products]
    array.splice(index, 1)
    data.products = [...array]
    return {
      products: array
    }
})

export const getAllData = createAsyncThunk(
  'products/getAllData', 
  async () => {
    return { 
      products: data.products, 
      total: data.products.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'products/getPaginatedData', 
  async (config) => { 
        
      const {
        q = '',
        page = 1,
        perPage = 10,
        sort = 'asc',
        sortColumn = 'name'
      } = config      
      
      const queryLowered = q.toLowerCase()  

      const dataAsc = [...data.products].sort((a, b) => {
        return (a[sortColumn] < b[sortColumn] ? -1 : 1)
      })

      let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
      let filteredData = dataToFilter.filter(
        product => product.name.toLowerCase().includes(queryLowered) 
      )
      let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
      
      return {
          total: filteredData.length,
          products: paginateArray
        }    
})

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    selectedProduct: {
      suppliers : []
    },
    toEditProduct: {
      suppliers : []
    },
    params: {},
    total: 1,
    sidebarOpen: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.products = action.payload.products
        state.total = action.payload.total
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.products = action.payload.products
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(add.fulfilled, (state, action) => {
        state.product = action.payload.product
      })
      .addCase(setElementToEdit.fulfilled, (state, action) => {
        state.toEditProduct = action.payload.toEditProduct
        state.sidebarOpen = action.payload.sidebarOpen
      })   
      .addCase(edit.fulfilled, (state, action) => {
        state.products = action.payload.products
        state.toEditProduct = action.payload.toEditProduct

      })
      .addCase(remove.fulfilled, (state, action) => {
        state.products = action.payload.products
      })
      .addCase(find.fulfilled, (state, action) => {
        state.selectedProduct = action.payload.selectedProduct
      })
  }
})

export default productsSlice.reducer
