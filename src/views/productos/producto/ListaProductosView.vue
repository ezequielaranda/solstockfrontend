<template>
   <b-container class="mt-3">
         <b-breadcrumb class="shadow">
            <b-breadcrumb-item active>
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
          </b-breadcrumb>
      <b-row align-h="between">
        <b-col>
          <b-button pill variant="outline-success" to="/newProducto" size="sm" class="shadow mb-2">
            <b-icon icon="plus"></b-icon>Nuevo Producto
          </b-button>
        </b-col>
        <b-col align="right">
          <b-button pill variant="outline-secondary" to="/preciosProductos" size="sm" class="shadow mb-2 mr-2">
          <b-icon icon="table"></b-icon>Precios de Productos</b-button>
          <b-button pill variant="outline-secondary" to="/stockProductos" size="sm" class="shadow mb-2 mr-2">
          <b-icon icon="table"></b-icon>Stock de Productos</b-button>
          <b-button pill variant="outline-secondary" to="/listaEntregaClienteView" size="sm" class="shadow mb-2">
           <b-icon icon="table"></b-icon>Entregas a Clientes</b-button>
        </b-col>
      </b-row>

      <div class="shadow border-top my-3"></div>

      <b-pagination v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="tablaProductos"
                    size="sm"
                    pills
                    align="right"
                    >
      </b-pagination>
      <b-table id="tablaProductos"
               small
               hover
               head-row-variant="secondary"
               :items="listaProductos"
               :fields="fields"
               :per-page="perPage"
               :current-page="currentPage"
               :busy="isBusy"
               class="shadow"
               >
        <template v-slot:cell(action)="row" >
         <b-row class="justify-content-md-center">
            <b-button pill size="sm" variant="info" class="mr-2" :to="{ name:'editProductoView', params: {productoId: row.item.id} }">
                    <b-icon icon="pencil"></b-icon>Editar</b-button>
          <b-button pill size="sm" variant="outline-danger">
            <b-icon icon="trash"></b-icon>
            Eliminar</b-button>
         </b-row>
        </template>
        <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Cargando...</strong>
        </div>
      </template>
      </b-table>
    </b-container>
</template>

<script>
import { getProductos } from '@/services/api/productos.js'
export default {
  name: 'ListaProductosView',
  data () {
    return {
      isBusy: false,
      listaProductos: [],
      rows: 0,
      perPage: 8,
      currentPage: 1,
      fields: [
        { key: 'nombre_completo', label: 'Nombre Completo', sortable: true },
        { key: 'estado', label: 'Estado', sortable: false, class: 'text-center' },
        { key: 'nombre_proveedor', label: 'Proveedor', sortable: false, class: 'text-center' },
        { key: 'descripcion_tipo_producto', label: 'Tipo', sortable: false, class: 'text-center' },
        { key: 'descripcion_familia_producto', label: 'Familia', sortable: false, class: 'text-center' },
        { key: 'action', label: 'Acciones', sortable: false, class: 'text-center' }
      ]
    }
  },

  mounted () { this.fetchData() },

  methods: {
    fetchData () {
      this.isBusy = true
      getProductos()
        .then(response => {
          this.listaProductos = response.data
          this.rows = this.listaProductos.length
          this.isBusy = false
        })
        .catch(error => console.log(error))
    }

  }
}
</script>
