import httpClient from './httpClient'

const END_POINT_PROVEEDOR = 'proveedores/'

const getProveedores = () => httpClient.get(END_POINT_PROVEEDOR)
const getProveedor = (proveedorId) => httpClient.get(END_POINT_PROVEEDOR + proveedorId)

const addProveedor = (formProveedor) => httpClient.post(END_POINT_PROVEEDOR, formProveedor)
const editProveedor = (formProveedor) => httpClient.put(END_POINT_PROVEEDOR + formProveedor.id + '/', formProveedor)
const deleteProveedor = (proveedorId) => httpClient.delete(END_POINT_PROVEEDOR + proveedorId + '/')
const getProveedorById = (proveedorId) => httpClient.get(END_POINT_PROVEEDOR + proveedorId + '/')

export {
  getProveedores,
  getProveedor,
  addProveedor,
  editProveedor,
  deleteProveedor,
  getProveedorById
}
