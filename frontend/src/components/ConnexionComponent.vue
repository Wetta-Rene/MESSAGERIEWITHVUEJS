<template>
  <div class="connexion">
      <h1>Connexion</h1>
      <b-form @submit.prevent="formConnexion">
        <b-form-group id="input-group-1" label-for="input-1" description="">
          <b-form-input d="input-1" v-model="email" type="email" required placeholder="Saisissez votre adresse mail..."></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input id="input-2" v-model="password" required placeholder="Saisissez votre mot de passe..."></b-form-input>
        </b-form-group>
        <button class="btn btn-primary" type="submit">Connexion</button>
      </b-form>

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
                
                window.location.replace("http://localhost:8080/dashboard"); //on va à la page des discussions
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
