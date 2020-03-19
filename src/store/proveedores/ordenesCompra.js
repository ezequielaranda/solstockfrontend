// import axios from 'axios'
import { ordenesCompraDatabase } from './database.js'

const state = {
  ordenesCompra: []
}

const mutations = {

  SET_ORDENESCOMPRA: (state, ordenesCompra) => {
    state.ordenesCompra = ordenesCompra
  }
}

const actions = {
  ORDENESCOMPRA: async (context) => {
    context.commit('SET_ORDENESCOMPRA', ordenesCompraDatabase)
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
  ORDENESCOMPRA: state => {
    return state.ordenesCompra
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
