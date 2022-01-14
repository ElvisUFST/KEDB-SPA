import instance from './instance'

const BASE_ENDPOINT = '/fejltekst/'

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

const put = (id, fejltekst) => (
  instance({
    method: 'PUT',
    url: BASE_ENDPOINT + id,
    data: fejltekst,
  })
)

const post = (fejltekst) => (
  instance({
    method: 'POST',
    url: BASE_ENDPOINT,
    data: fejltekst
  })
)

const fejltekstApi = {
    fetchAll: () => fetchAll(),
    fetchById: (id) => fetchById(id),
    put: (id, fejltekst) => put(id, fejltekst),
    post: (fejltekst) => post(fejltekst),
}

export default fejltekstApi
