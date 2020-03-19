<template>
  <b-container class="mt-3">
        <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/listaProveedores">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Proveedores
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Listado de Facturas de Compra</b-breadcrumb-item>
        </b-breadcrumb>
    <b-row align-h="between">
        <b-col>
          <b-button pill size='sm' variant="outline-success" to="/newFacturaCompra" class="shadow mb-2">
          <b-icon icon="plus"></b-icon>Nueva Factura de Compra</b-button>
        </b-col>
        <b-col align="right">
        </b-col>
    </b-row>
  <div class="shadow border-top my-3"></div>
     <b-pagination pills
                   v-model="currentPage"
                   :total-rows="totalRows"
                   :per-page="perPage"
                   align="right"
                   aria-controls="tablaFacturasCompra"
                   size="sm">
      </b-pagination>

    <b-table
      id="tablaFacturasCompra"
      show-empty
      small
      bordered
      head-row-variant="secondary"
      stacked="sm"
      :items="listaFacturasCompraAPI"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
      empty-text="No se han encontrado Facturas de Compra"
      class="shadow"
    >
      <template v-slot:cell(actions)="row">
        <b-row class="justify-content-md-center">
          <b-button pill size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          <b-icon icon="eye"></b-icon>Ver detalles</b-button>
        <b-button pill size="sm" variant="outline-danger" @click='deleteFactura(row.item.id)'>
            <b-icon icon="trash"></b-icon>
            Eliminar</b-button>
        </b-row>
      </template>
    </b-table>

    <b-modal :id="infoModal.id"
             title="Detalle de Factura"
             size="xl"
             scrollable
             centered
             header-bg-variant="info"
             header-text-variant="light"
             footer-bg-variant="light"
             footer-text-variant="light"
             @hide="resetInfoModal">
      <b-row class="bg-light">
        <b-col><p class="text-dark mt-3 thick">Proveedor: <b-badge variant="info">{{ infoModal.proveedor.nombre_completo }}</b-badge></p></b-col>
        <b-col><p class="text-dark mt-3 thick">C.U.I.T.: <b-badge variant="info">{{ infoModal.proveedor.cuit }}</b-badge></p></b-col>
        <b-col><p class="text-dark mt-3 thick">Fecha de Factura: <b-badge variant="info">{{ infoModal.content.fecha_factura_compra }}</b-badge></p></b-col>
      </b-row>
      <div class="shadow border-top my-3"></div>
      <b-table small striped bordered :fields="fieldsModal" :items="infoModal.content.itemsFactura"></b-table>
      <div class="shadow border-top my-3"></div>

        <b-row cols="1">
            <b-col lg="3" offset-lg="9">
              <b-input-group size="sm" class="mb-0">
                  <template v-slot:prepend>
                    <b-input-group-text class="bg-info"><strong class="text-white">Subtotal:</strong></b-input-group-text>
                  </template>
                  <b-form-input class="bg-light text-right" disabled :value="infoModal.content.importe_neto_gravado | money"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col lg="3" offset-lg="9">
              <b-input-group size="sm" class="mb-0">
                <template v-slot:prepend>
                  <b-input-group-text class="bg-info"><strong class="text-white">IVA 27%:</strong></b-input-group-text>
                </template>
                <b-form-input class="bg-light text-right" disabled :value="infoModal.content.iva27 | money"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col lg="3" offset-lg="9">
                <b-input-group size="sm" class="mb-1">
                  <template v-slot:prepend>
                    <b-input-group-text class="bg-info"><strong class="text-white">IVA 21%:</strong></b-input-group-text>
                  </template>
                  <b-form-input class="bg-light text-right" disabled :value="infoModal.content.iva21 | money"></b-form-input>
                </b-input-group>
            </b-col>
        </b-row>
        <div class="border-top my-1"></div>
        <b-row cols="1">
          <b-col lg="3" offset-lg="9">
            <b-input-group size="md" class="mb-1">
              <template v-slot:prepend>
                <b-input-group-text class="bg-dark"><strong class="text-white">Total:</strong></b-input-group-text>
              </template>
              <b-form-input class="bg-light text-right" disabled :value="infoModal.content.iva21 + infoModal.content.iva27 + infoModal.content.importe_neto_gravado | money"></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>

      <template v-slot:modal-footer>
        <div align="right" class="w-100">
          <b-button pill variant="secondary" size="sm" @click="resetInfoModal">Cerrar</b-button>
        </div>
      </template>
    </b-modal>
  </b-container>

</template>

<script>
import { getFacturasCompraAPI, deleteFacturaCompra } from '@/services/api/facturasCompra.js'
import { getProveedor } from '@/services/api/proveedores.js'
import swal from 'sweetalert'

export default {
  name: 'ListaFacturaCompraView',
  filters: {
    money: (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)
  },
  data () {
    return {

      listaFacturasCompraAPI: [],
      loading: true,

      fields: [
        { key: 'nombre_proveedor', label: 'Proveedor', sortable: true, class: 'text-left' },
        { key: 'fecha_factura_compra', label: 'Fecha de Compra', sortable: true, class: 'text-center' },
        { key: 'importe_total', label: 'Importe Total', sortable: true, formatter: value => { return '$ ' + value }, class: 'text-center' },
        { key: 'actions', label: '' }
      ],
      fieldsModal: [
        { key: 'nombre_producto', label: 'Nombre de Producto' },
        { key: 'cantidad', label: 'Cantidad', sortable: true, class: 'text-center' },
        { key: 'precio_compra', label: 'Precio de Compra', formatter: value => { return '$ ' + value }, class: 'text-center' },
        { key: 'unidad_medida', label: 'Unidad de Medida', class: 'text-center' },
        { key: 'alicuotaIVA', label: '% I.V.A.', class: 'text-center' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 8,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
        proveedor: { }
      }
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },

    rows () {
      return this.listaFacturasCompraAPI.length
    }
  },
  mounted () {
    this.fetchData()
  },

  methods: {

    fetchData () {
      getFacturasCompraAPI()
        .then(response => {
          this.listaFacturasCompraAPI = response.data
          this.totalRows = response.data.length
          console.log('pasó')
        })
        .catch(error => console.log(error))
        .finally(() => { })
    },

    info (item, index, button) {
      getProveedor(item.proveedor).then((response) => { this.infoModal.proveedor = response.data })
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
      this.$root.$emit('bv::hide::modal', this.infoModal.id)
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    deleteFactura (facturaId) {
      swal('Está seguro de eliminar la Factura de Compra seleccionada?', {
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
              deleteFacturaCompra(facturaId).then(response => {
                console.log('dentro del delete')
                this.fetchData()
              }

              )
              // this.$store.dispatch('DELETE_TIPO_PRODUCTO', facturaId)
              break
          }
        })
    }
  }

}
</script>

<style scoped>
  .thick {
    font-size: 20px;
    color: white;
  }
</style>
