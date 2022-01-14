import instance from './instance'

const BASE_ENDPOINT = '/ToldrapportFejlKategori/'

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

const put = (id, fejlkategori) => (
  instance({
    method: 'PUT',
    url: BASE_ENDPOINT + id,
    data: fejlkategori,
  })
)

const post = (fejlkategori) => (
  instance({
    method: 'POST',
    url: BASE_ENDPOINT,
    data: fejlkategori,
  })
)

const fejlkategoriApi = {
    fetchAll: () => fetchAll(),
    fetchById: (id) => fetchById(id),
    put: (id, fejlkategori) => put(id, fejlkategori),
    post: (fejlkategori) => post(fejlkategori),
}

export default fejlkategoriApi
