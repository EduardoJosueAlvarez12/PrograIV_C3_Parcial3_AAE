<template>
  <div id="app">

    <b-navbar class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm d-flex">
      <b-navbar-brand href="/aae/feed">Ask & Answer Education</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="margin-left" to="/aae/feed">Inicio</b-nav-item>

          <b-nav-item class="margin-left" v-if="checkLogin()" to="/aae/mis-posts">Mis Posts</b-nav-item>
        </b-navbar-nav>

        <!-- Botón de login y alinear a la izquierda -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form size="sm" class="mr-sm-2 ml-auto" v-if="!checkLogin()">
            <b-button style="color: #FFFFFF; background-color: #4F14A0; border-color: #4F14A0" size="sm" class="margin-left ml-auto" type="submit" to="/aae/login">Login</b-button>
          </b-nav-form>

          <b-nav-item-dropdown class="margin-left" v-if="checkLogin()" right>
            <!-- Dropdown -->
            <template #button-content>
              <em>{{ nombres }}</em>
            </template>
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item v-on:click="logout()">Cerrar Sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data: function () {
      return{
      token: '',
      id: '',
      nombres: '',
      apellidos: '',
      login: false,
      };
    },
    methods: {
      checkLogin: function () {
        this.token = localStorage.getItem('token');
        this.id = localStorage.getItem('id');
        this.nombres = localStorage.getItem('nombres');
        this.apellidos = localStorage.getItem('apellidos');
        if (localStorage.getItem('token') !== null) {
          this.login = true;
          console.log(this.login);
          console.log(localStorage.getItem('token'));
          return this.login;
        }
      },
      logout: function () {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nombres');
        this.login = false;
        this.$router.push('/aae/login');
      }


    }
  };
</script>


<style>
#app {
  font-family: 'Atkinson Hyperlegible';
    font-size: 14px;
    background-color: #FFFFF0;
}

nav {
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


/* Espacio entre componentes de navbar */

.margin-left{
  margin-left: 20px !important;
}

</style>
