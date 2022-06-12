<template>

  <div>
    <center>
        <h1>Aquí estarán todos tus Posts {{ nombres }} {{ apellidos }}</h1>
    </center>
  </div>

</template>

<script>

export default {
  name: "MisPostsComponent",
  data: function () {
    return {
      nombres: localStorage.getItem('nombres'),
      apellidos: localStorage.getItem('apellidos'),
    };
  },
};
</script>

// Importamos el archivo style.css 

<style scoped src="../assets/styles/style.css"></style>