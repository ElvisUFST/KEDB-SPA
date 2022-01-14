import React, { useCallback } from 'react'

const withEnterKeyPressed = (WrappedComponent) => (props) => {
  const handleEnterKey = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }, [])

  const { ...passThroughProps } = props

  return (
    <WrappedComponent handleEnterKey={handleEnterKey} {...passThroughProps} />
  )
}

export default withEnterKeyPressed
