<template>
<v-app>
  <v-form
    ref="form"
    v-model="valid"
    id="inner"
  >
    <h1 v-if="okey==null"></h1>
    <h1 v-else-if="okey==true"> Usuario validado correctamente </h1>
    <h1 v-else> Las credenciales no coinciden </h1>

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
      :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="() => (value = !value)"
      :type="value ? 'password' : 'text'"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      label='Mantener abierta la sesión'
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Loguearse
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Olvide mi contraseña
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
      (v) => (v.split(' ').length <= 1) || 'Espacios en blanco no permitidos',
    ],

    okey: null,
  }),

  mounted() {
    axios.get(cfg.API_URL)
      .then((result) => { this.messages = result.data; })
      .catch((error) => { this.error = error.message; });
  },
  methods: {
    async validate() {
      await axios.post(cfg.VAL_URL, { user: this.usuario, password: this.pass })
        .then((result) => { this.okey = result.data; })
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

#inner {
  width: 25%;
  margin: 0 auto;
}
</style>
