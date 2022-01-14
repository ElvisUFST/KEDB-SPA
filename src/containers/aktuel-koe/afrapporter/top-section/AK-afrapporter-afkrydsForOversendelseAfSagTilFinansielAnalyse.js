import { Checkbox } from '@material-ui/core'
import React from 'react'
import HelperText from './HelperText'

const id = 'oversendtTilAnalyse'

const AfkrydsForOversendelseAfSagTilFinansielAnalyse = React.memo(({ value, setState }) => {
    return (
      <HelperText title='Såfremt sagen vurderes at være relevant for vores analysefunktion (finansiel) afkryds dette felt. Der genereres automatisk en notifikation som sendes til analysefunktionens fællesmail med en kopi af kontrolrapporten.'>
        <Checkbox
          id={id}
          color='primary'
          checked={value || null}
          onChange={(event) => setState({ type: 'HANDLE_CHANGE_TOPSECTION', payload: event })} 
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </HelperText>
    )
  }
)

export default AfkrydsForOversendelseAfSagTilFinansielAnalyse
