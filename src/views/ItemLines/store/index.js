// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { data } from '../data/data'

export const setElementToEdit = createAsyncThunk(
  'items/setElementToEdit', 
  async (statementLineId) => {
    let sidebarOpen = true
    let item = data.items.find(c => c.id == statementLineId)
    if(item == null) {
      sidebarOpen = false
      toEditItem =  {}
    }
    return {
      toEditItem: item,
      sidebarOpen: sidebarOpen
    }
})

export const find = createAsyncThunk(
  'items/find', 
  async (id) => {    
    console.log(id)
    let item = data.items.find(c => c.id == id)
    return {
      seletcetdItem: item
    }
})

export const edit = createAsyncThunk(
  'items/edit', 
  async (item) => {
    let array = [...data.items]
    const index = array.findIndex((c => item.id == c.id));
    array[index] = item
    data.items = [...array]
    return {
      toEditItem: {},
      items: array
    }
})

export const add = createAsyncThunk(
  'items/add', 
  async (item) => {
    let array = [...data.items]
    array.push(item)
    data.items = [...array]
    return {
      seletcetdItem: item,
      items: array
    }
})

export const addAll = createAsyncThunk(
  'items/addAll', 
  async (items) => {
    let array = [...data.items]
    array.push(...items)
    data.items = [...array]
    return {
      items: array
    }
})

export const remove = createAsyncThunk(
  'items/remove', 
  async (statementLineId) => {
    const index = data.items.findIndex(t => t.id === statementLineId)
    let array = [...data.items]
    array.splice(index, 1)
    data.items = [...array]
    return {
      items: array
    }
})

export const getInvoiceItems = createAsyncThunk(
  'items/getInvoiceItems', 
  async (params) => {
    const {
      reference,
      type = 'SALE'
    } = params      
    const limit = Math.floor(Math.random() * 10) + 3
    let filteredData = data.items.filter(item => item.type == type).slice(0, limit)
    return { 
      items: filteredData, 
      total: filteredData.length
    }
})

export const getAllData = createAsyncThunk(
  'items/getAllData', 
  async (type) => {
    let filteredData = data.items.filter(
      item => item.type == type
    )
    return { 
      items: filteredData, 
      total: filteredData.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'items/getPaginatedData', 
  async (config) => { 
        
      const {
        q = '',
        page = 1,
        perPage = 10,
        sort = 'asc',
        sortColumn = 'name',
        type = 'ALL'
      } = config      
      
      const queryLowered = q.toLowerCase()  

      const dataAsc = [...data.items].sort((a, b) => {
        return (a[sortColumn] < b[sortColumn] ? -1 : 1)
      })

      let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
      let filteredData = dataToFilter.filter(
        item => item.name.toLowerCase().includes(queryLowered) && item.type == type
      )
      let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
      
      return {
          total: filteredData.length,
          items: paginateArray
        }    
})

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    seletcetdItem: {},
    toEditItem: {},
    params: {},
    total: 1,
    sidebarOpen: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getInvoiceItems.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.total = action.payload.total
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.total = action.payload.total
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(add.fulfilled, (state, action) => {
        state.item = action.payload.item
      })
      .addCase(addAll.fulfilled, (state, action) => {
        state.items = action.payload.items
      })
      .addCase(setElementToEdit.fulfilled, (state, action) => {
        state.toEdititem = action.payload.toEditItem
        state.sidebarOpen = action.payload.sidebarOpen
      })   
      .addCase(edit.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.toEditItem = action.payload.toEditItem

      })
      .addCase(remove.fulfilled, (state, action) => {
        state.items = action.payload.items
      })
      .addCase(find.fulfilled, (state, action) => {
        state.seletcetdItem = action.payload.seletcetdItem
      })
  }
})

export default itemsSlice.reducer
