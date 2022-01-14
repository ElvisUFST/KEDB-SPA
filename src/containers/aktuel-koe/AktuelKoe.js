import React, { useEffect } from 'react'
import KontrolrapporterPresenter from '../KontrolrapporterPresenter'
import { useSelector } from 'react-redux'
import {
  fetchKontrolrapporter,
  fetchKontrolrapporterByFilter,
  selectAllKontrolrapporter,
  selectError,
  selectStatus,
} from './../../reducers/kontrolrapport/KontrolrapportAllReducer'
import Soeg from './soeg/AK-soeg'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const tableHeaders = [
  {
    id: 'referencenummer',
    label: 'Referencenummer',
  },
  {
    id: 'varepostnummer',
    label: 'Varepostnummer',
  },
  {
    id: 'profilnummer',
    label: 'Profil',
  },
  {
    id: 'antagetDato',
    label: 'Antaget dato',
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
    id: 'toldsted',
    label: 'Toldsted',
  },
]

const AktuelKoe = () => {
  const kontrolrapporter = useSelector(selectAllKontrolrapporter)
  const error = useSelector(selectError)
  const status = useSelector(selectStatus)

  const dispatch = useDispatch()

  let location = useLocation()

  useEffect(() => {
    if (location.search) {
      dispatch(fetchKontrolrapporterByFilter(location.search))
    } else {
      dispatch(fetchKontrolrapporter())
    }
  }, [location.search, dispatch])

  return (
    <KontrolrapporterPresenter
      title='Aktuel kø'
      path={['/aktuelkoe/page/:pagenumber', '/aktuelkoe']}
      btnAfrapporter={true}
      error={error}
      status={status}
      data={kontrolrapporter}
      headers={tableHeaders}>
      <Soeg />
    </KontrolrapporterPresenter>
  )
}

export default AktuelKoe
