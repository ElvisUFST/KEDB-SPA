import instance from './instance'

const BASE_ENDPOINT = '/ToldrapportKommunikation/'

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

const put = (id, kommunikationsform) => (
  instance({
    method: 'PUT',
    url: BASE_ENDPOINT + id,
    data: kommunikationsform,
  })
)

const post = (kommunikationsform) => (
  instance({
    method: 'POST',
    url: BASE_ENDPOINT,
    data: kommunikationsform,
  })
)

const kommunikationApi = {
    fetchAll: () => fetchAll(),
    fetchById: (id) => fetchById(id),
    put: (id, kommunikationsform) => put(id, kommunikationsform),
    post: (kommunikationsform) => post(kommunikationsform),
}

export default kommunikationApi
