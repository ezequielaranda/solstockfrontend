<template>

   <b-container class="mt-3">
      <!--div v-if="showInfo"-->
          <b-breadcrumb class="shadow">
            <b-breadcrumb-item active href="#home">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Clientes
            </b-breadcrumb-item>
          </b-breadcrumb>
       <b-row align-h="between">
        <b-col>
          <b-button pill variant="outline-success" to="/newClienteView" size="sm mr-2" class="shadow mb-2">
            <b-icon icon="plus"></b-icon>Nuevo Cliente
          </b-button>
          <b-button pill variant="outline-success" to="/newPuntoLimpiezaClienteView" size="sm" class="shadow mb-2">
            <b-icon icon="plus"></b-icon>Nuevo Punto de Limpieza
          </b-button>
        </b-col>

        <b-col align="right">
          <b-button pill variant="outline-secondary" to="/reporteConsumoClientesView" size="sm mr-2" class="shadow mb-2">
           <b-icon icon="table"></b-icon>Reporte de Entregas</b-button>
          <b-button pill variant="outline-secondary" to="/listaEntregaClienteView" size="sm" class="shadow mb-2">
           <b-icon icon="table"></b-icon>Entregas a Clientes</b-button>
        </b-col>
      </b-row>

      <div class="shadow border-top my-3"></div>
      <b-pagination v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="tablaClientes"
                    size="sm"
                    pills
                    align="right"
                    >

      </b-pagination>
      <b-table id="tablaClientes"
               small
               hover
               head-row-variant="secondary"
               :items="clientes"
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
                    :to="{ name:'editClienteView', params: {clienteId: row.item.id} }">
                    <b-icon icon="pencil"></b-icon>Editar</b-button>
          <b-button  class="ml-2" pill size="sm" variant="outline-danger" @click='deleteCliente(row.item.id)'>
            <b-icon icon="trash"></b-icon>
            Eliminar</b-button>
        </template>
      </b-table>
    <!--/div-->
    <!--div v-if="!showInfo">
    <b-jumbotron  bg-variant="outline-danger" text-variant="dark" header="Acceso no permitido" lead="El usuario con el que se ha accedido al sistema, no posee los permisos necesarios para ejecutar la acción solicitada.">
  </b-jumbotron>
    </div-->
</b-container>
</template>

<script>

import { getClientes, deleteCliente } from '@/services/api/clientes.js'
import swal from 'sweetalert'

export default {
  name: 'ListaClientesView',
  data () {
    return {
      showInfo: false,
      isBusy: false,
      perPage: 8,
      currentPage: 1,
      rows: 0,
      clientes: [],
      fields: [
        { key: 'nombre_completo', label: 'Nombre Completo' },
        { key: 'domicilio', label: 'Domicilio' },
        { key: 'action', label: '' }
      ]
    }
  },

  mounted () {
    this.showInfo = false
    this.fetchData()
  },

  methods: {
    fetchData () {
      getClientes()
        .then(response => {
          this.showInfo = true
          this.clientes = response.data
          this.rows = this.clientes.length
        })
        .catch(error => console.log(error))
        .finally(() => { })
    },

    deleteEntregaCliente (clienteId) {
      swal('Está seguro de eliminar El Cliente seleccionado?', {
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
              deleteCliente(clienteId).then(response => { this.fetchData() })
              break
          }
        })
    }
  }
}
</script>
