import { TextField, InputAdornment } from '@material-ui/core'
import React from 'react'
import withEnterKeyPressed from '../../../../hocs/WithEnterKeyPressed'
import HelperText from './HelperText'

const ToldmaessigAendringOpkraevning = React.memo(({ value, setState, handleEnterKey }) => {
    return (
      <HelperText title='Toldmæssig beløb der er opkrævet. Fx. 1150,50'>
        <TextField
          id='toldmaessigAendringOpkraevning'
          style={{ margin: 3 }}
          fullWidth
          type='number'
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>DKK</InputAdornment>
            ),
          }}
          value={value > 0 ? value : ''}
          variant='outlined'
          onKeyPress={(event) => handleEnterKey(event)}
          onBlur={(event) =>
            setState({ type: 'HANDLE_NUMBER', payload: event })
          }
          onChange={(event) =>
            setState({ type: 'HANDLE_CHANGE_TOPSECTION', payload: event })
          }
        />
      </HelperText>
    )
  }
)

export default withEnterKeyPressed(ToldmaessigAendringOpkraevning)
