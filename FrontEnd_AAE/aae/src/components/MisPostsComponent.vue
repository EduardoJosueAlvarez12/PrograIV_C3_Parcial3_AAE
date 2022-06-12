<template>
  
    <div id="padding-form" style="background: linear-gradient(0deg,rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 0.9)),url('https://thumbs.dreamstime.com/b/modelo-m%C3%A9dico-del-garabato-incons%C3%BAtil-45520678.jpg');">
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
      <div
        id="container-mis-posts"
        class="container flex-container-space-between">
        <h1>Aquí irán los posts</h1>
      </div>
  </div>
</template>

<script>
export default {
  name: "MisPostsComponent",
  data: function () {
    return {
      nombres: localStorage.getItem("nombres"),
      apellidos: localStorage.getItem("apellidos"),
    };
  },
};
</script>

// Importamos el archivo style.css 

<style scoped src="../assets/styles/style.css"></style>