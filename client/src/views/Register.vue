<template>
<v-app>
  <v-form
    ref="form"
    v-model="valid"
    id="inner"
  >
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

      hint="Your password passed! Password rules are not meant to be broken!"
      :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="() => (value = !value)"
      :type="value ? 'password' : 'text'"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
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
      (v) => !!v || 'User is required',
      (v) => (v && v.length >= 5) || 'Name must be more than 5 characters',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    error: '',
    messages: '',
    pass: '',
    value: true,
    passwordRules: [
      (v) => !!v || 'Password is required',
    ],
  }),

  mounted() {
    axios.get(cfg.API_URL)
      .then((result) => { this.messages = result.data; })
      .catch((error) => { this.error = error.message; });
  },
  methods: {
    async loguear() {
      await axios.post(cfg.API_URL, { user: this.usuario, password: this.pass })
        .then((result) => { this.messages = result.data; })
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
