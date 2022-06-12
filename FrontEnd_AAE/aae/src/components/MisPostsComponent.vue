<template>
  <div>

    <div id="padding-form">
      <span id="login-alert-post-form" v-if="error">
        {{ error_msg }}
      </span>
    </div>

    <div id="padding-form" style="background: linear-gradient(0deg,rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 0.9)),url('https://thumbs.dreamstime.com/b/modelo-m%C3%A9dico-del-garabato-incons%C3%BAtil-45520678.jpg');" v-if="checkLogin()">
      <div
        id="container-mis-datos"
        class="container flex-container-space-between">
        <div id="arreglo-icono-titulo">
          <div>
            <b-icon id="icon-high-posts" icon="person-fill"></b-icon>
          </div>
          <div id="container-mis-posts-user">
            <div id="title-posts-high">
              Bienvenido {{ nombres }} {{ apellidos }}
            </div>
          </div>
        </div>

        <div id="container-mis-posts-user">
          <div id="message-posts-high">
            <p>
              Agrega Posts en el apartado de Posts para que puedas modificar y
              visualizar los tuyos en este apartado
            </p>
          </div>
        </div>
      </div>
      <div id="container-mis-posts" class="container">
        <div id="all-posts" class="container">
          <div v-for="item in usersPosts" v-bind:key="item">
            <br />
            <div class="card card-post-all">
              <div class="card-header card-post-head">
                <div class="my-0 fw-normal">
                  <b-icon id="icon-high" icon="person-fill"></b-icon> By:
                  {{ item.nombres }} {{ item.apellidos }}
                </div>
              </div>

              <div class="card-body card-post-body">
                <div id="title-high" class="text-left my-1">
                    {{ item.titulo }}
                </div>

                <div id="content-high">
                  <p class="card-text">
                    {{ item.contenido }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MisPostsComponent",
  data: function () {
    return {
      nombres: localStorage.getItem("nombres"),
      apellidos: localStorage.getItem("apellidos"),
      userId: localStorage.getItem("userId"),
      login: false,
      error: true,
      error_msg: "",
      usersPosts: {
        userId: "",
        nombres: "",
        contenido: "",
      },
    };
  },
  created() {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    axios.get("http://localhost:3001/api/user/puser/" + this.userId, config).then((response) => {
      this.usersPosts = response.data;
      this.error = false;
    })
    .catch((error) => {
        this.error = true;
        // eslint-disable-next-line no-constant-condition
        if (typeof error.response.data.message === "string") {
          this.error_msg = error.response.data.message;
        } else {
          this.error_msg = error.response.data.message[0];
        }
      });
  },
  methods: {
    checkLogin: function () {
        this.token = localStorage.getItem('token');
        this.id = localStorage.getItem('id');
        this.nombres = localStorage.getItem('nombres');
        this.apellidos = localStorage.getItem('apellidos');
        if (localStorage.getItem('token') !== null) {
          this.login = true;
          
          return this.login;
        }
      },
  }
};
</script>

// Importamos el archivo style.css 

<style scoped src="../assets/styles/style.css"></style>