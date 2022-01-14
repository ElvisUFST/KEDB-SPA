import { configureStore } from '@reduxjs/toolkit'
import kontrolrapportSlice from './reducers/kontrolrapport/KontrolrapportAllReducer'
import kontrolrapportByIdSlice from './reducers/kontrolrapport/KontrolrapportSpecificReducer'
import kontrolrapportAfrapporteretSlice from './reducers/kontrolrapport/KontrolrapportAfrapporteretAllReducer'
import paginationSlice from './reducers/pagination/PaginationReducer'

const store = configureStore({
  reducer: {
    kontrolrapportAll: kontrolrapportSlice,
    kontrolrapportById: kontrolrapportByIdSlice,
    kontrolrapportAfrapporteretAll: kontrolrapportAfrapporteretSlice,
    pagination: paginationSlice,
  },
})

export default store
