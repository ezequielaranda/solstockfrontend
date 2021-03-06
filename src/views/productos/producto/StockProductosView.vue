<template>
   <b-container class="mt-3">
         <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/productos">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Stock de Productos</b-breadcrumb-item>
          </b-breadcrumb>
      <!--b-button pill variant="outline-success" to="/controlStockProductosView" size="sm" class="mb-2 mr-2">
      <b-icon icon="kanban"></b-icon>Control de Stock</b-button-->
      <div class="shadow border-top my-3"></div>
      <b-pagination v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="tablaProductos"
                    size="sm"
                    pills
                    align="right">
      </b-pagination>
      <b-table id="tablaProductos" caption-top
                                   small
                                   empty-text="No se han detectado movimientos de stock"
                                   show-empty
                                   :busy="isBusy"
                                   :per-page="perPage"
                                   :current-page="currentPage"
                                   head-row-variant="secondary"
                                   :items="listaProductos"
                                   :fields="fields"
                                   :tbody-tr-class="rowClass"
                                   class="shadow">
        <template v-slot:table-caption>
          <b-img blank blank-color="#ECA9A7" width="14" height="16" alt="placeholder"></b-img>
            Productos con stock menor o igual a CERO
        </template>
        <template v-slot:cell(action)="row" >
          <b-row class="justify-content-md-center">
            <b-button pill size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
              <b-icon icon="plus"></b-icon>Agregar movimiento manual de stock
          </b-button>
          </b-row>
        </template>
        <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Cargando...</strong>
        </div>
      </template>
      </b-table>

      <b-modal
          size="lg"
          :id="infoModal.id"
          ref="modal"
          title="Movimiento manual de Stock"
          @hide="resetInfoModal"
        >
        <b-input-group size="sm" class="mb-1">
          <template v-slot:prepend>
            <b-input-group-text class="bg-info"><strong class="text-white">Producto:</strong></b-input-group-text>
          </template>
          <b-form-input class="bg-white text-left" disabled :value="infoModal.content.nombre_completo"></b-form-input>
        </b-input-group>
        <b-input-group size="sm" class="mb-1">
          <template v-slot:prepend>
            <b-input-group-text class="bg-info"><strong class="text-white">Stock actual:</strong></b-input-group-text>
          </template>
          <b-form-input class="bg-white text-left" disabled :value="infoModal.content.total_stock"></b-form-input>
        </b-input-group>
        <div class="shadow border-top my-3"></div>
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label-cols-lg="2" label="Movimiento:">
              <b-form-radio-group
                id="btn-radios-2"

                v-model="tipoMovimiento"
                :options="optionsMovimiento"
                buttons
                button-variant="outline-info"
                size="sm"
                name="radio-btn-outline"
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group
              label-cols-lg="2"
              :state="stateCantidadManual"
              label="Cantidad:"
              label-for="name-input"
              invalid-feedback="Ingrese la cantidad"
            >
              <b-form-input
                id="name-input"
                v-model="cantidadManual"
                :state="stateCantidadManual"
              ></b-form-input>
            </b-form-group>
          </form>

       <template v-slot:modal-footer>
        <div align="center" class="w-100">
          <b-button class=" mr-2" pill variant="outline-success" size="sm" @click="handleOk"> <b-icon icon="check-box"></b-icon>Aceptar</b-button>
          <b-button class=" mr-2" pill variant="outline-secondary" size="sm" @click="resetInfoModal">Cerrar</b-button>
        </div>
      </template>
    </b-modal>

    </b-container>
</template>

<script>
import { getStockProductos } from '@/services/api/productos.js'
import { addStockItemFacturaCompra } from '@/services/api/facturasCompra.js'
export default {
  name: 'StockProductosView',
  data () {
    return {
      isBusy: false,
      perPage: 8,
      currentPage: 1,
      listaProductos: [],
      rows: 0,
      fields: [
        { key: 'nombre_completo', label: 'Nombre Completo', sortable: true },
        { key: 'total_stock', label: 'Stock Actual de Producto', class: 'text-center' },
        { key: 'action', label: '' }
      ],
      optionsMovimiento: [
        { text: 'ENTRADA de stock', value: 'ST_IN' },
        { text: 'SALIDA de stock', value: 'ST_OUT' }
      ],
      tipoMovimiento: 'ST_IN',
      cantidadManual: null,
      infoModal: {
        id: 'info-modal',
        content: ''
      }
    }
  },

  computed: {
    stateCantidadManual () { return this.cantidadManual > 0 }
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
    },

    checkFormValidity () {
      return this.stateCantidadManual
    },
    resetInfoModal () {
      this.cantidadManual = null
      this.infoModal.content = ''
      this.$root.$emit('bv::hide::modal', this.infoModal.id)
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkFormValidity()) { return }

      let dataStock = {}
      dataStock.fecha_alta = new Date().toISOString().substring(0, 10)
      dataStock.cantidad = this.tipoMovimiento === 'ST_IN' ? this.cantidadManual : -this.cantidadManual
      dataStock.estacion_kanban = this.tipoMovimiento
      dataStock.estado = 0
      dataStock.producto = this.infoModal.content.id
      console.log(dataStock)
      addStockItemFacturaCompra(dataStock)
      this.$nextTick(() => {
        this.fetchData()
        this.$root.$emit('bv::hide::modal', this.infoModal.id)
      })
    },
    info (item, index, button) {
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    }

  },

  mounted () {
    this.fetchData()
  }
}
</script>
