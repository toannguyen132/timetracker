import api from './service';

const services = {

  fetch() {
    return api.get('/api/projects')
  },

  findOne(id) {
    return api.get(`/api/projects/${id}`)
  },

}

export default services;