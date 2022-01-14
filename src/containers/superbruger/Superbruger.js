import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { useEffect } from 'react'
import RedigerButton from './rediger-button/RedigerButton'
import styles from '../superbruger/Superbruger.module.css'
import Loading from '../../components/progress/Loading'
import Error from '../../components/progress/Error'

const Header = ({ headers, deleteable, editable }) => {
  return (
    <TableHead>
      <TableRow>
        {deleteable && <TableCell className={styles.tableHeader}></TableCell>}

        {headers.map((header) => {
          return (
            <TableCell key={header.id} className={styles.tableHeader}>
              {header.label}
            </TableCell>
          )
        })}

        {editable && <TableCell className={styles.tableHeader}></TableCell>}
      </TableRow>
    </TableHead>
  )
}

const Body = ({
  destination,
  data,
  headers,
  editable,
  deleteable,
  handleDelete,
}) => {
  return (
    <TableBody>
      {data.map((data, index) => {
        let id = data.id ?? `${data.rubrikTypeId}${data.profilId}${data.fejltekstId}`

        return (
          <TableRow key={id}>
            {deleteable && (
              <TableCell>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => handleDelete(index)}
                  startIcon={<DeleteIcon />}>
                  Slet
                </Button>
              </TableCell>
            )}

            {headers.map((header) => {
              let value = data[header.id]

              if (typeof value === 'boolean') {
                value = value ? 'Ja' : 'Nej'
              }

              return <TableCell key={header.id}>{value}</TableCell>
            })}

            {editable && (
              <TableCell className={styles.tableBodyRediger}>
                <RedigerButton
                  destination={'/superbruger' + destination + id}
                />
              </TableCell>
            )}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

const Superbruger = ({
  api,
  defaultData,
  title,
  tilfoejButtonTitle,
  headers,
  destination,
  handleSkemaOpen,
  handleDelete,
  editable,
  addable,
  deleteable,
  children,
}) => {
  const [data, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState()

  useEffect(() => {
    if (!defaultData) {
      async function fetchData() {
        setLoading(true)

        api
          .fetchAll()
          .then((response) => {
            setData(response.data)
            setLoading(false)
          })
          .catch((error) => {
            setLoading(false)
            setError(error)
          })
      }

      fetchData()
    } else {
      setData(defaultData)
    }
  }, [defaultData, api])

  if (isLoading) return <Loading message='Vent venligst..' />
  if (error) return <Error message={`Kunne ikke hente data. Fejlbesked: ${error.message}`} />

  return (
    <Grid container justify='center' spacing={2}>
      <Grid item xs={6}>
        <Typography variant='h4'>{title}</Typography>
        <Divider />
      </Grid>

      <Grid item xs={6} align='end'>
        {addable && (
          <Button
            className={styles.btnTilfoej}
            variant='outlined'
            onClick={handleSkemaOpen}>
            Tilføj {tilfoejButtonTitle}
          </Button>
        )}
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={styles.table}>
            <Header
              headers={headers}
              deleteable={deleteable}
              editable={editable}
            />
            <Body
              data={data}
              headers={headers}
              destination={destination}
              editable={editable}
              deleteable={deleteable}
              handleDelete={handleDelete}
            />
          </Table>
        </TableContainer>
      </Grid>

      {children}
    </Grid>
  )
}

export default Superbruger
