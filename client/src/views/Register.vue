<template>
<v-app>
  <v-form
    ref="form"
    v-model="valid"
    id="inner"
  >
    <h3> {{ message }} </h3>
    <v-text-field
      v-model="usuario"
      :counter="10"
      :rules="nameRules"
      label="Usuario"
      required
    ></v-text-field>

    <v-text-field
      v-model="pass"
      :rules="passwordRules"
      label="Contraseña"

      hint="Tu contraseña es segura!"
      :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="() => (value = !value)"
      :type="value ? 'password' : 'text'"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'Debes aceptarlas para registrarte']"
      label="Acepto las condiciones de uso"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="registrar"
    >
      Registrarse
    </v-btn>
  </v-form>
  </v-app>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import cfg from '../config/cfg';

export default {
  name: 'home',
  data: () => ({
    valid: true,
    usuario: '',
    nameRules: [
      (v) => !!v || 'Usuario requerido',
      (v) => (v && v.length >= 5) || 'Usuario debe contener mas de 5 caracteres',
      (v) => (v && v.length <= 10) || 'Usuario debe contener menos de 10 caracteres',
      (v) => (v.split(' ').length <= 1) || 'Espacios en blanco no permitidos',
    ],
    error: '',
    message: '',
    pass: '',
    value: true,
    passwordRules: [
      (v) => !!v || 'Contraseña requerida',
      (v) => (v && v.length >= 8) || 'Contraseña debe contener al menos 8 caracteres',
      (v) => (v.split(' ').length <= 1) || 'Espacios en blanco no permitidos',
    ],
  }),

  mounted() {
    axios.get(cfg.API_URL)
      .then((result) => { this.messages = result.data; })
      .catch((error) => { this.error = error.message; });
  },
  methods: {
    async registrar() {
      await axios.post(cfg.API_URL, { user: this.usuario, password: this.pass })
        .then((result) => { this.message = result.data; })
        .catch((error) => { this.error = error.message; });
    },
  },
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
