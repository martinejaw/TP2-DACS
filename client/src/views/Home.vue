<template>
  <div>
    <p> {{ messages }} </p>
    <label for="usuario">Usuario:</label>
    <input v-model="usuario" type="text" id="usuario" name="usuario"><br><br>
    <label for="pass">Contraseña:</label>
    <input v-model="pass" type="password" id="pass" name="pass"><br><br>
    <button v-on:click="loguear">Login</button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import cfg from '../config/cfg';

const val = `${cfg.API_URL},/validar`;

export default {
  name: 'home',
  data: () => ({
    error: '',
    messages: '',
    usuario: '',
    pass: '',
  }),

  mounted() {
    axios.get(cfg.API_URL)
      .then((result) => { this.messages = result.data; })
      .catch((error) => { this.error = error.message; });
  },
  methods: {
    async loguear() {
      await axios.post(val, { user: this.usuario, password: this.pass })
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
