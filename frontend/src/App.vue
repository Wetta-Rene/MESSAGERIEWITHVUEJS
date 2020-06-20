<template>
  <div id="app">
    <div id="divMessageNav">{{messageNav}}</div>
    <div id="nav">
      <router-link v-if="!Logged" to="/">Accueil</router-link>
      <router-link v-if="!Logged" to="/inscription"> | Inscription</router-link>
      <router-link v-if="Logged" to="/dashboard">Tableau de bord</router-link>
      <router-link v-if="Logged" to="/wall"> | Detail discussion </router-link>
      <button v-if="Logged" v-on:click="logOut ()">Déconnexion</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    data () {
        return{
            Logged: false
        }        
    },
    methods:{
      logOut (){
        localStorage.clear(); // on vide la memoire
        window.location.replace("http://localhost:8080/"); //on va à la page d'accueil
      }
    },
    beforeMount (){ 
      if(localStorage.authUser && localStorage.authUserToken){
        this.Logged = true
      }
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
