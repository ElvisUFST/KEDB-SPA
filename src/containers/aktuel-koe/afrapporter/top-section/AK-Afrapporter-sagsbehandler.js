import React from 'react'
import { MenuItem, TextField, Typography } from '@material-ui/core'
import LoadData from '../../../../components/loading-wrapper/LoadData'
import sagsbehandlerApi from '../../../../services/sagsbehandlerApi'

const Sagsbehandler = React.memo(({ currentUser, value, setState }) => {
  const currentValue = value ? value.name : currentUser.name
  
  return (
    <LoadData
      action={sagsbehandlerApi.fetchAll}
      errorMessage='Kunne ikke hente sagsbehandlere'
      render={(data) => {
        return (
          <TextField
            name='sagsbehandler'
            style={{ margin: 3 }}
            fullWidth
            select
            size='small'
            value={currentValue}
            SelectProps={{
              renderValue: () => <Typography>{currentValue}</Typography>,
            }}
            onChange={(event) =>
              setState({
                type: 'HANDLE_CHANGE_TOPSECTION',
                payload: event,
                sagsbehandlere: data,
              })
            }
            variant='outlined'>
            <MenuItem value={currentUser.idToken.oid}>
              <em>----</em>
            </MenuItem>

            {data &&
              data.map((sagsbehandler) => {
                return (
                  <MenuItem key={sagsbehandler.id} value={sagsbehandler.id}>
                    {sagsbehandler.name}
                  </MenuItem>
                )
              })}
          </TextField>
        )
      }}
    />
  )
})

export default Sagsbehandler
