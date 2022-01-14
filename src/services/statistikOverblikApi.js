import instance from './instance'

const BASE_ENDPOINT = '/StatistikOverblik/'

const fetchByFilter = (filter) =>
  instance({
    method: 'GET',
    url: BASE_ENDPOINT + filter,
  })

const fetchByYear = (year) =>
  instance({
    method: 'GET',
    url: BASE_ENDPOINT + year,
  })

const statistikOverblikApi = {
  fetchByYear: (year) => fetchByYear(year),
  fetchByFilter: (filter) => fetchByFilter(filter),
}

export default statistikOverblikApi
