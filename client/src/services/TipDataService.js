import http from '../http-common'

class TipDataService {
  getAll() {
    return http.get('/tips')
  }
  get(id) {
    return http.get(`/tips/${id}`)
  }
  create(data) {
    return http.post('/tips', data)
  }

  update(id, data) {
    return http.put(`/tips/${id}`, data)
  }

  delete(id) {
    return http.delete(`/tips/${id}`)
  }

  deleteAll() {
    return http.delete(`/tips`)
  }

  findByTitle(title) {
    return http.get(`/tips?title=${title}`)
  }
}

export default new TipDataService()
