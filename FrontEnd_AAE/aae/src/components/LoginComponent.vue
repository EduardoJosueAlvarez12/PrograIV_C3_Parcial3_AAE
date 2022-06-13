<template>
  <!-- jumbotron que contiene el formulario -->
  <b-jumbotron id="login-jumbotron" class="jumbotron jumbotron-fluid">
    <b-container class="flex-container-space-between">
      <div id="arrow-button" type="button">
        <b-button
          to="/aae/feed"
          style="background-color: #4f14a0; border-color: #4f14a0"
        >
          <b-icon id="arrow-button" icon="arrow-left"></b-icon>
        </b-button>
      </div>

      <div>
        <div id="title" class="header" style="font-size: 30px; color: #ffffff">
          Ask & Answer Education
        </div>
      </div>

      <div>
        <h2 style="color: #4f14a0">Help</h2>
      </div>
    </b-container>

    <div class="flex-container">
      <div>
        <div id="login-title" class="container-fluid">
          <h1 style="font-size: 70px; color: #ffffff">
            Iniciar <br />
            Sesión
          </h1>
          <p style="font-size: 15px; color: #bea6ed">
            ¿No tiene una cuenta? <router-link to="registro">Regístrese</router-link>
          </p>
        </div>
      </div>
      <!-- Formulario inicio de sesión -->
      <div>
        <div id="login-form" class="container-fluid">
          <form v-on:submit.prevent="login">
            <div id="login-control">
              <input
                id="correo"
                class="form-control-fluid form-control"
                name="email"
                placeholder="Correo"
                v-model="correo"
              />
            </div>

            <div id="login-control">
              <input
                id="contrasenia"
                type="password"
                class="form-control-fluid form-control"
                name="contrasenia"
                placeholder="Contraseña"
                v-model="contrasenia"
              />
            </div>

            <br />

            <div id="login-button">
              <button id="login-button" type="submit" class="btn btn-primary">
                Iniciar Sesión
              </button>
            </div>

            <br />

            <center>
              <div id="login-alert">
                <span id="login-alert" v-if="error">
                  {{ error_msg }}
                </span>
              </div>
            </center>
          </form>
        </div>
      </div>
      <!-- aquí termina el formulario de inicio de sesión -->
    </div>
  </b-jumbotron>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginComponent",
  components: {},
  data: function () {
    return {
      correo: "",
      contrasenia: "",
      error: false,
      error_msg: "",
    };
  },
  methods: {
    login() {
      let json = {
        correo: this.correo,
        contrasenia: this.contrasenia,
      };
      axios
        .post("http://localhost:3001/api/user/login", json)
        .then((data) => {
          if (data.data.message == "Autenticación Exitosa") {
            localStorage.token = data.data.token;
            localStorage.userId = data.data.userId;
            localStorage.nombres = data.data.nombres;
            localStorage.apellidos = data.data.apellidos;
            //en caso de autenticarse correctamente se carga el feed
            this.$router.push("feed");
          } else {
            //caso contrario se muestran los mensajes de validación
            this.error = true;
            this.error_msg = data.response.data.message;
          }
        })
        .catch((error) => {
          this.error = true;
          this.error_msg = error.response.data.message;
        });
    },
  },
};
</script>

<style scoped src="../assets/styles/style.css"></style>