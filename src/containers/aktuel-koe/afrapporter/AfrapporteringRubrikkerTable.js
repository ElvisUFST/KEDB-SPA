import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  TextField,
  Paper,
  Checkbox,
  ListItemText,
  Chip,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { RubrikTypeValuesNoDecimals } from '../../../Constants'
import withEnterKeyPressed from '../../../hocs/WithEnterKeyPressed'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    whiteSpace: 'break-word',
    justifyContent: 'center',
  },
  row: {
    height: '40px',
  },
  input: {
    backgroundColor: theme.palette.background.paper,
  },
  muligeFejlSelect: {
    height: '3em',
    '& .MuiSelect-outlined': {
      whiteSpace: 'unset',
      wordBreak: 'break-word',
      fontSize: '1em',
    },
  },
  selectEmpty: {
  marginTop: theme.spacing(3),
  },
  head: {
    backgroundColor: '#14143c',
    textAlign:'center',
    color: '#fff',
    minWidth: '200px',
  },
  chip: {
    margin: 5,
    fontSize: '1em',
    width: '60ch',
  }
}))

const Rubrik = {
  RUBRIK_TYPE: 'type',
  ORIGINAL_VAERDI: 'originalVaerdi',
  KORRIGERET_VAERDI: 'korrigeretVaerdi',
  MULIGE_FEJL: 'muligeFejl',
}

const RubrikTyper = {
  PRAEFERENCE_DOK: 'Præferencedok',
  STATISTISK_VAERDI: 'Statistisk værdi',
}

const headers = [
  {
    id: Rubrik.RUBRIK_TYPE,
    label: 'Rubrik',
  },
  {
    id: Rubrik.ORIGINAL_VAERDI,
    label: 'Original værdi',
  },
  {
    id: Rubrik.KORRIGERET_VAERDI,
    label: 'Korrigeret værdi',
  },
  {
    id: Rubrik.MULIGE_FEJL,
    label: 'Mulige fejl',
  },
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const MuligeFejlMultipleValues = ({
  index,
  name,
  options,
  rubrikker,
  setState,
}) => {
  const valgteFejlFejltekstIds = rubrikker[index]?.valgteFejl.map((item) => item.fejltekstId) || []
  const valgteFejlTeksts = options
    .filter((option) => valgteFejlFejltekstIds.includes(option.fejltekstId))
    .map((valgteFejl) => valgteFejl.tekst)
    const classes = useStyles()

  return (
    <TableCell>
      <Select
        name={name}
        multiple
        fullWidth
        renderValue={() => (
          <Grid container justify='center'>
            {valgteFejlTeksts.map((fejltekst) => (
              <Grid item xs={12}>
                <Chip
                  variant='outlined'
                  key={fejltekst}
                  label={fejltekst}
                  className={classes.chip}
                />
              </Grid>
            ))}
          </Grid>
        )}
        MenuProps={MenuProps}
        value={valgteFejlFejltekstIds}
        onChange={(event) =>
          setState({
            type: 'HANDLE_CHANGE_RUBRIKFEJL_MULTIPLE',
            payload: event,
            index: index,
          })
        }
        variant='outlined'>
        {options.length > 0 &&
          options.map((option) => (
            <MenuItem
              key={option.fejltekstId}
              value={option.fejltekstId}>
              <Checkbox checked={valgteFejlFejltekstIds.indexOf(option.fejltekstId) > -1}/>
              <ListItemText primary={option.tekst} />
            </MenuItem>
          ))}
      </Select>
    </TableCell>
  )
}

const MuligeFejlSingleValue = ({ index, name, options, rubrikker, setState }) => {
  const value = rubrikker[index]?.valgteFejl[0]?.fejltekstId || ''
  const classes = useStyles()
    return (
      <TableCell>
        <Select
          name={name}
          fullWidth
          value={value}
          className={classes.muligeFejlSelect}
          onChange={(event) =>
            setState({
              type: 'HANDLE_CHANGE_RUBRIKFEJL',
              payload: event,
              index: index,
            })
          }
          variant='outlined'>
          <MenuItem value=''>
            <em>----</em>
          </MenuItem>

          {options.length > 0 &&
            options.map((option) => (
              <MenuItem
                key={option.fejltekstId}
                value={option.fejltekstId}
                >
                {option.tekst}
              </MenuItem>
            ))}
        </Select>
      </TableCell>
    )
  }

const RubrikType = React.memo(({ value }) => {
  return <TableCell>{value}</TableCell>
})

const RubrikVaerdi = withEnterKeyPressed(React.memo(({ header, value, handleEnterKey }) => {
  return (
    <TableCell>
      <TextField
        key={header.id}
        size='small'
        fullWidth
        value={value}
        variant='outlined'
        InputProps={{
          readOnly: true,
        }}
        onKeyPress={(event) => handleEnterKey(event)}
      />
    </TableCell>
  )
}))

const SwitchRubrikComponent = ({
  classes,
  index,
  rubrikType,
  value,
  header,
  rubrikker,
  setState,
}) => {
  switch (header.id) {
    case Rubrik.RUBRIK_TYPE: {
      return <RubrikType key={header.id} value={value} />
    }
    case Rubrik.ORIGINAL_VAERDI:
    case Rubrik.KORRIGERET_VAERDI: {
      return <RubrikVaerdi classes={classes} header={header} value={value} />
    }
    case Rubrik.MULIGE_FEJL: {
      if (rubrikType === RubrikTyper.PRAEFERENCE_DOK || rubrikType === RubrikTyper.STATISTISK_VAERDI) {
        return (
            <MuligeFejlMultipleValues
              key={header.id}
              rubrikker={rubrikker}
              index={index}
              name={rubrikType}
              options={value}
              setState={setState}
            />
        )
      }
      return (
          <MuligeFejlSingleValue
            classes={classes}
            key={header.id}
            index={index}
            rubrikker={rubrikker}
            name={rubrikType}
            options={value}
            setState={setState}
          />
      )
    }
    default:
      console.error('Could not find any rubrik with the type: ' + header.id)
      return null
  }
}

const Body = React.memo(({ classes, rubrikker, setState }) => {
  if (Object.keys(rubrikker).length) {
    return (
      <TableBody>
        {rubrikker.map((rubrik, index) => {
          return (
            <TableRow
              key={rubrik.rubrikId}
              className={classes.row}
              hover
              role='checkbox'
              tabIndex={-1}>
              {headers.map((header) => {
                let value = rubrik[header.id] || ''

                if (header.id === 'type') {
                  value =  rubrik.rubrikTypeNummer + " - " + value
                }

                // As stated from the business - no decimals will ever be present neither in original værdi or korrigeret værdi in specific cases.
                // To clearify the reason backend doesn't send us the decided output - the import system (on the other end) MUST change the data they are exporting
                if ((header.id === 'originalVaerdi' || header.id === 'korrigeretVaerdi') && RubrikTypeValuesNoDecimals.includes(rubrik.rubrikTypeNummer)) {
                  value = value.includes(".") ? value.split(".")[0] : value
                }

                return (
                  <SwitchRubrikComponent
                    key={header.id}
                    classes={classes}
                    rubrikker={rubrikker}
                    index={index}
                    rubrikType={rubrik.type}
                    value={value}
                    header={header}
                    setState={setState}
                  />
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    )
  } else {
    return null
  }
})

const Header = React.memo(({ classes }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell key={header.id} className={classes.head}>
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
})

const AfrapporteringRubrikkerTable = ({ rubrikker, setState }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} square>
      <Table>
        <Header classes={classes} />
        <Body
          classes={classes}
          rubrikker={rubrikker || {}}
          setState={setState}
        />
      </Table>
    </TableContainer>
  )
}

export default AfrapporteringRubrikkerTable
