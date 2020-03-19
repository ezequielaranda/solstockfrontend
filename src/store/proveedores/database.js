export let proveedoresDatabase = [
  {
    'id': 1,
    'nombre_completo': 'Proveedor 01',
    'razon_social': 'Razón Social 01',
    'domicilio': 'Calle falsa 123',
    'ingresosBrutos': '1234567',
    'fechaInicioActividades': '2019-09-25',
    'condicionIVA': 'RI',
    'cuit': '3023456789'
  },
  {
    'id': 2,
    'nombre_completo': 'Proveedor de Toallas',
    'razon_social': 'Razon Social',
    'domicilio': 'General Lopez 3456',
    'ingresosBrutos': '34574-2',
    'fechaInicioActividades': '2019-10-24',
    'condicionIVA': 'RI',
    'cuit': '303456736'
  },
  {
    'id': 3,
    'nombre_completo': 'Proveedor de Rejillas',
    'razon_social': 'nueva empresa SH',
    'domicilio': 'Lopez y Planes 3456',
    'ingresosBrutos': '46789678',
    'fechaInicioActividades': '2019-10-24',
    'condicionIVA': 'EX',
    'cuit': '30456789'
  }
]

export let ordenesCompraDatabase = [
  {
    'id': 1,
    'fecha_orden_compra': '2019-12-04',
    'fecha_alta_orden': '2019-12-05',
    'proveedor': 1,
    'usuario_alta': 1
  }
]

export let itemsOrdenesCompraDatabase = [
  {
    'id': 1,
    'ordenCompra': 1,
    'producto': 1,
    'cantidad': 8
  },
  {
    'id': 2,
    'ordenCompra': 1,
    'producto': 2,
    'cantidad': 240
  },
  {
    'id': 3,
    'ordenCompra': 1,
    'producto': 3,
    'cantidad': 120
  }
]
