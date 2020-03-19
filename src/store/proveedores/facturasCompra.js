import axios from 'axios'
import swal from 'sweetalert'
// import { ordenesCompraDatabase } from './database.js'

const state = {
  facturasCompra: [],
  pathFacturasCompra: 'http://localhost:8000/api/v1.0/facturasCompra/',
  pathItemsFactura: 'http://localhost:8000/api/v1.0/itemsFacturaCompra/',
  pathStockProducto: 'http://localhost:8000/api/v1.0/stockProductos/'
}

const mutations = {

  SET_FACTURASCOMPRA: (state, facturasCompra) => {
    state.facturasCompra = facturasCompra
  },

  ADD_NEW_FACTURA_COMPRA: async (state, facturaCompra) => {
    axios.post(state.pathFacturasCompra, facturaCompra).then((responseFactura) => {
      facturaCompra.itemsFactura.forEach(element => {
        element.producto = element.productoObject.id
        element.facturaCompra = responseFactura.data.id
        axios.post(state.pathItemsFactura, element).then((responseItemFactura) => {
          let dataStock = {}
          dataStock.fecha_alta = responseFactura.data.fecha_alta_factura
          dataStock.cantidad = responseItemFactura.data.cantidad
          dataStock.estacion_kanban = 'ST_IN'
          dataStock.estado = 0
          dataStock.producto = responseItemFactura.data.producto
          console.log(dataStock)
          axios.post(state.pathStockProducto, dataStock).then((response) => {
          })
            .catch((error) => { console.log(error) })
        })
          .catch((error) => { console.log(error) })
      })
      swal('Factura de Compra creada exitosamente!', '', 'success')
    })
      .catch((error) => { console.log(error) })
  }
}

const actions = {
  GET_FACTURASCOMPRA: (context) => {
    axios.get(state.pathFacturasCompra).then((response) => {
      context.commit('SET_FACTURASCOMPRA', response.data)
    })
      .catch((error) => {
        console.log(error)
      })
  },
  ADD_NEW_FACTURA_COMPRA: async (context, data) => {
    context.commit('ADD_NEW_FACTURA_COMPRA', data)
  }
}

const getters = {
  FACTURASCOMPRA: state => {
    return state.facturasCompra
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
