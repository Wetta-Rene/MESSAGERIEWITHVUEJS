<template>
  <div class="connexion">
      <h1>Connexion</h1>
      <form @submit="formConnexion">
        <label>Adresse mail:</label><label><input type="email" v-model="email" /></label>
        <label>Mot de passe:</label><label><input type="password" v-model="password" /></label>
        <button type="submit">Connexion</button>
      </form>

  </div>
</template>

<script>
export default {
  name: 'Component_Connexion',
    data() {
          return{
            email: '',
            password: ''   
          }
    },
    methods: {
        formConnexion (){
            console.log('form submitted')
        },
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
