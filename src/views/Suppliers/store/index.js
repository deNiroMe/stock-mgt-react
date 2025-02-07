// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** axios 
import axios from 'axios'

export const toggleSidebar = createAsyncThunk(
  'suppliers/toggleSidebar', 
  async (_, {getState}) => {
    return { 
      sidebarOpen: !getState().suppliers.sidebarOpen
    }
})

export const setElementToEdit = createAsyncThunk(
  'suppliers/setElementToEdit', 
    async (supplierId, { getState }) => { 
      const suppliers = getState().suppliers.suppliers
      let sidebarOpen = true
      let supplier = suppliers.find(c => c.id == supplierId)
      if(supplier == null) {
        sidebarOpen = false
        toEditSupplier =  {}
      }
      return {
        toEditSupplier: supplier,
        sidebarOpen: sidebarOpen
      }
})

export const find = createAsyncThunk(
  'suppliers/find', 
  async (id) => { 
    const response = await axios.get(`http://localhost:8090/api/v1/suppliers/${id}`) 
    let supplier = response.data
    return {
      selectedSupplier: supplier
    }
})

export const edit = createAsyncThunk(
  'suppliers/edit', 
  async (supplier, {dispatch, rejectWithValue}) => {
    try{
      const response = await axios.put(`http://localhost:8090/api/v1/suppliers/edit`, supplier)
      dispatch(getAllData())
      return {
        supplier: response.data,
        toEditSupplier: {},
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
  'suppliers/add', 
  async (supplier, {dispatch, rejectWithValue}) => {
    try{
      const response = await axios.post(`http://localhost:8090/api/v1/suppliers/add`, supplier)
      dispatch(getAllData())
      return {
        supplier:response.data,
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
  'suppliers/remove', 
  async (supplierId, {dispatch, rejectWithValue}) => {
    try{
      await axios.delete(`http://localhost:8090/api/v1/suppliers/remove/${supplierId}`)
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

export const getAllData = createAsyncThunk(
  'suppliers/getAllData', 
  async () => {
    const response = await axios.get('http://localhost:8090/api/v1/suppliers')
    console.log(response)
    return { 
      suppliers: response.data,
      filteredSuppliers: response.data,
      total: response.data.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'suppliers/getPaginatedData', 
  async (config, { getState }) => { 
      const suppliers = getState().suppliers.suppliers
      const {
        q = '',
        page = 1,
        perPage = 10,
        sort = 'asc',
        sortColumn = 'name'
      } = config      
      
      const queryLowered = q.toLowerCase() 
      const dataAsc = [...suppliers].sort((a, b) => {
        return (a[sortColumn] < b[sortColumn] ? -1 : 1)
      })

      let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
      let filteredData = dataToFilter.filter(
        supplier => supplier.name.toLowerCase().includes(queryLowered) 
      )
      let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
      
      return {
          total: filteredData.length,
          filteredSuppliers: paginateArray
        }    
})

export const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState: {
    suppliers: [],
    filteredSuppliers: [],
    selectedSupplier: {},
    toEditSupplier: {},
    supplier: {},
    params: {},
    total: 1,
    sidebarOpen: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.suppliers = action.payload.suppliers
        state.filteredSuppliers = action.payload.filteredSuppliers
        state.total = action.payload.total
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {        
        state.filteredSuppliers = action.payload.filteredSuppliers
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(add.fulfilled, (state, action) => {
        state.supplier = action.payload.supplier
      })
      .addCase(setElementToEdit.fulfilled, (state, action) => {
        state.toEditSupplier = action.payload.toEditSupplier
        state.sidebarOpen = action.payload.sidebarOpen
      })      
      .addCase(toggleSidebar.fulfilled, (state, action) => {
        state.sidebarOpen = action.payload.sidebarOpen
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.supplier = action.payload.supplier
        state.toEditSupplier = action.payload.toEditSupplier

      })
      .addCase(remove.fulfilled, (state, action) => {
        state.suppliers = action.payload.suppliers
      })
      .addCase(find.fulfilled, (state, action) => {
        state.selectedSupplier = action.payload.selectedSupplier
      })
  }
})

export default suppliersSlice.reducer
