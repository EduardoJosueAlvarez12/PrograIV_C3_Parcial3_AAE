<template>
<div id="root" style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://thumbs.dreamstime.com/b/modelo-m%C3%A9dico-del-garabato-incons%C3%BAtil-45520678.jpg');">
  <div class="container">
    <div v-for="item in usersPosts" v-bind:key="item">
      <br>
      <div class="card card-post-all">
          <div class="card-header card-post-head">
              <div class="my-0 fw-normal"><b-icon id="icon-high" icon="person-fill"></b-icon> By: {{item.nombres}} {{item.apellidos}}</div>
          </div>

          <div class="card-body card-post-body">

              <div id="title-high" class="text-left my-1">
                {{ item.titulo }}
              </div>

              <br>

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
</template>

<script>
import axios from "axios";

export default {
  name: "FeedComponent",
  components: {},
  data: function () {
    return{ 
      usersPosts: {
        userId: "",
        nombres: "",
        contenido: "",
      }
      
    };
  },
  created() {
    axios
      .get("http://localhost:3001/api/posts")
      .then(response => {
        this.usersPosts = response.data;
        
      })
  }
  
};
</script>


<style scoped src="../assets/styles/style.css"></style>