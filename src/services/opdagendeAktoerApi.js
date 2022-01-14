import instance from './instance'

const BASE_ENDPOINT = '/ToldrapportOpdagendeAktoer/'

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

const put = (id, opdagendeAktoer) => (
  instance({
    method: 'PUT',
    url: BASE_ENDPOINT + id,
    data: opdagendeAktoer,
  })
)

const post = (opdagendeAktoer) => (
  instance({
    method: 'POST',
    url: BASE_ENDPOINT,
    data: opdagendeAktoer,
  })
)

const opdagendeAktoerApi = {
    fetchAll: () => fetchAll(),
    fetchById: (id) => fetchById(id),
    put: (id, opdagendeAktoer) => put(id, opdagendeAktoer),
    post: (opdagendeAktoer) => post(opdagendeAktoer),
}

export default opdagendeAktoerApi
