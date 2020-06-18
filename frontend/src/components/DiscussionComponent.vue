<template>
    <div class="connexion">
        <h1>Nouvelle conversation</h1>
        <form @submit.prevent="formDiscussion">
            <label>Expéditeur (3):</label><label><input type="text" v-model="expediteur" /></label>
            <label>Destinataire (8):</label><label><input type="text" v-model="destinataire" /></label>
            <label>Message:</label><label><input type="textarea" v-model="content" /></label>
            <button type="submit">Créer la discussion</button>
        </form>

        <button v-on:click="affichageDesDiscussions ()">Afficher les discussions</button>
        <ul>
            <li v-for="post in posts" :key="post.id">{{ post }}</li>
        </ul>
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
            posts: null
        }        
    },
    methods:{
            formDiscussion (){
                if (this.expediteur == null || this.destinataire == null || this.content == null) {
                    return false;
                }
                axios.post('http://localhost:3000/api/discussions/new', {
                        expediteur: this.expediteur,
                        destinataire: this.destinataire,
                        content: this.content})
                .then(reponse => this.posts = reponse.data.RowDataPacket)
                .catch(function (error) {
                    console.log(error);
                });
                
            },
            affichageDesDiscussions (){
                axios.get('http://localhost:3000/api/discussions/')  //-> getAllDiscussions -> faudrait en fonction de l'utilisateur
                .then(reponse => this.posts = reponse.data)
                .catch(erreur => console.log(erreur));
            }
        
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
