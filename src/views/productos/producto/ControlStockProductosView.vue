<template>
   <b-container class="mt-3">
         <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/productos">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
            <b-breadcrumb-item to="/stockProductos">Stock de Productos</b-breadcrumb-item>
            <b-breadcrumb-item active>Control de Stock</b-breadcrumb-item>
          </b-breadcrumb>
          <b-pagination v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="tablaProductos"
                    size="sm"
                    pills
                    align="right">
      </b-pagination>
      <b-table id="tablaProductos" caption-top
                                   bordered
                                   small
                                   hover
                                   show-empty
                                   empty-text="No se han detectado movimientos de stock"
                                   :per-page="perPage"
                                   :current-page="currentPage"
                                   head-variant="dark"
                                   :items="listaProductos"
                                   :fields="fields"
                                   :tbody-tr-class="rowClass"
                                   class="mt-2">
        <template v-slot:table-caption>
          <b-img blank blank-color="#ECA9A7" width="14" height="16" alt="placeholder"></b-img>
            Productos con stock menor o igual a CERO
        </template>
        <template v-slot:cell(cantidad)="row">
              <b-form-input
                   size="sm"
                   v-model.number="row.item.cantidad"
                   placeholder="Stock real">
             </b-form-input>
          </template>
        <template v-slot:cell(action)="row" >
          <span v-if="row.item.total_stock != row.item.cantidad">
            <b-row class="justify-content-md-center">
              <!--b-button pill
                        size="sm"
                        variant="primary"
                        class="mr-2"
                        :to="{ name:'editProductoView', params: {productoId: row.item.id} }">Editar</b-button-->
              <b-button pill size="sm" variant="secondary">Corregir Stock</b-button>
            </b-row>
          </span>
        </template>
      </b-table>
    </b-container>
</template>

<script>
import { getStockProductos } from '@/services/api/productos.js'
export default {
  name: 'ControlStockProductosView',
  data () {
    return {
      isBusy: false,
      perPage: 8,
      currentPage: 1,
      listaProductos: [],
      rows: 0,
      fields: [
        { key: 'nombre_completo', label: 'Nombre Completo' },
        { key: 'total_stock', label: 'Stock Actual en Sistema', class: 'text-center' },
        { key: 'cantidad', label: 'Stock Real en Depósito', class: 'text-center' },
        { key: 'action', label: '' }
      ]
    }
  },
  methods: {
    fetchData () {
      this.isBusy = true
      getStockProductos()
        .then(response => {
          this.isBusy = false
          this.listaProductos = response.data
          this.rows = this.listaProductos.length
        })
        .catch(error => console.log(error))
        .finally(() => { })
    },

    rowClass (item, type) {
      if (!item || type !== 'row') return
      if (item.total_stock <= 0) return 'table-danger'
    }

  },
  mounted () {
    this.fetchData()
  }
}
</script>
