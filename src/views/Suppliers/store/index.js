// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { data } from '../data/data'

export const toggleSidebar = createAsyncThunk(
  'suppliers/toggleSidebar', 
  async (_, {getState}) => {
    return { 
      sidebarOpen: !getState().suppliers.sidebarOpen
    }
})

export const setElementToEdit = createAsyncThunk(
  'suppliers/setElementToEdit', 
  async (clientId) => {
    let sidebarOpen = true
    let client = data.suppliers.find(c => c.id == clientId)
    if(client == null) {
      sidebarOpen = false
      toEditSupplier =  {}
    }
    return {
      toEditSupplier: client,
      sidebarOpen: sidebarOpen
    }
})

export const find = createAsyncThunk(
  'suppliers/find', 
  async (id) => {
    let client = data.suppliers.find(c => c.id == id)
    return {
      selectedSupplier: client
    }
})

export const edit = createAsyncThunk(
  'suppliers/edit', 
  async (client) => {
    let array = [...data.suppliers]
    const index = array.findIndex((c => client.id == c.id));
    array[index] = client
    data.suppliers = [...array]
    return {
      toEditSupplier: {},
      suppliers: array
    }
})

export const add = createAsyncThunk(
  'suppliers/add', 
  async (client) => {
    let array = [...data.suppliers]
    array.push(client)
    data.suppliers = [...array]
    return {
      selectedSupplier: client,
      suppliers: array
    }
})

export const remove = createAsyncThunk(
  'suppliers/remove', 
  async (clientId) => {
    const index = data.suppliers.findIndex(t => t.id === clientId)
    let array = [...data.suppliers]
    array.splice(index, 1)
    data.suppliers = [...array]
    return {
      suppliers: array
    }
})

export const getAllData = createAsyncThunk(
  'suppliers/getAllData', 
  async () => {
    return { 
      suppliers: data.suppliers, 
      total: data.suppliers.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'suppliers/getPaginatedData', 
  async (config) => { 
        
      const {
        q = '',
        page = 1,
        perPage = 10,
        sort = 'asc',
        sortColumn = 'name'
      } = config      
      
      const queryLowered = q.toLowerCase()  

      const dataAsc = [...data.suppliers].sort((a, b) => {
        return (a[sortColumn] < b[sortColumn] ? -1 : 1)
      })

      let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
      let filteredData = dataToFilter.filter(
        client => client.name.toLowerCase().includes(queryLowered) 
      )
      let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
      
      return {
          total: filteredData.length,
          suppliers: paginateArray
        }    
})

export const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState: {
    suppliers: [],
    selectedSupplier: {},
    toEditSupplier: {},
    params: {},
    total: 1,
    sidebarOpen: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.suppliers = action.payload.suppliers
        state.total = action.payload.total
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.suppliers = action.payload.suppliers
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(add.fulfilled, (state, action) => {
        state.client = action.payload.client
      })
      .addCase(setElementToEdit.fulfilled, (state, action) => {
        state.toEditSupplier = action.payload.toEditSupplier
        state.sidebarOpen = action.payload.sidebarOpen
      })      
      .addCase(toggleSidebar.fulfilled, (state, action) => {
        state.sidebarOpen = action.payload.sidebarOpen
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.suppliers = action.payload.suppliers
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
