import axios from 'axios'
import swal from 'sweetalert'

const state = {
  tipoProductos: [],
  path: 'http://localhost:8000/api/v1.0/tiposproducto/'
}

const mutations = {
  SET_TIPO_PRODUCTOS: (state, tipoProductos) => {
    state.tipoProductos = tipoProductos
  },

  ADD_NEW_TIPO_PRODUCTO: (state, tipoProducto) => {
    axios.post(state.path, tipoProducto).then((response) => {
      state.tipoProductos.push(response.data)
      swal('Tipo de Producto creado exitosamente!', '', 'success')
    })
      .catch((error) => { console.log(error) })
  },

  EDIT_TIPO_PRODUCTO: (state, tipoProducto) => {
    axios.put(state.path + tipoProducto.id + '/', tipoProducto).then((response) => {
      const objIndex = state.tipoProductos.findIndex(obj => obj.id === response.data.id)
      state.tipoProductos[objIndex].codigo = response.data.codigo
      state.tipoProductos[objIndex].descripcion = response.data.descripcion
      swal('Tipo de Producto actualizado exitosamente!', '', 'success')
    })
      .catch((error) => { console.log(error) })
  },

  DELETE_TIPO_PRODUCTO: (state, tipoProductoId) => {
    axios.delete(state.path + tipoProductoId + '/').then((response) => {
      const objIndex = state.tipoProductos.findIndex(obj => obj.id === response.data.id)
      state.tipoProductos.splice(objIndex, 1)
      swal('Tipo de Producto eliminado exitosamente!', '', 'success')
    })
      .catch((error) => { swal('El Tipo de Producto no pudo ser eliminado ', '', 'error') })
  }

}

const actions = {
  GET_TIPO_PRODUCTOS: (context) => {
    axios.get(state.path).then((response) => {
      context.commit('SET_TIPO_PRODUCTOS', response.data)
    })
      .catch((error) => { console.log(error) })
  },

  ADD_NEW_TIPO_PRODUCTO: (context, data) => {
    context.commit('ADD_NEW_TIPO_PRODUCTO', data)
  },

  EDIT_TIPO_PRODUCTO: (context, data) => {
    context.commit('EDIT_TIPO_PRODUCTO', data)
  },

  DELETE_TIPO_PRODUCTO: (context, data) => {
    context.commit('DELETE_TIPO_PRODUCTO', data)
  }
}

const getters = {
  TIPO_PRODUCTOS: state => {
    return state.tipoProductos
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
