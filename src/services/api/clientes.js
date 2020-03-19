import httpClient from './httpClient'

const END_POINT_CLIENTE = 'clientes/'
const END_POINT_PUNTO_LIMPIEZA_CLIENTE = 'puntosLimpiezaCliente/'
const END_POINT_ENTREGA_CLIENTE = 'entregasCliente/'
const END_POINT_ITEMS_ENTREGA_CLIENTE = 'itemEntregaCliente/'


const getPuntoLimpiezaCliente = (puntoLimpiezaClienteId) => httpClient.get(END_POINT_PUNTO_LIMPIEZA_CLIENTE + puntoLimpiezaClienteId)
const getPuntosLimpiezaCliente = (clienteId) => httpClient.get(END_POINT_PUNTO_LIMPIEZA_CLIENTE, { params: { cliente: clienteId } })
const addPuntoLimpiezaCliente = (formPuntoLimpiezaCliente) => httpClient.post(END_POINT_PUNTO_LIMPIEZA_CLIENTE, formPuntoLimpiezaCliente)
const editPuntoLimpiezaCliente = (formPuntoLimpiezaCliente) => httpClient.put(END_POINT_PUNTO_LIMPIEZA_CLIENTE + formPuntoLimpiezaCliente.id + '/', formPuntoLimpiezaCliente)
const deletePuntoLimpiezaCliente = (puntoLimpiezaClienteId) => httpClient.delete(END_POINT_PUNTO_LIMPIEZA_CLIENTE + puntoLimpiezaClienteId + '/')

const getEntregasCliente = () => httpClient.get(END_POINT_ENTREGA_CLIENTE)
const getEntregaCliente = (entregaId) => httpClient.get(END_POINT_ENTREGA_CLIENTE + entregaId)
const addEntregaCliente = async (entregaCliente) => httpClient.post(END_POINT_ENTREGA_CLIENTE, entregaCliente)
const addItemEntregaCliente = async (itemEntregaCliente) => httpClient.post(END_POINT_ITEMS_ENTREGA_CLIENTE, itemEntregaCliente)
const deleteEntregaCliente = (entregaId) => httpClient.delete(END_POINT_ENTREGA_CLIENTE + entregaId + '/')

const getClientes = () => httpClient.get(END_POINT_CLIENTE)
const getClienteById = (clienteId) => httpClient.get(END_POINT_CLIENTE + clienteId + '/')
const addCliente = (formCliente) => httpClient.post(END_POINT_CLIENTE, formCliente)
const editCliente = (formCliente) => httpClient.put(END_POINT_CLIENTE + formCliente.id + '/', formCliente)
const deleteCliente = (clienteId) => httpClient.delete(END_POINT_CLIENTE + clienteId + '/')



// const addStockItemEntregaCliente = async (stockItemEntregaCliente) => httpClient.post(END_POINT_STOCK_PRODUCTO, stockItemFacturaCompra)

export {
  getClientes,
  getPuntosLimpiezaCliente,
  getEntregaCliente,
  addEntregaCliente,
  addItemEntregaCliente,
  getEntregasCliente,
  getPuntoLimpiezaCliente,
  addCliente,
  addPuntoLimpiezaCliente,
  deleteEntregaCliente,
  editCliente,
  deleteCliente,
  editPuntoLimpiezaCliente,
  deletePuntoLimpiezaCliente,
  getClienteById

}
