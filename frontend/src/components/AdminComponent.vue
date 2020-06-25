<template>
  <div class="admin">
      <h3>Tableau de bord [ADMIN]</h3>
        <b-card no-body>
            <b-tabs pills card>
                <b-tab title="Inscription(s)"  @click="affichageDerniersInscrits()" active>
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
                                            <b-button size="sm" variant="success" v-on:click="validerProfil(membre.id)">Valider le membre !</b-button> 
                                            </li>
                                            <li class="list-group-item">
                                            <b-button size="sm" variant="danger" v-on:click="supprimerProfil(membre.id)">Supprimer le membre !</b-button> 
                                            </li> 
                                        </ul>  
                                    </b-card-text>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </b-card-text>
                </b-tab>
                <b-tab title="Les derniers post" @click="affichageDerniersPosts()">
                  <b-card-text>
                        <b-card no-body>
                            <b-tabs pills card vertical>
                                <b-tab title="A lire" active v-for="post in postDatas" :key="post.id">
                                    <b-card-text>
                                            <ul class="list-group">
                                            <li class="list-group-item">Titre:<br /> {{post.title}}</li>
                                            <li class="list-group-item">Message:<br /> {{post.content}}</li>
                                            <li class="list-group-item">Image:<br /> {{post.urlImage}}</li>
                                            <li class="list-group-item">Ecrit par:<br /> {{post.user}}</li>
                                            <li class="list-group-item">
                                            <b-button size="sm" variant="warning" v-on:click="modererPost(post.id)" v-if="!moderationEnCours">Modérer le post !</b-button>
                                            <b-button size="sm" variant="danger" v-on:click="cancelModererPost(post.id)" v-if="moderationEnCours">Annuler modération !</b-button> 
                                            </li>
                                            <li class="list-group-item" v-if="moderationEnCours">
                                                <b-form @submit.prevent="formModeration(post.id)">
                                                    <b-form-group id="input-group-1" label-for="input-1" description="">
                                                    <b-form-input id="input-1" v-model="moderation" type="textarea" required placeholder="Texte de modération..."></b-form-input>
                                                    </b-form-group>
                                                    <button class="btn btn-primary" variant="success" type="submit">Valider</button>
                                                </b-form>
                                            </li>
                                        </ul>  
                                    </b-card-text>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </b-card-text>
                </b-tab>
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
              postDatas: null,
              id: null,
              moderationEnCours: null,
              moderation: null
          }
    },
  methods:{
        formModeration(id){
                if (this.moderation == null) {
                    return false;
                }
                axios.post('http://localhost:3000/api/admin/moderation/'+id, {
                        moderation: this.moderation,
                        },{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })
                .then(function (response) {
                    if(response.status == 200){ //post bien enregistrer
                        this.moderationEnCours = false
                        //-->>   ne marche pas (rechargement de la page)
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans la saisie côté serveur !");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            },
        modererPost(){
            this.moderationEnCours = true
        },
        cancelModererPost(){
            this.moderationEnCours = false
        },
        affichageDerniersInscrits(){
            axios.get('http://localhost:3000/api/admin/lastSignup/',{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  // afficher tous les derniers inscrit non valider
            .then(reponse => this.memberDatas = reponse.data)
            .catch(erreur => console.log(erreur));
        },
        affichageDerniersPosts(){
            axios.get('http://localhost:3000/api/admin/lastPosts/',{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  // afficher tous les derniers inscrit non valider
            .then(reponse => this.postDatas = reponse.data)
            .catch(erreur => console.log(erreur));
        },
        validerProfil(id){
            axios.put('http://localhost:3000/api/admin/setupSignup/'+id,{hello: 'world'},{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  // mettre a jour par validation admin
            .then(function (response) {
                    if(response.status == 200){  //-> NE MARCHE PAS
                        this.removeElement(id)
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans la validation !");
                    }
            })
            .catch(erreur => console.log(erreur));    
        },
        supprimerProfil(id){
            axios.delete('http://localhost:3000/api/admin/deleteSignup/'+id,{
                    headers: {
                        authorization: localStorage.authUserToken
                        }
                })  // mettre a jour par validation admin
            .then(function (response) {
                    if(response.status == 200){ 
                         this.removeElement()  //--> methode ne marche pas
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans la validation !");
                    }
            })
            .catch(erreur => console.log(erreur));    
        },
        removeElement: function (index) {
            this.membre.splice(index, 1);
        }
    },
    beforMount(){
        this.affichageDerniersInscrits()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3{
    margin-top: 2%;
    margin-bottom: 4%;
}
</style>
