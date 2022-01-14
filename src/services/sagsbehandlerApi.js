import instance from './instance'

const BASE_ENDPOINT = '/UserDepartments/myDepartment/'

const fetchAll = () => (
  instance({
    method: 'GET',
    url: BASE_ENDPOINT,
  })
)

const sagsbehandlerApi = {
  fetchAll: () => fetchAll()
}

export default sagsbehandlerApi