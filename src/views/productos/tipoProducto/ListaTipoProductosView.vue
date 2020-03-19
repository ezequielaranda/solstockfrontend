<template>
  <b-container class="mt-3">
         <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/productos">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
            <b-breadcrumb-item active href="#home">
              Lista de Tipos de Producto
            </b-breadcrumb-item>
          </b-breadcrumb>
      <b-row align-h="between">
        <b-col>
          <b-button pill variant="outline-success" to="/newTipoProductoView" size="sm" class="shadow mb-2 mr-2">
            <b-icon icon="plus"></b-icon>Nuevo Tipo de Producto
          </b-button>
        </b-col>
        <b-col align="right">
        </b-col>
      </b-row>

  <div class="shadow border-top my-3"></div>
    <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="listaTipoProductosTable"
                class="mb-2 mt-2"
                size="sm"
                pills
                align="right"
              ></b-pagination>
    <b-table id="listaTipoProductosTable"
             :current-page="currentPage"
             :per-page="perPage"
             striped
             small
             hover
             head-variant="dark"
             :items="tipoProductos"
             :fields="fields"
             class="shadow mt-2">
        <template v-slot:cell(action)="row" >
          <b-row class="justify-content-md-center">
            <b-button pill
                      size="sm"
                      variant="info"
                      class="mr-2"
                      :to="{ name:'editTipoProductoView', params: {tipoProductoId: row.item.id} }">
                      <b-icon icon="pencil"></b-icon>Editar</b-button>
            <b-button pill
                      size="sm"
                      variant="outline-danger"
                      @click='deleteTipoProducto(row.item.id)'>
                      <b-icon icon="trash"></b-icon>Eliminar</b-button>
          </b-row>
        </template>

      </b-table>
  </b-container>
</template>

<script>
import swal from 'sweetalert'
import { getTiposProducto, deleteTipoProducto } from '@/services/api/productos.js'

export default {
  name: 'listaTipoProductosView',
  data () {
    return {
      perPage: 8,
      currentPage: 1,
      fields: [
        { key: 'descripcion', label: 'Descripción' },
        { key: 'codigo', label: 'Código' },
        { key: 'action', label: '' }
      ],
      tipoProductos: []
    }
  },
  created () {
    // this.tipoProductos = this.$store.getters.TIPO_PRODUCTOS
  },

  mounted () {
    // this.showInfo = false
    this.fetchData()
  },
  computed: {
    rows () {
      return this.tipoProductos.length
    }
  },

  methods: {

    deleteTipoProducto (tipoProductoId) {
      swal('Está seguro de eliminar el Tipo de Producto seleccionado?', {
        buttons: {
          cancel: 'Cancelar',
          catch: {
            text: 'Aceptar',
            value: 'catch'
          }
        },
        icon: 'warning'
      })
        .then((value) => {
          switch (value) {
            case 'catch':
              deleteTipoProducto(tipoProductoId).then(response => { this.fetchData() })
              // this.$store.dispatch('DELETE_TIPO_PRODUCTO', tipoProductoId)
              break
          }
        })
    },
    fetchData () {
      getTiposProducto()
        .then(response => {
          this.showInfo = true
          this.tipoProductos = response.data
          // this.rows = this.clientes.length
        })
        .catch(error => console.log(error))
        .finally(() => { })
    }

  }
}
</script>
