import instance from './instance'

const BASE_ENDPOINT = '/rubrikmuligfejl/'

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

const post = (rubrikMuligFejl) => (
  instance({
    method: 'POST',
    url: BASE_ENDPOINT,
    data: rubrikMuligFejl,
  })
)

const deleteMuligFejl = (rubriktypeId, profilId, fejltekstId) => (
  instance({
    method: 'DELETE',
    url: BASE_ENDPOINT + rubriktypeId + "/" + profilId + "/" + fejltekstId,
    data: {
      rubriktypeId,
      profilId,
      fejltekstId,
    }
  })  
)

const rubrikMuligFejlApi = {
  fetchAll: () => fetchAll(),
  fetchById: (id) => fetchById(id),
  post: (rubrikMuligFejl) => post(rubrikMuligFejl),
  delete: (rubriktypeId, profilId, fejltekstId) => deleteMuligFejl(rubriktypeId, profilId, fejltekstId),
}

export default rubrikMuligFejlApi
  