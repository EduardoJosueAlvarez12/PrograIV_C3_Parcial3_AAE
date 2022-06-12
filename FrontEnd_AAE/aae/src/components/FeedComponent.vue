<template>
  <div
    id="root" style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://thumbs.dreamstime.com/b/modelo-m%C3%A9dico-del-garabato-incons%C3%BAtil-45520678.jpg');">
    <div class="btn-post-form-div">
      <button
        class="btn btn-post-form"
        v-if="!showPostForm"
        v-on:click="showForm()"
      >
        + Crear Post
      </button>
    </div>

    <div id="post-form-container" v-if="showPostForm">
      <div id="post-form-background">
        <b-form id="post-form" v-on:submit.prevent="postear()">
          <b-form-group
            id="post-control-form"
            label="Título:"
            label-for="input-1"
          >
            <b-form-input
              class="customized-form-input"
              id="titulo"
              placeholder="Una breve descripción"
              v-model="titulo"
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
              v-model="contenido"
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
            <span id="login-alert-post-form" v-if="error">
              {{ error_msg }}
            </span>
          </div>

          <div id="padding-form">
            <span id="login-alert-success-post-form" v-if="!error">
              {{ success_msg }}
            </span>
            <p class="h5 mb-2" v-if="!error" v-on:click="refrescarPagina()">
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
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FeedComponent",
  components: {},
  data: function () {
    return {
      showPostForm: false,
      error: true,
      error_msg: "",
      success_msg: "",
      usersPosts: {
        userId: "",
        nombres: "",
        contenido: "",
      },
      componentKey: 0
    };
  },
  methods: {
    refrescarPagina() {
      this.$router.go(0)
    },
    showForm() {
      return (this.showPostForm = true);
    },
    hideForm() {
      return (this.showPostForm = false);
    },
    postear() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };

      let json = {
        userId: localStorage.userId,
        titulo: this.titulo,
        contenido: this.contenido,
      };

      axios
        .post("http://localhost:3001/api/posts", json, config)
        .then((data) => {
          this.success_msg = data.data.message;
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
  },
  created() {
    axios.get("http://localhost:3001/api/posts").then((response) => {
      this.usersPosts = response.data;
    });
  },
};
</script>

<style scoped src="../assets/styles/style.css"></style>