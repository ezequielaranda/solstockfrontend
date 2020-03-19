<template>
  <b-container class="mt-3">
    <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/listaClientes">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Clientes
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Nuevo Cliente</b-breadcrumb-item>
  </b-breadcrumb>
    <b-card  class="shadow mt-2" header-tag="header" footer-tag="footer">
      <b-form class="text-left" @submit.stop.prevent ="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Nombre completo:"
        label-for="input-1"
        label-cols-lg="3"
        :invalid-feedback="feedbackNombreCompleto"
        :valid-feedback="feedbackNombreCompleto"
      >
        <b-form-input
          id="input-1"
          v-model="form.nombre_completo"
          type="text"
          placeholder=""
          class="mb-1"
          name="nombre_completo"
          :state="stateNombreCompleto"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Domicilio:"
        label-for="input-2"
        label-cols-lg="3"
        :invalid-feedback="feedbackDomicilio"
        :valid-feedback="feedbackDomicilio"
      >
        <b-form-input
          id="input-2"
          v-model="form.domicilio"
          type="text"
          placeholder=""
          class="mb-1"
          name="domicilio"
          :state="stateDomicilio"
        ></b-form-input>
      </b-form-group>
        <div class="shadow border-top my-3"></div>
        <b-row class="justify-content-md-center">
          <b-button pill size="sm" variant="outline-success" type="submit" class="mr-2">
            <b-icon icon="check-box"></b-icon>Guardar Cliente</b-button>
          <b-button pill size="sm" variant="outline-secondary" type="reset" to="/listaClientes">Cancelar</b-button>
        </b-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>

import { addCliente } from '@/services/api/clientes.js'
// import { getTiposProducto, getFamiliasProducto, addNewProducto } from '@/services/api/productos.js'
import swal from 'sweetalert'

export default {

  name: 'newClienteView',
  data () {
    return {
      form: {
        nombre_completo: '',
        domicilio: '',
        id: null
      },
      listaPuntosLimpiezaCliente: [],
      show: true
    }
  },
  computed: {
    feedbackNombreCompleto () {
      if (this.form.nombre_completo.length > 4 && this.form.nombre_completo.length < 51) {
        return ''
      } else { return 'El nombre debe tener entre 5 y 50 caracteres.' }
    },
    feedbackDomicilio () {
      if (this.form.domicilio.length > 4 && this.form.domicilio.length < 51) {
        return ''
      } else { return 'El domicilio debe tener entre 5 y 50 caracteres.' }
    },
    stateNombreCompleto () { return this.form.nombre_completo.length > 4 && this.form.nombre_completo.length < 51 },
    stateDomicilio () { return this.form.domicilio.length > 4 && this.form.domicilio.length < 51 }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (this.stateDomicilio && this.stateNombreCompleto) {
        addCliente(this.form).then((response) => {
          swal('Cliente creado exitosamente!', '', 'success')
          this.$router.push({ name: 'ListaClientesView' })
        }).catch((error) => { swal(error.toString(), '', 'error') })
      } else {
        swal('Por favor, corrija los errores antes de continuar.', '', 'error')
      }
    },

    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.nombre_completo = ''
      this.form.domicilio = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

    fetchData () {
      // getProveedores().then(response => { this.listaProveedores = response.data })
      // getTiposProducto().then(response => { this.listaTiposProducto = response.data })
      // getFamiliasProducto().then(response => { this.listaFamiliasProducto = response.data })
    }
  },

  mounted () { this.fetchData() }
}
</script>

<style>

</style>
