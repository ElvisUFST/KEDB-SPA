import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import kontrolrapportApi from '../../services/kontrolrapportApi'
import { formatLocaleDateDK } from '../../utils/dateUtils'

const initialState = {
  stamdata: {
    referencenummer: {
      id: 'referencenummer',
      label: 'Referencenummer',
      value: '',
    },
    varepostnummer: {
      id: 'varepostnummer',
      label: 'Varepostnummer',
      value: '',
    },
    profilnummer: {
      id: 'Profilnummer',
      label: 'Profilnummer',
      value: '',
    },
    antagetDato: {
      id: 'antagetDato',
      label: 'Antaget dato',
      value: '',
    },
    afrapporteretDato: {
      id: 'afrapporteretDato',
      label: 'Afrapporteret dato',
      value: '',
    },
    sagsbehandler: {
      id: 'sagsbehandler',
      label: 'Sagsbehandler',
      value: '',
    },
    workzoneJournalnummer: {
      id: 'workzoneJournalnummer',
      label: 'Journalnummer',
      value: '',
    },
    toldsted: {
      id: 'toldsted',
      label: 'Toldsted',
      value: '',
    },
    varemodtagerCVR: {
      id: 'varemodtagerCVR',
      label: 'Varemodtager CVR',
      value: '',
    },
    varemodtagerNavn: {
      id: 'varemodtagerNavn',
      label: 'Varemodtager navn',
      value: '',
    },
    branchekode: {
      id: 'branchekode',
      label: 'Branchekode', 
      value: '',
    },
    klarererCVR: {
      id: 'klarererCVR',
      label: 'Klareren/repræsentant',
      value: '',
    },
    toldmaessigAendringOpkraevning: {
      id: 'toldmaessigAendringOpkraevning',
      label: 'Opkrævning',
      value: '',
    },
    toldmaessigAendringTilbagebetaling: {
      id: 'toldmaessigAendringTilbagebetaling',
      label: 'Tilbagebetaling',
      value: '',
    },
    oversendtTilAnalyse: {
      id: 'oversendtTilAnalyse',
      label: 'Oversendt til analyse',
      value: '',
    },
    oversendtTilToldrapport: {
      id: 'oversendtTilToldrapport',
      label: 'Oversendt til toldrapport@toldst.dk',
      value: '',
    },
    andreUregelmaessigheder: {
      id: 'andreUregelmaessigheder',
      label: 'Andre uregelmæssigheder',
      value: {},
    },
  },
  kontrolrapport: {},
  status: 'idle',
  error: '' | null,
}

export const selectKontrolrapport = (state) => state.kontrolrapportById.kontrolrapport
export const selectStamdata = (state) => state.kontrolrapportById.stamdata
export const selectRubrikker = (state) => state.kontrolrapportById.kontrolrapport.rubrikker
export const selectStatus = (state) => state.kontrolrapportById.status
export const selectError = (state) => state.kontrolrapportById.error

export const fetchKontrolrapportById = createAsyncThunk('kontrolrapport/fetchById', async (id) => {
    const response = await kontrolrapportApi.fetchById(id)
    return response.data
  }
)

const kontrolrapportByIdSlice = createSlice({
  name: 'kontrolrapport/byid',
  initialState,
  reducers: {
    updateKontrolrapport(state, action) {
      state.kontrolrapport = action.payload
      }
    },
  extraReducers: {
    [fetchKontrolrapportById.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchKontrolrapportById.fulfilled]: (state, action) => {
      const payload = action.payload

      state.kontrolrapport = payload

      if (!payload) {
        state.error = 'There is no data!'
        state.status = 'failed'
      
      } else {
        for (const property in payload) {
          let value = payload[property]

          if (state.stamdata.hasOwnProperty(property)) {
            if (property === 'antagetDato' || property === 'afrapporteretDato') {
              value = formatLocaleDateDK(value)
            }

            state.stamdata = {
              ...state.stamdata,
              [property]: {
                ...state.stamdata[property],
                value: value,
              },
            }
          }
        }
        state.status = 'succeeded'
      }
    },
    [fetchKontrolrapportById.rejected]: (state, action) => {
      if (state.kontrolrapport) {
        state.kontrolrapport = {}
      }

      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const { updateKontrolrapport } = kontrolrapportByIdSlice.actions
export default kontrolrapportByIdSlice.reducer
