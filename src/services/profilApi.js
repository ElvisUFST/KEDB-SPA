import instance from './instance'

const BASE_ENDPOINT = '/profil/'

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

const put = (id, profil) => (
  instance({
    method: 'PUT',
    url: BASE_ENDPOINT + id,
    data: profil,
  })
)

const post = (profil) => (
  instance({
    method: 'POST',
    url: BASE_ENDPOINT,
    data: profil,
  })
)

const profilApi = {
  fetchAll: () => fetchAll(),
  fetchById: (id) => fetchById(id),
  put: (id, profil) => put(id, profil),
  post: (profil) => post(profil),
}

export default profilApi
  