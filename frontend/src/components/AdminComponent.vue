<template>
  <div class="admin">
      <h3>Tableau de bord [ADMIN]</h3>
        <b-card no-body>
            <b-tabs pills card>
            <b-tab title="Inscription(s)" @click="affichageDerniersInscrits()" active>
                <b-card-text>
                    <b-card no-body>
                        <b-tabs pills card vertical>
                        <b-tab title="New" active v-for="membre in memberDatas" :key="membre.id">
                            <b-card-text>
                                    <ul class="list-group">
                                    <li class="list-group-item">Pseudo:<br /> {{membre.pseudo}}</li>
                                    <li class="list-group-item">Email:<br /> {{membre.email}}</li>
                                    <li class="list-group-item">Mot de passe:<br /> C'est secret...</li>
                                    <li class="list-group-item">Fonction:<br /> {{membre.metier}}</li>
                                    <li class="list-group-item">
                                    <b-button size="sm" variant="success" v-on:click="supprimerProfil ()">Valider le membre !</b-button> 
                                    </li>
                                    <li class="list-group-item">
                                    <b-button size="sm" variant="danger" v-on:click="supprimerProfil ()">Supprimer le membre !</b-button> 
                                    </li> 
                                </ul>  
                            </b-card-text>
                        </b-tab>
                        </b-tabs>
                    </b-card>


                            





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
              memberDatas: null,
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
