import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import afrapportedeKontrolrapportApi from '../../services/afrapporteretKontrolrapportApi'
import { formatDatesReturnState } from '../../utils/reduxUtils'

const initialState = {
  afrapporteredeKontrolrapporter: [],
  status: 'idle',
  error: '' | null,
}

/**
 * Logic for selectors should be implemented here to avoid boilerplate inside components
 */
export const selectAllAfrapporteredeKontrolrapporter = (state) => state.kontrolrapportAfrapporteretAll.afrapporteredeKontrolrapporter
export const selectError = (state) => state.kontrolrapportAfrapporteretAll.error
export const selectStatus = (state) => state.kontrolrapportAfrapporteretAll.status

export const fetchAfrapporteredeKontrolrapporter = createAsyncThunk('kontrolrapport/all', async () => {
    const response = await afrapportedeKontrolrapportApi.fetchAll()
    return response.data
  }
)

export const fetchAfrapporteredeKontrolrapporterByFilter = createAsyncThunk('kontrolrapport/afrapporterede/byFilter', async (searchFilter) => {
    const response = await afrapportedeKontrolrapportApi.fetchByFilter(searchFilter)
    return response.data
  }
)

const kontrolrapportAfrapporteretSlice = createSlice({
  name: 'kontrolrapport/afrapporterede',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAfrapporteredeKontrolrapporter.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchAfrapporteredeKontrolrapporter.fulfilled]: (state, action) => {
      const payload = action.payload

      state.afrapporteredeKontrolrapporter = formatDatesReturnState("afrapporteretDato", payload)
      state.status = 'succeeded'
    },
    [fetchAfrapporteredeKontrolrapporter.rejected]: (state, action) => {
      state.status = 'failed'

      if (state.afrapporteredeKontrolrapporter.length > 0) {
        state.afrapporteredeKontrolrapporter = []
      }
      
      state.error = action.error.message
    },
    [fetchAfrapporteredeKontrolrapporterByFilter.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchAfrapporteredeKontrolrapporterByFilter.fulfilled]: (state, action) => {
      const payload = action.payload
     
      state.afrapporteredeKontrolrapporter = formatDatesReturnState("afrapporteretDato", payload)
      state.status = 'succeeded'
      state.error = null
    },
    [fetchAfrapporteredeKontrolrapporterByFilter.rejected]: (state, action) => {
      state.status = 'failed'

      if (state.afrapporteredeKontrolrapporter.length > 0) {
        state.afrapporteredeKontrolrapporter = []
      }
      state.error = action.error.message
    },
  },
})

export default kontrolrapportAfrapporteretSlice.reducer
