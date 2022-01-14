import instance from './instance'

const BASE_ENDPOINT = '/rubriktype/'

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

const put = (id, rubriktype) => (
  instance({
    method: 'PUT',
    url: BASE_ENDPOINT + id,
    data: rubriktype,
  })
)

const post = (rubriktype) => (
  instance({
    method: 'POST',
    url: BASE_ENDPOINT,
    data: rubriktype,
  })
)

const rubriktypeApi = {
  fetchAll: () => fetchAll(),
  fetchById: (id) => fetchById(id),
  put: (id, rubriktype) => put(id, rubriktype),
  post: (rubriktype) => post(rubriktype),
}

export default rubriktypeApi
