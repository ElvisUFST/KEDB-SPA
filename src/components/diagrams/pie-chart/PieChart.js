import { EventTracker, Palette } from '@devexpress/dx-react-chart'
import {
  Chart,
  Legend,
  PieSeries,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui'
import React from 'react'
import { formatPercentage } from '../../../utils/currencyUtils'

const PieChart = ({ udenFejl, medFejl }) => {
  const [targetItem, setTargetItem] = React.useState(null)

  const handleTargetItem = (item) => setTargetItem(item)

  const data = [
    { item: 'Med fejl', percent: medFejl },
    { item: 'Uden fejl', percent: udenFejl },
  ]

  const Content = ({ text, targetItem, ...restProps }) => {
    const value = data[targetItem.point].percent
    console.log(value)
    const displayText = formatPercentage(value / 100)
    return <Tooltip.Content {...restProps} text={displayText} />
  }

  return (
    <Chart data={data}>
      <Palette scheme={['#ffbb16', '#14143c']} />
      <PieSeries valueField='percent' argumentField='item' />
      <Legend />
      <EventTracker />
      <Tooltip
        targetItem={targetItem}
        onTargetItemChange={handleTargetItem}
        contentComponent={Content}
      />
    </Chart>
  )
}

export default PieChart
