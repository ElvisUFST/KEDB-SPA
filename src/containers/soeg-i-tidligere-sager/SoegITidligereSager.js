import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  fetchAfrapporteredeKontrolrapporter,
  fetchAfrapporteredeKontrolrapporterByFilter,
  selectAllAfrapporteredeKontrolrapporter,
  selectError,
  selectStatus,
} from '../../reducers/kontrolrapport/KontrolrapportAfrapporteretAllReducer'
import KontrolrapporterPresenter from '../KontrolrapporterPresenter'
import Soeg from './soeg/STU-soeg'

const tableHeaders = [
  {
    id: 'referencenummer',
    label: 'Referencenummer',
  },
  {
    id: 'workzoneJournalnummer',
    label: 'Journalnummer',
  },
  {
    id: 'profilnummer',
    label: 'Profil',
  },
  {
    id: 'afrapporteretDato',
    label: 'Afrapporteret dato',
  },
  {
    id: 'varemodtagerNavn',
    label: 'Modtager',
  },
  {
    id: 'varemodtagerCVR',
    label: 'CVR',
  },
  {
    id: 'sagsbehandler',
    label: 'Sagsbehandler',
  },
]

const SoegITidligereSager = () => {
  const afrapporteredeKontrolrapporter = useSelector(selectAllAfrapporteredeKontrolrapporter)
  const error = useSelector(selectError)
  const status = useSelector(selectStatus)

  const dispatch = useDispatch()

  let location = useLocation()

  useEffect(() => {
    if (location.search) {
      dispatch(fetchAfrapporteredeKontrolrapporterByFilter(location.search))
    } else {
      dispatch(fetchAfrapporteredeKontrolrapporter())
    }
  }, [location.search, dispatch])

  return (
    <KontrolrapporterPresenter
      title='Søg i tidligere sager'
      path={['/soegitidligeresager/page/:pagenumber', '/soegitidligeresager']}
      btnAfrapporter={false}
      error={error}
      status={status}
      data={afrapporteredeKontrolrapporter}
      headers={tableHeaders}>
      <Soeg />
    </KontrolrapporterPresenter>
  )
}

export default SoegITidligereSager
