import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rowsPerPage: 10,
}

export const selectRowsPerPage = (state) => state.pagination.rowsPerPage

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    handleRowsPerPage(state, action) {
      state.rowsPerPage = action.payload
    }
  },
})

export const { handleRowsPerPage } = paginationSlice.actions
export default paginationSlice.reducer
