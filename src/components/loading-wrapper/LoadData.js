import React from 'react'
import useFetching from '../../hooks/useFetching'
import Loading from '../progress/Loading'
import Error from '../progress/Error'

const LoadData = ({ action, render, loadingMessage, errorMessage }) => {
  const { error, loading, data } = useFetching(action)

  if (loading) return <Loading message={loadingMessage} />
  if (error) return <Error message={errorMessage} />
  if (!data) return <p>Ingen data....</p>

  return render(data)
}

export default LoadData
