import Vue from 'vue'
import Vuex from 'vuex'

import productos from './productos/productos.js'
import tipoProductos from './productos/tipoProductos.js'
import clientes from './clientes/clientes.js'
import proveedores from './proveedores/proveedores.js'
import usuarios from './usuarios/usuarios.js'
import auth from './usuarios/auth.js'
import ordenesCompra from './proveedores/ordenesCompra.js'
import facturasCompra from './proveedores/facturasCompra.js'
import familiaProductos from './productos/familiaProductos.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    productos,
    tipoProductos,
    clientes,
    proveedores,
    ordenesCompra,
    familiaProductos,
    facturasCompra,
    usuarios,
    auth

  }
})
