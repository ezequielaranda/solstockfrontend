import httpClient from './httpClient'

const END_POINT_PRODUCTO = 'productos/'
const END_POINT_STOCK_PRODUCTOS = 'stockProductosConsulta/'
const END_POINT_TIPO_PRODUCTO = 'tiposproducto/'
const END_POINT_FAMILIA_PRODUCTO = 'familiasproducto/'
const END_POINT_PRECIOS = 'preciosHistoricos/'
const END_POINT_PRECIOS_PRODUCTOS = 'preciosHistoricosProductos/'
const END_POINT_REPORTE_CONSUMO_CLIENTES = 'reporteEntregasAClientes/'



const getProductos = () => httpClient.get(END_POINT_PRODUCTO)
const getProductoById = (idProducto) => httpClient.get(END_POINT_PRODUCTO + idProducto + '/')
const getStockProductos = () => httpClient.get(END_POINT_STOCK_PRODUCTOS)
const getPreciosProductos = () => httpClient.get(END_POINT_PRECIOS_PRODUCTOS)
const addNewProducto = (formProducto) => httpClient.post(END_POINT_PRODUCTO, formProducto)
const editProducto = (formProducto) => httpClient.put(END_POINT_PRODUCTO + formProducto.id + '/', formProducto)
const deleteProducto = (productoId) => httpClient.delete(END_POINT_PRODUCTO + productoId + '/')

const getTiposProducto = () => httpClient.get(END_POINT_TIPO_PRODUCTO)
const addTipoProducto = (formTipoProducto) => httpClient.post(END_POINT_TIPO_PRODUCTO, formTipoProducto)
const getTipoProductoById = (idTipoProducto) => httpClient.get(END_POINT_TIPO_PRODUCTO + idTipoProducto + '/')
const editTipoProducto = (formTipoProducto) => httpClient.put(END_POINT_TIPO_PRODUCTO + formTipoProducto.id + '/', formTipoProducto)
const deleteTipoProducto = (tipoProductoId) => httpClient.delete(END_POINT_TIPO_PRODUCTO + tipoProductoId + '/')

const getFamiliasProducto = () => httpClient.get(END_POINT_FAMILIA_PRODUCTO)
const addFamiliaProducto = (formFamiliaProducto) => httpClient.post(END_POINT_FAMILIA_PRODUCTO, formFamiliaProducto)
const getFamiliaProductoById = (idFamiliaProducto) => httpClient.get(END_POINT_FAMILIA_PRODUCTO + idFamiliaProducto + '/')
const deleteFamiliaProducto = (familiaProductoId) => httpClient.delete(END_POINT_FAMILIA_PRODUCTO + familiaProductoId + '/')
const editFamiliaProducto = (formFamiliaProducto) => httpClient.put(END_POINT_FAMILIA_PRODUCTO + formFamiliaProducto.id + '/', formFamiliaProducto)

const addPrecioHistoricoProducto = (formPrecio) => httpClient.post(END_POINT_PRECIOS, formPrecio)

const getReporteConsumoClientes = (clienteId, fechaDesde, fechaHasta) => httpClient.get(END_POINT_REPORTE_CONSUMO_CLIENTES, {
  params: {
    cliente: clienteId,
    fechaDesde: fechaDesde,
    fechaHasta: fechaHasta
  }
})

// const getPuntosLimpiezaCliente = (clienteId) => httpClient.get(END_POINT_PUNTO_LIMPIEZA_CLIENTE, { params: { cliente: clienteId } })

export {
  getProductos,
  getStockProductos,
  getTiposProducto,
  getFamiliasProducto,
  addNewProducto,
  getPreciosProductos,
  addPrecioHistoricoProducto,
  getReporteConsumoClientes,
  editProducto,
  editTipoProducto,
  editFamiliaProducto,
  getProductoById,
  deleteProducto,
  deleteTipoProducto,
  deleteFamiliaProducto,
  getTipoProductoById,
  getFamiliaProductoById,
  addTipoProducto,
  addFamiliaProducto
}
