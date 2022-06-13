<template>
  <!-- jumbotron que contiene el formulario de registro -->
  <b-jumbotron id="register-jumbotron" class="jumbotron jumbotron-fluid">
    <b-container class="flex-container-space-between">
      <div class="flex-container" style="width: calc(100% - 40px)">
        <div>
          <div id="register-title" class="container-fluid">
            <h1 style="font-size: 70px; color: #ffffff">
              Registro de <br />
              usuario
            </h1>
          </div>
        </div>
        <div>
          <!-- formulario de registro -->
          <div id="register-body" class="container-fluid">
            <form v-on:submit.prevent="register">
              <div id="register-control">
                <label for="nombres" id="label-register" class="form-label"
                  >Nombres:</label
                >
                <input
                  id="nombres"
                  type=" text"
                  class="form-control"
                  name="nombres"
                  placeholder="Ejemplo: Josué Marcos"
                  v-model="nombres"
                />
              </div>
              <div id="register-control">
                <label for="apellidos" id="label-register" class="form-label"
                  >Apellidos:</label
                >
                <input
                  id="apellidos"
                  type=" text"
                  class="form-control"
                  name="apellidos"
                  placeholder="Ejemplo: Torres Hernández"
                  v-model="apellidos"
                />
              </div>
              <div id="register-control">
                <label for="correo" id="label-register" class="form-label"
                  >Correo:</label
                >
                <input
                  id="correo"
                  type="email"
                  class="form-control"
                  name="correo"
                  placeholder="Ejemplo: josuehernandez@mined.clases.edu.sv"
                  v-model="correo"
                />
              </div>
              <div id="register-control">
                <label for="contrasenia" id="label-register" class="form-label"
                  >Contraseña:</label
                >
                <input
                  id="contrasenia"
                  type="password"
                  class="form-control"
                  name="contrasenia"
                  aria-describedby="passwordHelpBlock"
                  placeholder="Ejemplo: @!Contraseña123"
                  v-model="contrasenia"
                />
                <div id="passwordHelpBlock" class="form-text">
                  La contraseña debe tener al menos 8 carácteres e incluir al menos una mayúscula,
                  una minúscula, un número y un carácter especial.
                </div>
              </div>
              <div id="login-button">
                <button id="login-button" type="submit" class="btn btn-primary">
                  Registrar
                </button>
              </div>

              <br />

              <center>
                <div id="login-alert">
                  <span id="login-alert" v-if="error">
                    {{ error_msg }}
                  </span>
                </div>
                <div id="login-alert-success">
                  <span id="login-alert-success" v-if="!error">
                    {{ success_msg }}
                  </span>
                </div>
              </center>
            </form>
          </div>
          <!-- aquí termina el formulario de registro -->
        </div>
      </div>
    </b-container>
  </b-jumbotron>
</template>
<!--Script con axios para post de register-->
<script>
import axios from "axios";

export default {
  name: "RegisterComponent",
  components: {},
  data: function () {
    return {
      nombres: "",
      apellidos: "",
      correo: "",
      contrasenia: "",
      error: false,
      error_msg: "",
      success_msg: "",
    };
  },
  methods: {
    register() {
      let json = {
        nombres: this.nombres,
        apellidos: this.apellidos,
        correo: this.correo,
        contrasenia: this.contrasenia,
      };
      axios
        .post("http://localhost:3001/api/user/sign-up", json)
        .then((data) => {
          this.error = false;
          this.success_msg = data.data.message;
        })
        .catch((error) => {
          this.error = true;
          this.error_msg = error.response.data.message;
          console.log(typeof this.error_msg);
          // eslint-disable-next-line no-constant-condition
          if (typeof this.error_msg === "string") {
            this.error_msg = error.response.data.message;
          } else {
            this.error_msg = error.response.data.message[0];
          }
        });
    },
  },
};
</script>

<style scoped src="../assets/styles/style.css"></style>


