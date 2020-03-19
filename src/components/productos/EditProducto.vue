<template>
  <div class="container">
    <div class="row">
      <div class="col text-left">
        <h2>Editar Producto - Id: {{ productoId }}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <form @submit="onSubmit">
              <div class="form-group row">
                <label for="nombre_completo" class="col-sm-2 col-form-label">Nombre Completo</label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    name="nombre_completo"
                    class="form-control"
                    v-model.trim="form.nombre_completo"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="estado" class="col-sm-2 col-form-label">Estado</label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    placeholder="Estado"
                    name="estado"
                    class="form-control"
                    v-model.trim="form.estado"
                  />
                </div>
              </div>

              <div class="rows">
                <div class="col text-left">
                  <b-button type="submit" variant="primary">Editar</b-button>&nbsp;
                  <b-button
                    type="submit"
                    class="btn-large-space"
                    :to="{name:'listaProductosView'}"
                  >Cancelar</b-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    productoId: String
  },
  data () {
    return {

    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()

      const path = 'http://localhost:8000/api/v1.0/productos/' + this.productoId + '/'
      axios.put(path, this.form).then((response) => {
        this.form.nombre_completo = response.data.nombre_completo
        this.form.estado = response.data.estado
        alert('Producto actualizado exitosamente!')
      })
        .catch((error) => {
          console.log(error)
        })
    },

    getProducto () {
      const path = 'http://localhost:8000/api/v1.0/productos/' + this.productoId + '/'
      axios.get(path).then((response) => {
        this.form.nombre_completo = response.data.nombre_completo
        this.form.estado = response.data.estado
      })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  created () {
    this.getProducto()
  }
}
</script>

<style>
</style>
