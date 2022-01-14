import instance from './instance'

const BASE_ENDPOINT = '/toldrapportTransportmiddel/'

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

const put = (id, transportmiddel) => (
  instance({
    method: 'PUT',
    url: BASE_ENDPOINT + id,
    data: transportmiddel
  })
)

const post = (transportmiddel) => (
  instance({
    method: 'POST',
    url: BASE_ENDPOINT,
    data: transportmiddel,
  })
)

const transportmiddelApi = {
    fetchAll: () => fetchAll(),
    fetchById: (id) => fetchById(id),
    put: (id, transportmiddel) => put(id, transportmiddel),
    post: (transportmiddel) => post(transportmiddel),
}

export default transportmiddelApi
