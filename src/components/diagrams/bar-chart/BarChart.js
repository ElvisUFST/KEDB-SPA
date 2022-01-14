import { Animation, EventTracker, Stack } from '@devexpress/dx-react-chart'
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Legend,
  Tooltip,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'
import React from 'react'
import { formatCurrencyWithValuta } from '../../../utils/currencyUtils';

const BarChart = ({ tilbagebetalt, opkraevet }) => {
  const [targetItem, setTargetItem] = React.useState(null)
  const handleTargetItem = (item) => setTargetItem(item)

  const data = [
    {
      month: 'Jan.',
      tilbagebetalt: tilbagebetalt[0],
      opkraevet: opkraevet[0],
    },
    {
      month: 'Feb.',
      tilbagebetalt: tilbagebetalt[1],
      opkraevet: opkraevet[1],
    },
    {
      month: 'Mar.',
      tilbagebetalt: tilbagebetalt[2],
      opkraevet: opkraevet[2],
    },
    {
      month: 'Apr.',
      tilbagebetalt: tilbagebetalt[3],
      opkraevet: opkraevet[3],
    },
    {
      month: 'Maj',
      tilbagebetalt: tilbagebetalt[4],
      opkraevet: opkraevet[4],
    },
    {
      month: 'Jun.',
      tilbagebetalt: tilbagebetalt[5],
      opkraevet: opkraevet[5],
    },
    {
      month: 'Jul.',
      tilbagebetalt: tilbagebetalt[6],
      opkraevet: opkraevet[6],
    },
    {
      month: 'Aug.',
      tilbagebetalt: tilbagebetalt[7],
      opkraevet: opkraevet[7],
    },
    {
      month: 'Sep.',
      tilbagebetalt: tilbagebetalt[8],
      opkraevet: opkraevet[8],
    },
    {
      month: 'Okt.',
      tilbagebetalt: tilbagebetalt[9],
      opkraevet: opkraevet[9],
    },
    {
      month: 'Nov.',
      tilbagebetalt: tilbagebetalt[10],
      opkraevet: opkraevet[10],
    },
    {
      month: 'Dec.',
      tilbagebetalt: tilbagebetalt[11],
      opkraevet: opkraevet[11],
    },
  ]

  const Content = ({ text, targetItem, ...restProps }) => {
    const label = targetItem.series + ': '

    let displayText = label + formatCurrencyWithValuta(text)  

    return <Tooltip.Content {...restProps} text={displayText} />
  }

  return (
    data.length && (
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          name='Tilbagebetalt'
          valueField='tilbagebetalt'
          argumentField='month'
          color='#14143c'
        />

        <BarSeries
          name='Opkrævet'
          valueField='opkraevet'
          argumentField='month'
          color='#ffbb16'
        />

        <Animation />
        <Legend />
        <EventTracker />
        <Stack />
        <Tooltip
          targetItem={targetItem}
          onTargetItemChange={handleTargetItem}
          contentComponent={Content}
        />
      </Chart>
    )
  )
}

export default BarChart
