import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import { RubrikTypeValuesNoDecimals } from '../../Constants'
import CreateIcon from '@material-ui/icons/Create'
import React, { useEffect } from 'react'
import VisButton from '../vis-button/VisButton'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import styles from './KontrolrapporterTable.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { handleRowsPerPage, selectRowsPerPage } from '../../reducers/pagination/PaginationReducer'

const AfrapporterButton = ({ kontrolrapportId }) => {
  const destination = `/afrapporter/${kontrolrapportId}`

  return (
    <Button
      id='btnafrapporter'
      component={Link}
      to={destination}
      variant='contained'
      size='small'
      className={styles.button}
      startIcon={<CreateIcon />}>
      Afrapporter
    </Button>
  )
}

const MyTableHeader = ({
  headers,
  btnVisAfrapportering,
  btnAfrapporter,
}) => {
  return (
    <TableHead>
      <TableRow className={styles.row}>
        {headers.map((header) => (
          <TableCell key={header.id} className={styles.head}>
            {header.label}
          </TableCell>
        ))}
        {btnVisAfrapportering || btnAfrapporter ? (
          <TableCell className={styles.head}></TableCell>
        ) : null}
      </TableRow>
    </TableHead>
  )
}

const MyTableBody = ({
  headers,
  data,
  page,
  rowsPerPage,
  btnVisAfrapportering,
  btnAfrapporter,
}) => {
  return (
    <TableBody>
      {data &&
        data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((data) => {
            return (
              <TableRow
                hover
                role='checkbox'
                tabIndex={-1}
                key={data.id}>
                {headers.map((header) => {
                  let value = data[header.id]
                  
                  if (header.id === 'sagsbehandler') {
                    value = value?.name
                  }

                  return (
                    <TableCell
                      key={header.id}
                      className={styles.cell}>
                      {value}
                    </TableCell>
                  )
                })}

                {/* This logic merges both buttons 'btnVisAfrapportering' and 'btnAfrapporter' in same cell */}
                {btnVisAfrapportering && (
                  <TableCell className={styles.cell}>
                    {/* TODO: className should NOT be sent as props - this component should handle css logic */}
                    <VisButton
                      kontrolrapportId={data.id}
                      spacing={styles['space-between-vis-kontrolrapport-and-afrapporter']} />

                    {btnAfrapporter && (
                      <AfrapporterButton kontrolrapportId={data.id} />
                    )}
                  </TableCell>
                )}
              </TableRow>
            )
          })}
    </TableBody>
  )
}

const KontrolrapporterTable = ({
  headers,
  data,
  btnVisAfrapportering,
  btnAfrapporter,
}) => {
  let { pagenumber } = useParams()
  let history = useHistory()
  let location = useLocation()

  const dispatch = useDispatch()
  const rowsPerPage = useSelector(selectRowsPerPage)

  const [page, setPage] = React.useState(parseInt(pagenumber) || 0)

  /**
   * Page number in URL is synchronizing with the current state of the tables pagination
   * - whenever the URL path changes - this callback runs
   * @callback useEffect
   */
  useEffect(() => {
    const path = location.pathname
    const pattern = /page\/(\d+)/i

    const match = path.match(pattern)

    if (match) {
      const currentPage = parseInt(match[1])

      if (!(currentPage === page)) {
        setPage(currentPage)
      }
    }
  }, [location.pathname])

  /**
   * This function is updating the URL dynamically with the current container
   * - e.g. if current container is "Aktuel Kø" - it is appending the page number to the URL along with the container itself
   * @param {Event} event
   * @param {number} newPage
   */
  const handleChangePage = (event, newPage) => {
    event.preventDefault()

    const path = location.pathname
    const currentContainer = path.split('/')[1]

    const destination = `/${currentContainer}/page/${newPage}`

    if (location.search) {
      history.push({
        pathname: destination,
        search: history.location.search,
      })
    } else {
      history.push(destination)
    }
  }

  const handleChangeRowsPerPage = (event) => {
    dispatch(handleRowsPerPage(+event.target.value))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <MyTableHeader
          headers={headers}
          btnVisAfrapportering={btnVisAfrapportering}
          btnAfrapporter={btnAfrapporter}
        />
        <MyTableBody
          headers={headers}
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          btnVisAfrapportering={btnVisAfrapportering}
          btnAfrapporter={btnAfrapporter}
        />
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default KontrolrapporterTable
