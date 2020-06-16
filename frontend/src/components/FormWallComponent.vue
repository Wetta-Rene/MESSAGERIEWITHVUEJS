<template>
  <div class="connexion">
      <h1>Afficher tous les messages d'une discussion</h1>
      <form @submit="formWall">
        <label>Discussion: </label><label><input type="discussion" v-model="discussion" /></label>
        <button type="submit">Afficher</button>
      </form>
  </div>
</template>

<script>
const axios = require('axios').default;
export default {
  name: 'FormWallComponent',
    data() {
          return{
            discussion: '',
            info: null
          }
    },
  methods:{
    formWall (){
      if (this.discussion == null) {
          return false;
      }
      axios.get('http://localhost:3000/api/discussions/read', {
              email: this.discussion
      })
      .then(function (response) {
          if(response){ // si on retourne une reponse

              //localstorage.setItem********
              console.log(response);
          }
      })
      .catch(function (error) {
          console.log(error);
      });
    } 
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
