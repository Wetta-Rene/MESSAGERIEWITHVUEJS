<template>
  <div class="connexion">
      <h1>Connexion</h1>
      <form @submit.prevent="formConnexion">
        <label>Adresse mail:</label><label><input type="email" v-model="email" /></label>
        <label>Mot de passe:</label><label><input type="password" v-model="password" /></label>
        <button type="submit">Connexion</button>
      </form>

  </div>
</template>

<script>
const axios = require('axios').default;
export default {
  name: 'ConnexionComponent',
    data() {
          return{
            email: '',
            password: ''   
          }
    },
  methods:{
    formConnexion (){
      if (this.email == null || this.password == null) {
          return false;
      }
      axios.post('http://localhost:3000/api/auth/login', {
              email: this.email,
              password: this.password,
      })
      .then(function (response) {
          if(response){ //si l'utilisateur est bien peut etre bien inscrit
              if(response.status == 200 && response.data.token){ // si reponse 200 et presence token tout est bon
                localStorage.setItem('authUser',response.data.userId) //on logue en memoire l'Id de l'utilisateur
                localStorage.setItem('authUserToken',response.data.token) //on logue en memoire l'Id de l'utilisateur
                window.location.replace("/dashboard"); //on va à la page des discussions
              }else{
                localStorage.setItem("messageNav", "Adresse mail ou mot de passe incorrect !");
              }
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
