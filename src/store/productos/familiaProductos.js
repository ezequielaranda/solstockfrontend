// import axios from 'axios'
import { familiaProductosDatabase } from './database.js'

const state = {
  familiaProductos: []
}

const mutations = {
  SET_FAMILIA_PRODUCTOS: (state, familiaProductos) => {
    state.familiaProductos = familiaProductos
  },

  ADD_NEW_FAMILIA_PRODUCTO: (state, familiaProducto) => {
    state.familiaProductos.push(familiaProducto)
    console.log(state.familiaProductos)
  }
}

const actions = {
  GET_FAMILIA_PRODUCTOS: (context) => {
    context.commit('SET_FAMILIA_PRODUCTOS', familiaProductosDatabase)
    // const path = 'http://localhost:8000/api/v1.0/familiasproducto/'
    // axios.get(path).then((response) => {
    //  context.commit('SET_familia_PRODUCTOS', response.data)
    // })
    //  .catch((error) => {
    //    console.log(error)
    //  })
  },

  ADD_NEW_FAMILIA_PRODUCTO: (context, data) => {
    context.commit('ADD_NEW_FAMILIA_PRODUCTO', data)
  }
}

const getters = {
  FAMILIA_PRODUCTOS: state => {
    return state.familiaProductos
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
