import axios from 'axios'
// import { clientesDatabase, puntosLimpiezaClienteDatabase } from './database.js'

const state = {
  clientes: [],
  puntosLimpiezaCliente: []
}

const mutations = {

  SET_CLIENTES: (state, clientes) => {
    state.clientes = clientes
  },

  SET_PUNTOS_LIMPIEZA_CLIENTE: (state, puntosLimpiezaCliente) => {
    state.puntosLimpiezaCliente = puntosLimpiezaCliente
  }
}

const actions = {
  GET_CLIENTES: async (context) => {
    // context.commit('SET_CLIENTES', clientesDatabase)
    const path = 'http://localhost:8000/api/v1.0/clientes/'
    axios.get(path).then((response) => {
      context.commit('SET_CLIENTES', response.data)
    })
      .catch((error) => {
        console.log(error)
      })
  },

  GET_PUNTOS_LIMPIEZA_CLIENTE: async (context) => {
    // context.commit('SET_PUNTOS_LIMPIEZA_CLIENTE', puntosLimpiezaClienteDatabase)
    const path = 'http://localhost:8000/api/v1.0/puntosLimpiezaCliente/'
    axios.get(path).then((response) => {
      context.commit('SET_PUNTOS_LIMPIEZA_CLIENTE', response.data)
    })
      .catch((error) => {
        console.log(error)
      })
  }
}

const getters = {
  CLIENTES: state => {
    return state.clientes
  },

  PUNTOS_LIMPIEZA_CLIENTE: state => {
    return state.puntosLimpiezaCliente
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
