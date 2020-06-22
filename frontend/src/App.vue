<template>
  <div id="app">
    <div id="divMessageNav">{{messageNav}}</div>
    <b-navbar-brand href="#">
      <img src="/assets/icon-above-font.png" alt="LogoGroupomania">
    </b-navbar-brand>

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-if="!Logged">
            <router-link to="/"><button class="btn btn-primary">Accueil</button></router-link>
          </li>
          <li class="nav-item" v-if="!Logged">
            <router-link to="/inscription"><button class="btn btn-primary">Inscription</button></router-link>
          </li>
          <!-- version2
          <li class="nav-item" v-if="Logged">
            <router-link to="/dashboard"><button class="btn btn-primary">Tableau de bord</button></router-link>
          </li>
          -->
          <li class="nav-item" v-if="Logged">
            <router-link to="/wall"><button class="btn btn-primary">Groupomania's WALL</button></router-link>
          </li>
          <li class="nav-item" v-if="Logged">
            <router-link to="/profil"><button class="btn btn-primary">Mon profil</button></router-link>
          </li>
          <li class="nav-item" v-if="Logged">
            <button class="btn btn-primary" v-on:click="logOut ()">Déconnexion</button>
          </li>
          <li class="nav-item" v-if="Admin">
            <router-link to="/adminDashboard"><button class="btn btn-primary">Admin</button></router-link>
          </li>
          <!-- version2
          <li class="nav-item" v-if="Logged">
            <router-link to="/detailDiscussion"><button class="btn btn-primary">Detail discussion</button></router-link>
          </li>
          -->
        </ul>
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    data () {
        return{
            Logged: false,
            Admin: false
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
      if(localStorage.authUser && localStorage.levelUser == 4){// si utilisateur connecter est un adminisitrateur
        this.Admin = true
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
