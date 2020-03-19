<template>
  <b-container class="mt-3">
    <b-breadcrumb class="shadow">
            <b-breadcrumb-item to="/productos">
              <b-icon icon="list" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
              Productos
            </b-breadcrumb-item>
            <b-breadcrumb-item active>Edición de Producto</b-breadcrumb-item>
  </b-breadcrumb>
    <b-card  class="shadow mt-2" header-tag="header" footer-tag="footer">
      <b-form class="text-left" @submit="onSubmit" @reset="onReset" >
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
          required
          placeholder=""
          class="mb-1"
          :state="stateNombreCompleto"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Proveedor:" label-cols-sm="6" label-cols-lg="3">
            <v-select label="nombre_completo" :reduce="nombre_completo => nombre_completo.id" v-model="form.proveedor" :options="listaProveedores">
              <div slot="no-options">No se encontraron resultados</div>
            </v-select>
            <b-form-invalid-feedback :state="stateProveedor">
                  Se debe elegir un proveedor de la lista.
            </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-2" label="Tipo de Producto:" label-cols-sm="6" label-cols-lg="3">
            <v-select label="descripcion" :reduce="descripcion => descripcion.id" v-model="form.tipoProducto" :options="listaTiposProducto">
              <div slot="no-options">No se encontraron resultados</div>
            </v-select>
            <b-form-invalid-feedback :state="stateTipoProducto">
                Se debe elegir un tipo de producto de la lista.
            </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-1" label="Familia de Producto:" label-cols-sm="6" label-cols-lg="3">
            <v-select label="descripcion" :reduce="descripcion => descripcion.id" v-model="form.familiaProducto" :options="listaFamiliasProducto">
              <div slot="no-options">No se encontraron resultados</div>
            </v-select>
            <b-form-invalid-feedback :state="stateFamiliaProducto">
               Se debe elegir una familia de producto de la lista.
            </b-form-invalid-feedback>
      </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Factor de multiplicación:"
          label-for="input-2"
          label-cols-lg="3"
        >
        <b-form-input
            id="input-2"
            v-model.number="form.factor_multiplicacion"
            type="number"
            required
            placeholder="1.0"
            class="mb-1"
          ></b-form-input>
        </b-form-group>
        <div class="shadow border-top my-3"></div>
        <b-row class="justify-content-md-center">
          <b-button pill size="sm" variant="outline-success" type="submit" class="mr-2">
            <b-icon icon="check-box"></b-icon>Guardar Producto</b-button>
          <b-button pill size="sm" variant="outline-secondary" type="reset" to="/productos">Cancelar</b-button>
        </b-row>
      </b-form>

    </b-card>
  </b-container>
</template>

<script>
// import axios from 'axios'
import { getProveedores } from '@/services/api/proveedores.js'
import { getTiposProducto, getFamiliasProducto, editProducto, getProductoById } from '@/services/api/productos.js'
import swal from 'sweetalert'

export default {
  name: 'editProductoView',
  data () {
    return {
      loading: false,
      form: {
        nombre_completo: '',
        estado: '',
        proveedor: null,
        tipoProducto: null,
        familiaProducto: null,
        factor_multiplicacion: '',
        id: null
      },
      // show: true,
      error: null,
      listaProveedores: [],
      listaTiposProducto: [],
      listaFamiliasProducto: []
    }
  },
  computed: {
    feedbackNombreCompleto () {
      if (this.form.nombre_completo.length > 4 && this.form.nombre_completo.length < 51) {
        return ''
      } else { return 'El nombre debe tener entre 5 y 50 caracteres.' }
    },
    stateProveedor () { return this.form.proveedor != null },
    stateTipoProducto () { return this.form.tipoProducto != null },
    stateFamiliaProducto () { return this.form.familiaProducto != null },
    stateNombreCompleto () { return this.form.nombre_completo.length > 4 && this.form.nombre_completo.length < 51 }
  },

  mounted () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      getProveedores().then(response => { this.listaProveedores = response.data })
      getTiposProducto().then(response => { this.listaTiposProducto = response.data })
      getFamiliasProducto().then(response => { this.listaFamiliasProducto = response.data })

      // this.error = null
      // this.loading = true
      this.getProducto(this.$route.params.productoId)
    },

    getProducto (productoId) {
      this.loading = false
      getProductoById(productoId).then((response) => {
        this.form.nombre_completo = response.data.nombre_completo
        this.form.estado = response.data.estado
        this.form.proveedor = response.data.proveedor
        this.form.tipoProducto = response.data.tipoProducto
        this.form.familiaProducto = response.data.familiaProducto
        this.form.factor_multiplicacion = response.data.factor_multiplicacion
        this.form.id = productoId
      })
        .catch((error) => {
          this.error = error.toString()
          // console.log(error)
        })
    },

    onSubmit (evt) {
      evt.preventDefault()
      if (this.stateProveedor && this.stateTipoProducto && this.stateFamiliaProducto && this.stateNombreCompleto) {
        editProducto(this.form).then((response) => {
          swal('Producto editado exitosamente!', '', 'success')
          this.$router.push({ name: 'listaProductosView' })
        }).catch((error) => { swal(error.toString(), '', 'error') })
      } else {
        swal('Por favor, corrija los errores antes de continuar.', '', 'error')
      }
    },

    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.nombre_completo = ''
      this.form.estado = ''
      this.form.proveedor = null
      this.form.tipoProducto = null
      this.form.familiaProducto = null
      this.form.factor_multiplicacion = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style>

</style>
