<template>
  <div>
    <mis-posts-component />
  </div>
</template>

<script>
import MisPostsComponent from "../components/MisPostsComponent.vue";

export default {
  name: "MisPostsView",
  components: {
    MisPostsComponent,
  },
};
</script>

// Importamos el archivo style.css 

<style scoped src="../assets/styles/style.css"></style>