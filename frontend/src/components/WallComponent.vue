<template>
    <div class="wall">
        <button v-on:click="newPost ()" v-if="!formWallActif">Créer un post</button>
        <button v-on:click="cancelPost ()" v-if="formWallActif">Annuler le post</button>
        <div class="wallPartieForm" v-if="formWallActif">
            <h2>Une idée pour vos collègues ?</h2>
               <form @submit.prevent="formPostToWall">
                    <label>Titre*:</label><label><input type="text" v-model="title" placeholder="Soyez bref !" required/></label>
                    <label>Votre message*:</label><label><input type="email" v-model="content" placeholder="Que voulez vous dire ?"/></label>
                    <label>Image:</label><label><input type="password" v-model="image" /></label>
                    <button type="submit">Poster et voir sur le WALL !</button>
                </form>                                  
        </div>
        <div class="wallPartiePosts" v-if="!formWallActif">
            <h2>Groupomania's Wall</h2>

                <article class="articlePost" v-for="post in posts" :key="post.id"> 
                    <div class="post-element">
                        <div class="post-sousElement">{{ post.title }}</div>
                        <div class="post-sousElement">Ecrit par: {{ post.user }} le {{ post.create_at }} </div>
                    </div>
                    <div class="post-element">{{ post.content }}</div>
                    <div class="post-element">{{ post.urlImage }}</div>
                </article>                                    
        </div>
    </div>
</template>

<script>
const axios = require('axios').default;

export default {

  name: 'WallComponent',
    data () {
        return{
            expediteur: null,
            destinataire: null,
            content: null ,
            posts: null,
            formWallActif: false
        }        
    },
    methods:{
            affichageWall (){
                axios.get('http://localhost:3000/api/wall/')  //-> getAllTheWall -> faudrait en fonction de l'utilisateur
                .then(reponse => this.posts = reponse.data)
                .catch(erreur => console.log(erreur));
            },
            newPost (){
                this.formWallActif = true 
            },
            cancelPost (){
                this.formWallActif = false 
            },
    },
    beforeMount(){ 
        this.affichageWall() 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
