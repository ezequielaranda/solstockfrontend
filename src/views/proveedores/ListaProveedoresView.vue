<template>
   <b-container class="mt-3">
        <b-breadcrumb class="shadow">
            <b-breadcrumb-item active href="#home">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Proveedores
            </b-breadcrumb-item>
        </b-breadcrumb>
      <b-button pill size="sm" variant="outline-success" to="/newProveedorView" class="shadow shadow mb-2 mr-2">
        <b-icon icon="plus"></b-icon>Nuevo Proveedor
      </b-button>
      <div class="shadow border-top my-3"></div>
      <b-pagination v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="tablaProveedores"
                    size="sm"
                    pills
                    align="right"
                    >

      </b-pagination>
      <b-table id="tablaProveedores"
               small
               hover
               head-row-variant="secondary"
               :items="proveedores"
               :fields="fields"
               :per-page="perPage"
               :current-page="currentPage"
               :busy="isBusy"
               class="shadow mt-2">
        <template v-slot:cell(action)="row" >
          <b-button pill
                    size="sm"
                    variant="info"
                    class="mr-2"
                    :to="{ name:'NewProveedorView', params: {proveedorId: row.item.id} }">
                    <b-icon icon="pencil"></b-icon>Editar</b-button>
          <b-button  class="ml-2" pill size="sm" variant="outline-danger" @click='deleteProveedor(row.item.id)'>
            <b-icon icon="trash"></b-icon>
            Eliminar</b-button>
        </template>
      </b-table>
    </b-container>
</template>

<script>

import { getProveedores, deleteProveedor } from '@/services/api/proveedores.js'
import swal from 'sweetalert'

export default {
  name: 'ListaProveedoresView',
  data () {
    return {
      isBusy: false,
      perPage: 8,
      currentPage: 1,
      rows: 0,
      proveedores: [],
      fields: [
        { key: 'nombre_completo', label: 'Nombre Completo' },
        { key: 'razon_social', label: 'Razón Social' },
        { key: 'domicilio', label: 'Domicilio' },
        { key: 'ingresos_brutos', label: 'IIBB' },
        { key: 'condicionIVA', label: 'I.V.A.' },
        { key: 'cuit', label: 'CUIT' },
        { key: 'action', label: '' }
      ],
      itemsBreadcrumbs: [
        {
          text: 'Proveedores',
          to: { name: 'listaProveedoresView' },
          active: true
        },
        {
          text: 'Lista de Proveedores',
          active: true
        }
      ]
    }
  },

  mounted () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      getProveedores()
        .then(response => {
          this.proveedores = response.data
          this.rows = this.proveedores.length
        })
        .catch(error => console.log(error))
        .finally(() => { })
    },

    deleteProveedor (proveedorId) {
      swal('Está seguro de eliminar el Proveedor seleccionado?', {
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
              deleteProveedor(proveedorId).then(response => { this.fetchData() })
              break
          }
        })
    }

  }
}
</script>
