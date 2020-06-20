<template>
    <div class="pageDesDiscussions">
        <div class="partieNewDiscussion" v-if="newConversation">
            <button v-on:click="newConversationToCancel ()">Retour aux discussions</button>
            <h2>Nouvelle conversation</h2>
            <form @submit.prevent="formDiscussion">
                <label>Expéditeur (3):</label><label><input type="text" v-model="expediteur" /></label>
                <label>Destinataire (8):</label><label><input type="text" v-model="destinataire" /></label>
                <label>Message:</label><label><input type="textarea" v-model="content" /></label>
                <button type="submit">Créer la discussion</button>
            </form>
        </div>
        <div class="partieListeDesDiscussions" v-else>
            <h2>Liste de vos discussions:</h2>
            <button v-on:click="newConversationToCreate ()">Créer une discussion</button>
            <ul>
                <li v-for="post in posts" :key="post.id"><a href="http://localhost:8080/wall/" >Discussion avec utilisateur {{ post.utilisateur2 }}</a><button v-on:click="deleteDiscussionAndMessages (post.id)">Supprimer la conversation</button></li>
                                                    
            </ul>
        </div>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {

  name: 'DiscussionComponent',
    data () {
        return{
            expediteur: null,
            destinataire: null,
            content: null ,
            posts: null,
            newConversation: false
        }        
    },
    methods:{
            newConversationToCreate (){
                this.newConversation = true
            },
            newConversationToCancel (){
                this.newConversation = false
            },
            formDiscussion (){
                if (this.expediteur == null || this.destinataire == null || this.content == null) {
                    return false;
                }
                axios.post('http://localhost:3000/api/discussions/new', {
                        expediteur: this.expediteur,
                        destinataire: this.destinataire,
                        content: this.content})
                .then(function (response) {
                    if(response.status == 200){ // tout est bon dans la suppression cote bdd
                        window.location.replace("http://localhost:8080/dashboard"); // on retourne a la page tableau de bord pour "recharge"
                    }  
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            },
            affichageDesDiscussions (){
                axios.get('http://localhost:3000/api/discussions/'+localStorage.authUser)  //-> getAllDiscussions -> faudrait en fonction de l'utilisateur
                .then(reponse => this.posts = reponse.data)
                .catch(erreur => console.log(erreur));
            },
            deleteDiscussionAndMessages (idDiscussion) {
                axios.delete('http://localhost:3000/api/discussions/'+idDiscussion)  //-> getAllDiscussions -> faudrait en fonction de l'utilisateur
                .then(function (response) {
                    if(response.status == 200){ // tout est bon dans la suppression cote bdd
                        window.location.reload(); // on recharge la page pour mise a jour des discussions restante
                    }  
                })
                .catch(erreur => console.log(erreur));
            }
            
    },
    beforeMount(){ 
        this.affichageDesDiscussions() 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
