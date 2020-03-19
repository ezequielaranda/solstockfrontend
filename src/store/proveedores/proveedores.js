// import axios from 'axios'
import { proveedoresDatabase } from './database.js'

const state = {
  proveedores: []
}

const mutations = {

  SET_PROVEEDORES: (state, proveedores) => {
    state.proveedores = proveedores
  }
}

const actions = {
  GET_PROVEEDORES: async (context) => {
    context.commit('SET_PROVEEDORES', proveedoresDatabase)
  //  const path = 'http://localhost:8000/api/v1.0/productos/'
  //  axios.get(path).then((response) => {
  //    context.commit('SET_PROVEEDORES', response.data)
  //  })
  //    .catch((error) => {
  //      console.log(error)
  //    })
  }
}

const getters = {
  PROVEEDORES: state => {
    return state.proveedores
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
