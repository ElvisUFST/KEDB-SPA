import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import React from 'react'
import { RubrikTypeValuesNoDecimals } from '../../Constants'
import styles from './KontrolrapportRubrikkerTable.module.css'

const headers = [
  {
    id: 'type',
    label: 'Rubrik',
  },
  {
    id: 'originalVaerdi',
    label: 'Værdi',
  },
  {
    id: 'valgteFejl',
    label: 'Valgte fejl',
  },
]

const MyTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell className={styles.head} key={header.id}>{header.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const MyTableBody = ({ data }) => {
  return (
    <TableBody>
      {data &&
        data.map((data) => {
          return (
            <TableRow
              hover
              role='checkbox'
              tabIndex={-1}
              key={data.referencenummer}>
              {headers.map((header) => {
                let value = data[header.id]

                if (header.id === 'type') {
                  value = data.rubrikTypeNummer + ' - ' + value
                }

                if (header.id === 'originalVaerdi' && RubrikTypeValuesNoDecimals.includes(data.rubrikTypeNummer)) {
                  value = value.includes('.') ? value.split('.')[0] : value
                }

                if (header.id === 'valgteFejl') {
                  if (value.length > 1) {
                    value = value
                      .map((valgteFejl) => '* ' + valgteFejl.tekst)
                      .join('\n')
                  } else {
                    value = value
                      .map((valgteFejl) => valgteFejl.tekst)
                      .join('\n')
                  }
                }

                return <TableCell key={header.id} className={styles.cell}>{value}</TableCell>
              })}
            </TableRow>
          )
        })}
    </TableBody>
  )
}

const KontrolrapportRubrikkerTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <MyTableHeader />
        <MyTableBody data={data} />
      </Table>
    </TableContainer>
  )
}

export default KontrolrapportRubrikkerTable
