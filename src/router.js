
import store from './store/store.js'
import Home2 from './views/Home2.vue'

import ListaProductosView from './views/productos/producto/ListaProductosView.vue'
import StockProductosView from './views/productos/producto/StockProductosView.vue'
import PreciosProductosView from './views/productos/producto/PreciosProductosView.vue'
import ControlStockProductosView from './views/productos/producto/ControlStockProductosView.vue'
import EditProductoView from './views/productos/producto/EditProductoView.vue'
import EditClienteView from './views/clientes/EditClienteView.vue'
import NewProductoView from './views/productos/producto/NewProductoView.vue'

import NewClienteView from './views/clientes/NewClienteView.vue'
import NewPuntoLimpiezaClienteView from './views/clientes/NewPuntoLimpiezaClienteView.vue'

import ListaTipoProductosView from './views/productos/tipoProducto/ListaTipoProductosView.vue'
import EditTipoProductoView from './views/productos/tipoProducto/EditTipoProductoView.vue'
import NewTipoProductoView from './views/productos/tipoProducto/NewTipoProductoView.vue'

import NewFacturaCompra from './views/facturaCompra/NewFacturaCompraView.vue'
import ListaFacturaCompraView from './views/facturaCompra/ListaFacturaCompraView.vue'
import ListaProveedoresView from './views/proveedores/ListaProveedoresView.vue'
import NewProveedorView from './views/proveedores/NewProveedorView.vue'

import ListaClientesView from './views/clientes/ListaClientesView.vue'

import ReporteConsumoClientesView from './views/reportes/ReporteConsumoClientesView.vue'

import NewEntregaProductoView from './views/productos/entregaProducto/NewEntregaProductoView.vue'
import NewDevolucionProductoView from './views/productos/entregaProducto/NewDevolucionProductoView.vue'
import ListaEntregaClienteView from './views/productos/entregaProducto/ListaEntregaClienteView.vue'

import Auth from './views/login/Auth.vue'
import AccessNotAllowed from './views/login/AccessNotAllowed.vue'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/auth')
}

const ifisAdminUser = (to, from, next) => {
  if (store.getters.isAuthenticated && store.getters.isAdminUser) {
    next()
    return
  }
  next('/accessNotAllowed')
}


export const routes = [
  {
    path: '/',
    name: 'home2',
    component: Home2,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/accessNotAllowed',
    name: 'AccessNotAllowed',
    component: AccessNotAllowed
  },
  {
    path: '/productos',
    name: 'listaProductosView',
    component: ListaProductosView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/stockProductos',
    name: 'StockProductosView',
    component: StockProductosView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/preciosProductos',
    name: 'PreciosProductosView',
    component: PreciosProductosView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/controlStockProductosView',
    name: 'ControlStockProductosView',
    component: ControlStockProductosView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/newProducto',
    name: 'NewProducto',
    component: NewProductoView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/newClienteView',
    name: 'NewClienteView',
    component: NewClienteView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/newPuntoLimpiezaClienteView',
    name: 'NewPuntoLimpiezaClienteView',
    component: NewPuntoLimpiezaClienteView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/newTipoProductoView',
    name: 'NewTipoProductoView',
    component: NewTipoProductoView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/newProveedorView',
    name: 'NewProveedorView',
    component: NewProveedorView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/newEntregaProductoView',
    name: 'NewEntregaProductoView',
    component: NewEntregaProductoView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/newDevolucionProductoView/:entregaId',
    name: 'newDevolucionProductoView',
    component: NewDevolucionProductoView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/listaEntregaClienteView',
    name: 'ListaEntregaClienteView',
    component: ListaEntregaClienteView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/reporteConsumoClientesView',
    name: 'ReporteConsumoClientesView',
    component: ReporteConsumoClientesView,
    beforeEnter: ifisAdminUser
  },
  {
    path: '/listaFacturasCompra',
    name: 'ListaFacturaCompraView',
    component: ListaFacturaCompraView,
    beforeEnter: ifAuthenticated
  },

  {
    path: '/listaProveedores',
    name: 'ListaProveedoresView',
    component: ListaProveedoresView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/listaClientes',
    name: 'ListaClientesView',
    component: ListaClientesView,
    beforeEnter: ifisAdminUser
  },

  {
    path: '/tipoProductos',
    name: 'listaTipoProductosView',
    component: ListaTipoProductosView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/productos/:productoId/edit',
    name: 'editProductoView',
    component: EditProductoView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/tipoProductos/:tipoProductoId/edit',
    name: 'editTipoProductoView',
    component: EditTipoProductoView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/clientes/:clienteId/edit',
    name: 'editClienteView',
    component: EditClienteView,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/newFacturaCompra',
    name: 'newFacturaCompra',
    component: NewFacturaCompra,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ './views/About.vue')
  }
]
