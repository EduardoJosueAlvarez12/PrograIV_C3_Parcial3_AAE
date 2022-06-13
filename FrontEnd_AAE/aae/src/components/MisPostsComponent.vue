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
        <div id="post-form-container" v-if="showPostForm">
          <div id="post-form-background">
            <b-form id="post-form" v-on:submit.prevent="editPost()">
              <b-form-input 
                v-model="selectedPost.id"
                hidden
              ></b-form-input>
              <b-form-group
                id="post-control-form"
                label="Título:"
                label-for="input-1"
              >
                <b-form-input
                  class="customized-form-input"
                  id="titulo"
                  placeholder="Una breve descripción"
                  v-model="selectedPost.titulo"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="post-control-form"
                label="Contenido:"
                label-for="input-2"
              >
                <b-form-textarea
                  class="customized-form-input"
                  id="contenido"
                  type="email"
                  placeholder="El contenido de su post"
                  v-model="selectedPost.contenido"
                ></b-form-textarea>
              </b-form-group>
              <div class="btn-cancel-post-div">
                <button class="btn btn-cancel-post" v-on:click="hideForm()">
                  Cancelar
                </button>
              </div>
              <div class="btn-post-div">
                <button type="submit" class="btn btn-post">Publicar</button>
              </div>
              <div id="padding-form">
                <span id="login-alert-post-form" v-if="errorEdit">
                  {{ error_msg }}
                </span>
              </div>

              <div id="padding-form">
                <span id="login-alert-success-post-form" v-if="!errorEdit">
                  {{ success_msg }}
                </span>
                <p class="h5 mb-2" v-if="!errorEdit" v-on:click="refrescarPagina()">
                  Refrescar la página <b-icon id="btn-refresh" icon="arrow-clockwise" animation="spin-pulse"></b-icon>
                </p>
              </div>
            </b-form>
          </div>
        </div>
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
                <br>
                
                <div class="flex-container-space-between-post">
                  <div id="btn-edit-post-div">
                    <button
                      id="btn-edit-post"
                      class="btn btn-edit-post"
                      v-if="!showPostForm"
                      v-on:click="showForm(item.id)">
                      Editar Post
                    </button>
                  </div>
                  <div id="btn-delete-post-div">
                      <b-button id="btn-delete-post" v-on:click="deletePost(item.id)">Eliminar</b-button>
                  </div>
                </div>
                <div>
                  <span id="login-alert-post-form" v-if="error">
                    {{ error_msg }}
                  </span>
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
      errorEdit: true,
      error: false,
      showPostForm: false,
      error_msg: "",
      usersPosts: {
        id: "",
        userId: "",
        nombres: "",
        contenido: "",
      },
      selectedPost: {
        id: "",
        userId: "",
        nombres: "",
        contenido: "",
      }
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
    deletePost(id) {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      axios.delete("http://localhost:3001/api/posts/" + id, config).then(() => {
        this.$router.go(0);
      })
      .catch((error) => {
          console.log(error.response.data.message);
        });
    },
    editPost() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      let json = {
        userId: this.selectedPost.userId,
        titulo: this.selectedPost.titulo,
        contenido: this.selectedPost.contenido,
      };

      axios.put("http://localhost:3001/api/posts/" + this.selectedPost.id, json, config).then(() => {
        this.$router.go(0);
      })
      .catch((error) => {
          this.errorEdit = true;
          // eslint-disable-next-line no-constant-condition
          if (typeof error.response.data.message === "string") {
            this.error_msg = error.response.data.message;
          } else {
            this.error_msg = error.response.data.message[0];
          }
      });
    },
    showForm(id) {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      axios.get("http://localhost:3001/api/posts/" + id, config).then((response)=> {
        this.selectedPost = response.data;
        this.showPostForm = true;
      })
    },
    hideForm() {
      return (this.showPostForm = false);
    },
    refrescarPagina() {
      this.$router.go(0)
    }
  }
  
};

</script>

// Importamos el archivo style.css 

<style scoped src="../assets/styles/style.css"></style>