<template>
  <div class="admin">
      <h3>Tableau de bord [ADMIN]</h3>
        <b-card no-body>
            <b-tabs pills card>
            <b-tab title="Inscription(s)" @click="affichageDerniersInscrits()" active>
                <b-card-text>
                            <ul class="list-group" v-for="membre in memberDatas" :key="membre.id">
                                <li class="list-group-item">Pseudo: {{membre.pseudo}}</li>
                                <li class="list-group-item">Email: {{membre.email}}</li>
                                <li class="list-group-item">Mot de passe: C'est secret...</li>
                                <li class="list-group-item">Fonction: {{membre.metier}}</li>
                                <li class="list-group-item">
                                    <button class="btn btn-danger" v-on:click="supprimerProfil ()">Supprimer mon profil !</button> 
                                </li> 
                            </ul>  





                </b-card-text>
            </b-tab>
            <b-tab title="Les posts modérés"><b-card-text>Tab contents 2</b-card-text></b-tab>
            </b-tabs>
        </b-card>
  </div>
</template>

<script>
const axios = require('axios').default;


export default {
  name: 'AdminComponent',
    data() {
          return{
            
          }
    },
  methods:{
        affichageDerniersInscrits(){
            axios.get('http://localhost:3000/api/admin/lastSignup/')  //-> getAllTheWall -> faudrait en fonction de l'utilisateur
           .then(reponse => this.memberDatas = reponse.data)
            .catch(erreur => console.log(erreur));
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3{
    margin-top: 2%;
    margin-bottom: 4%;
}
</style>
