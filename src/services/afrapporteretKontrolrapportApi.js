import instance from './instance'

const BASE_ENDPOINT = '/kontrolrapport/afrapporterede/'

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

const afrapportedeKontrolrapportApi = {
    fetchAll: () => fetchAll(),
    fetchByFilter: (filter) => fetchByFilter(filter),
    fetchById: (id) => fetchById(id)
}

export default afrapportedeKontrolrapportApi
