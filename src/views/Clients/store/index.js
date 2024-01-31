// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { data } from '../data/data'

export const toggleSidebar = createAsyncThunk(
  'clients/toggleSidebar', 
  async (_, {getState}) => {
    return { 
      sidebarOpen: !getState().clients.sidebarOpen
    }
})

export const setElementToEdit = createAsyncThunk(
  'clients/setElementToEdit', 
  async (clientId) => {
    let sidebarOpen = true
    let client = data.clients.find(c => c.id == clientId)
    if(client == null) {
      sidebarOpen = false
      toEditClient =  {}
    }
    return {
      toEditClient: client,
      sidebarOpen: sidebarOpen
    }
})

export const find = createAsyncThunk(
  'clients/find', 
  async (id) => {
    let client = data.clients.find(c => c.id == id)
    return {
      selectedClient: client
    }
})

export const edit = createAsyncThunk(
  'clients/edit', 
  async (client) => {
    let array = [...data.clients]
    const index = array.findIndex((c => client.id == c.id));
    array[index] = client
    data.clients = [...array]
    return {
      toEditClient: {},
      clients: array
    }
})

export const add = createAsyncThunk(
  'clients/add', 
  async (client) => {
    let array = [...data.clients]
    array.push(client)
    data.clients = [...array]
    return {
      selectedClient: client,
      clients: array
    }
})

export const remove = createAsyncThunk(
  'clients/remove', 
  async (clientId) => {
    const index = data.clients.findIndex(t => t.id === clientId)
    let array = [...data.clients]
    array.splice(index, 1)
    data.clients = [...array]
    return {
      clients: array
    }
})

export const getAllData = createAsyncThunk(
  'clients/getAllData', 
  async () => {
    return { 
      clients: data.clients, 
      total: data.clients.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'clients/getPaginatedData', 
  async (config) => { 
        
      const {
        q = '',
        page = 1,
        perPage = 10,
        sort = 'asc',
        sortColumn = 'name'
      } = config      
      
      const queryLowered = q.toLowerCase()  

      const dataAsc = [...data.clients].sort((a, b) => {
       // console.log(a[sortColumn], b[sortColumn])
        return (a[sortColumn] < b[sortColumn] ? -1 : 1)
      })

      let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
      let filteredData = dataToFilter.filter(
        client => client.name.toLowerCase().includes(queryLowered) 
      )
      let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
      
      return {
          total: filteredData.length,
          clients: paginateArray
        }    
})

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    selectedClient: {},
    toEditClient: {},
    params: {},
    total: 1,
    sidebarOpen: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.clients = action.payload.clients
        state.total = action.payload.total
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.clients = action.payload.clients
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(add.fulfilled, (state, action) => {
        state.client = action.payload.client
      })
      .addCase(setElementToEdit.fulfilled, (state, action) => {
        state.toEditClient = action.payload.toEditClient
        state.sidebarOpen = action.payload.sidebarOpen
      })      
      .addCase(toggleSidebar.fulfilled, (state, action) => {
        state.sidebarOpen = action.payload.sidebarOpen
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.clients = action.payload.clients
        state.toEditClient = action.payload.toEditClient

      })
      .addCase(remove.fulfilled, (state, action) => {
        state.clients = action.payload.clients
      })
      .addCase(find.fulfilled, (state, action) => {
        state.selectedClient = action.payload.selectedClient
      })
  }
})

export default clientsSlice.reducer
