import httpClient from './httpClient'

const END_POINT_FACTURA_COMPRA = 'facturasCompra/'
const END_POINT_ITEMS_FACTURA_COMPRA = 'itemsFacturaCompra/'
const END_POINT_STOCK_PRODUCTO = 'stockProductos/'

const getFacturasCompraAPI = () => httpClient.get(END_POINT_FACTURA_COMPRA)
const addFacturaCompra = async (facturaCompra) => httpClient.post(END_POINT_FACTURA_COMPRA, facturaCompra)
const addItemFacturaCompra = async (itemFacturaCompra) => httpClient.post(END_POINT_ITEMS_FACTURA_COMPRA, itemFacturaCompra)
const addStockItemFacturaCompra = async (stockItemFacturaCompra) => httpClient.post(END_POINT_STOCK_PRODUCTO, stockItemFacturaCompra)
const deleteFacturaCompra = (facturaId) => httpClient.delete(END_POINT_FACTURA_COMPRA + facturaId + '/')
export {
  getFacturasCompraAPI,
  addFacturaCompra,
  addItemFacturaCompra,
  addStockItemFacturaCompra,
  deleteFacturaCompra

}
