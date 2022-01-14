import instance from './instance'

const BASE_ENDPOINT = '/ToldrapportOvertraedelsesAktoer/'

const fetchAll = () => (
  instance({
    method: 'GET',
    url: BASE_ENDPOINT,
  })
)

const fetchById = (id) => (
  instance({
    method: 'GET',
    url: BASE_ENDPOINT + id,
  })
)

const put = (id, overtraedelsesaktoer) => (
  instance({
    method: 'PUT',
    url: BASE_ENDPOINT + id,
    data: overtraedelsesaktoer,
  })
)

const post = (overtraedelsesaktoer) => (
  instance({
    method: 'POST',
    url: BASE_ENDPOINT,
    data: overtraedelsesaktoer,
  })
)

const overtraedelsesaktoerApi = {
    fetchAll: () => fetchAll(),
    fetchById: (id) => fetchById(id),
    put: (id, overtraedelsesaktoer) => put(id, overtraedelsesaktoer),
    post: (overtraedelsesaktoer) => post(overtraedelsesaktoer),
}

export default overtraedelsesaktoerApi
