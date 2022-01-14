import { useEffect, useState } from 'react'

const initialState = {
  loading: true,
  error: null,
  data: [] | {},
}

const useFetching = (action) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    async function fetchData() {
      setState({ loading: true, error: null, data: [] | {} })

      await action()
        .then((res) =>
          setState({ loading: false, error: null, data: res.data })
        )
        .catch((error) =>
          setState({ loading: false, error: error, data: [] | {} })
        )
    }

    fetchData()
  }, [action])

  return state
}

export default useFetching
