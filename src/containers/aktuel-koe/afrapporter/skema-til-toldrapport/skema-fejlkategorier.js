import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import React from 'react'

const id = 'toldrapportFejlKategoriId'
const label = 'Hvad består "fejlen" i?'

const Fejlkategorier = React.memo(({ value, setState, options }) => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        name={id}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        fullWidth
        value={value || ''}
        onChange={(event) => setState({ type: 'HANDLE_CHANGE_TOLDRAPPORT', payload: event })}>
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>

        {options &&
          options.map((option) => {
            return (
              <MenuItem key={option.id} value={option.id}>
                {option.tekst}
              </MenuItem>
            )
          })}
      </Select>
    </>
  )
})

export default Fejlkategorier
