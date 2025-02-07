// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** axios 
import axios from 'axios'

const URL = 'http://localhost:8090/api/v1/clients'

export const toggleSidebar = createAsyncThunk(
  'clients/toggleSidebar',
  async (_, { getState }) => {
    return {
      sidebarOpen: !getState().clients.sidebarOpen
    }
  })

export const setElementToEdit = createAsyncThunk(
  'clients/setElementToEdit',
  async (clientId, { getState }) => {
    const clients = getState().clients.clients
    let sidebarOpen = true
    let client = clients.find(c => c.id == clientId)
    if (client == null) {
      sidebarOpen = false
      toEditClient = {}
    }
    return {
      toEditClient: client,
      sidebarOpen: sidebarOpen
    }
  })

export const find = createAsyncThunk(
  'clients/find',
  async (id) => {
    const response = await axios.get(`${URL}/${id}`)
    let client = response.data
    return {
      selectedClient: client
    }
  })

export const edit = createAsyncThunk(
  'clients/edit',
  async (client, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`${URL}/edit`, client)
      dispatch(getAllData())
      return {
        client: response.data,
        toEditClient: {},
        showError: false
      }
    } catch (e) {
      return rejectWithValue({
        errors: e.response.data,
        showError: true
      })
    }
  })

export const add = createAsyncThunk(
  'clients/add',
  async (client, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/add`, client)
      dispatch(getAllData())
      return {
        client: response.data,
        showError: false
      }
    } catch (e) {
      return rejectWithValue({
        errors: e.response.data,
        showError: true
      })
    }
  })

export const remove = createAsyncThunk(
  'clients/remove',
  async (clientId, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${URL}/remove/${clientId}`)
      dispatch(getAllData())
      return {
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
  'clients/getAllData',
  async () => {
    const response = await axios.get(`${URL}`)
    return {
      clients: response.data,
      filteredClients: response.data,
      total: response.data.length
    }
  })

export const getPaginatedData = createAsyncThunk(
  'clients/getPaginatedData',
  async (config, { getState }) => {
    const clients = getState().clients.clients
    const {
      q = '',
      page = 1,
      perPage = 10,
      sort = 'asc',
      sortColumn = 'name'
    } = config

    const queryLowered = q.toLowerCase()
    const dataAsc = [...clients].sort((a, b) => {
      return (a[sortColumn] < b[sortColumn] ? -1 : 1)
    })

    let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
    let filteredData = dataToFilter.filter(
      client => client.name.toLowerCase().includes(queryLowered)
    )
    let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)

    return {
      total: filteredData.length,
      filteredClients: paginateArray
    }
  })

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    filteredClients: [],
    selectedClient: {},
    toEditClient: {},
    client:{},
    params: {},
    total: 1,
    sidebarOpen: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.clients = action.payload.clients
        state.filteredClients = action.payload.filteredClients
        state.total = action.payload.total
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {        
        state.filteredClients = action.payload.filteredClients
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
