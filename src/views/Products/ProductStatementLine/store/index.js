// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { data } from '../data/data'

export const setElementToEdit = createAsyncThunk(
  'statementLines/setElementToEdit', 
  async (statementLineId) => {
    let sidebarOpen = true
    let statementLine = data.statementLines.find(c => c.id == statementLineId)
    if(statementLine == null) {
      sidebarOpen = false
      toEditStatementLine =  {}
    }
    return {
      toEditStatementLine: statementLine,
      sidebarOpen: sidebarOpen
    }
})

export const find = createAsyncThunk(
  'statementLines/find', 
  async (id) => {    
    console.log(id)
    let statementLine = data.statementLines.find(c => c.id == id)
    return {
      selectedStatementLine: statementLine
    }
})

export const edit = createAsyncThunk(
  'statementLines/edit', 
  async (statementLine) => {
    let array = [...data.statementLines]
    const index = array.findIndex((c => statementLine.id == c.id));
    array[index] = statementLine
    data.statementLines = [...array]
    return {
      toEditStatementLine: {},
      statementLines: array
    }
})

export const add = createAsyncThunk(
  'statementLines/add', 
  async (statementLine) => {
    let array = [...data.statementLines]
    array.push(statementLine)
    data.statementLines = [...array]
    return {
      selectedStatementLine: statementLine,
      statementLines: array
    }
})

export const addAll = createAsyncThunk(
  'statementLines/addAll', 
  async (items) => {
    let array = [...data.statementLines]
    array.push(...items)
    data.statementLines = [...array]
    return {
      statementLines: array
    }
})

export const remove = createAsyncThunk(
  'statementLines/remove', 
  async (statementLineId) => {
    const index = data.statementLines.findIndex(t => t.id === statementLineId)
    let array = [...data.statementLines]
    array.splice(index, 1)
    data.statementLines = [...array]
    return {
      statementLines: array
    }
})

export const getInvoiceItems = createAsyncThunk(
  'statementLines/getInvoiceItems', 
  async (params) => {
    const {
      reference,
      type = 'SALE'
    } = params      
    const limit = Math.floor(Math.random() * 10) + 3
    let filteredData = data.statementLines.filter(statementLine => statementLine.type == type).slice(0, limit)
    return { 
      statementLines: filteredData, 
      total: filteredData.length
    }
})

export const getAllData = createAsyncThunk(
  'statementLines/getAllData', 
  async (type) => {
    let filteredData = data.statementLines.filter(
      statementLine => statementLine.type == type
    )
    return { 
      statementLines: filteredData, 
      total: filteredData.length
    }
})

export const getPaginatedData = createAsyncThunk(
  'statementLines/getPaginatedData', 
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

      const dataAsc = [...data.statementLines].sort((a, b) => {
        return (a[sortColumn] < b[sortColumn] ? -1 : 1)
      })

      let dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
      let filteredData = dataToFilter.filter(
        statementLine => statementLine.name.toLowerCase().includes(queryLowered) && statementLine.type == type
      )
      let paginateArray = filteredData.slice((page - 1) * perPage, page * perPage)
      
      return {
          total: filteredData.length,
          statementLines: paginateArray
        }    
})

export const statementLinesSlice = createSlice({
  name: 'statementLines',
  initialState: {
    statementLines: [],
    selectedStatementLine: {},
    toEditStatementLine: {},
    params: {},
    total: 1,
    sidebarOpen: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getInvoiceItems.fulfilled, (state, action) => {
        state.statementLines = action.payload.statementLines
        state.total = action.payload.total
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.statementLines = action.payload.statementLines
        state.total = action.payload.total
      })
      .addCase(getPaginatedData.fulfilled, (state, action) => {
        state.statementLines = action.payload.statementLines
        state.total = action.payload.total
        state.params = action.payload.params
      })
      .addCase(add.fulfilled, (state, action) => {
        state.statementLine = action.payload.statementLine
      })
      .addCase(addAll.fulfilled, (state, action) => {
        state.statementLines = action.payload.statementLines
      })
      .addCase(setElementToEdit.fulfilled, (state, action) => {
        state.toEditStatementLine = action.payload.toEditStatementLine
        state.sidebarOpen = action.payload.sidebarOpen
      })   
      .addCase(edit.fulfilled, (state, action) => {
        state.statementLines = action.payload.statementLines
        state.toEditStatementLine = action.payload.toEditStatementLine

      })
      .addCase(remove.fulfilled, (state, action) => {
        state.statementLines = action.payload.statementLines
      })
      .addCase(find.fulfilled, (state, action) => {
        state.selectedStatementLine = action.payload.selectedStatementLine
      })
  }
})

export default statementLinesSlice.reducer
