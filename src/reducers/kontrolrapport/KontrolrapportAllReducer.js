import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import kontrolrapportApi  from '../../services/kontrolrapportApi'
import { formatDatesReturnState } from '../../utils/reduxUtils'

const initialState = {
  kontrolrapporter: [],
  status: 'idle',
  error: '' | null,
}

/**
 * Logic for selectors should be implemented here to avoid boilerplate inside components
 */
export const selectAllKontrolrapporter = (state) => state.kontrolrapportAll.kontrolrapporter
export const selectError = (state) => state.kontrolrapportAll.error
export const selectStatus = (state) => state.kontrolrapportAll.status

export const fetchKontrolrapporter = createAsyncThunk('kontrolrapport/all', async () => {
    const response = await kontrolrapportApi.fetchAll()
    return response.data
  }
)

export const fetchKontrolrapporterByFilter = createAsyncThunk('kontrolrapport/byFilter', async (searchFilter) => {
    const response = await kontrolrapportApi.fetchByFilter(searchFilter)
    return response.data
  }
)

const kontrolrapportSlice = createSlice({
  name: 'kontrolrapport',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchKontrolrapporter.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchKontrolrapporter.fulfilled]: (state, action) => {
      const payload = action.payload

      state.kontrolrapporter = formatDatesReturnState("antagetDato", payload)
      state.status = 'succeeded'
    },
    [fetchKontrolrapporter.rejected]: (state, action) => {
      state.status = 'failed'

      if (state.kontrolrapporter.length > 0) {
        state.kontrolrapporter = []
      }
      state.error = action.error.message
    },
    [fetchKontrolrapporterByFilter.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchKontrolrapporterByFilter.fulfilled]: (state, action) => {
      const payload = action.payload

      state.kontrolrapporter = formatDatesReturnState("antagetDato", payload)
      state.status = 'succeeded'
      state.error = null
    },
    [fetchKontrolrapporterByFilter.rejected]: (state, action) => {
      state.status = 'failed'

      if (state.kontrolrapporter.length > 0) {
        state.kontrolrapporter = []
      }
      state.error = action.error.message
    },
  },
})

export default kontrolrapportSlice.reducer
