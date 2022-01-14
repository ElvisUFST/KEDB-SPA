import instance from './instance'

const BASE_ENDPOINT = '/kontrolrapport/'

const fetchAll = () => (
  instance({
    method: 'GET',
    url: BASE_ENDPOINT,
  })
)

const fetchByFilter = (filter) => (
  instance({
    method: 'GET',
    url: BASE_ENDPOINT + filter
  })
)

const fetchById = (id) => (
  instance({
    method: 'GET',
    url: BASE_ENDPOINT + id
  })
)

const put = (id, kontrolrapport) => (
  instance({
    method: 'PUT',
    url: BASE_ENDPOINT + id,
    data: kontrolrapport,
  })
)

const fetchToldsteder = () => (
  instance({
    method: 'GET',
    url: BASE_ENDPOINT + 'toldsteder'
  })
)

const kontrolrapportApi = {
    fetchAll: () => fetchAll(),
    fetchByFilter: (filter) => fetchByFilter(filter),
    fetchById: (id) => fetchById(id),
    put: (id, kontrolrapport) => put(id, kontrolrapport),
    fetchToldsteder: () => fetchToldsteder(),
}

export default kontrolrapportApi
