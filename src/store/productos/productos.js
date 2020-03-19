import axios from 'axios'
import swal from 'sweetalert'

const state = {
  productos: [],
  path: 'http://localhost:8000/api/v1.0/productos/'
}

const mutations = {

  SET_PRODUCTOS: (state, productos) => {
    state.productos = productos
  },

  ADD_NEW_PRODUCTO: (state, producto) => {
    console.log(producto)
    axios.post(state.path, producto).then((response) => {
      state.productos.push(response.data)
      swal('Producto creado exitosamente!', '', 'success')
    })
      .catch((error) => {
        // console.log(error)
        swal(error.toString(), '', 'error')
      })
  },

  EDIT_PRODUCTO: (state, producto) => {
    axios.put(state.path + producto.id + '/', producto).then((response) => {
      console.log(response.data)
      const objIndex = state.productos.findIndex(obj => obj.id === response.data.id)
      state.productos[objIndex].nombre_completo = response.data.nombre_completo
      state.productos[objIndex].estado = response.data.estado
      state.productos[objIndex].factor_multiplicacion = response.data.factor_multiplicacion
      state.productos[objIndex].proveedor = response.data.proveedor
      state.productos[objIndex].tipoProducto = response.data.tipoProducto
      state.productos[objIndex].familiaProducto = response.data.familiaProducto

      swal('Producto actualizado exitosamente!', '', 'success')
    })
      .catch((error) => { console.log(error) })
  }

}

const actions = {
  GET_PRODUCTOS: async (context) => {
  // context.commit('SET_PRODUCTOS', productosDatabase)
    const path = 'http://localhost:8000/api/v1.0/productos/'
    axios.get(path).then((response) => {
      context.commit('SET_PRODUCTOS', response.data)
    })
      .catch((error) => {
        console.log(error)
      })
  },

  ADD_NEW_PRODUCTO: async (context, data) => {
    context.commit('ADD_NEW_PRODUCTO', data)
  },

  EDIT_PRODUCTO: (context, data) => {
    context.commit('EDIT_PRODUCTO', data)
  }

}

const getters = {
  PRODUCTOS: state => {
    return state.productos
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
