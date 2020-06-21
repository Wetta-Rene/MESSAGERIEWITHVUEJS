<template>
    <div class="wall">
        <button v-on:click="newPost ()" v-if="!formWallActif">Créer un post</button>
        <button v-on:click="cancelPost ()" v-if="formWallActif">Annuler le post</button>
        <div class="wallPartieForm" v-if="formWallActif">
            <h2>Une idée pour vos collègues ?</h2>
               <form @submit.prevent="formPostToWall">
                    <label>Titre*:</label><label><input type="text" v-model="title" placeholder="Soyez bref !" required/></label>
                    <label>Votre message*:</label><label><input type="text" v-model="content" placeholder="Que voulez vous dire ?" required/></label>
                    <label>Image:</label><label><input type="password" v-model="imageUrl" /></label>
                    <button type="submit">Poster et voir sur le WALL !</button>
                </form>                                  
        </div>
        <div class="wallPartiePosts" v-if="!formWallActif">
            <h2>Groupomania's Wall</h2>

                <article class="articlePost" v-for="wallpost in wallPosts" :key="wallpost.id"> 
                    <div class="post-element">
                        <div class="post-sousElement">{{ wallpost.title }}</div>
                        <div class="post-sousElement">Ecrit par: {{ wallpost.userId }} le {{ wallpost.create_at }} </div>
                    </div>
                    <div class="post-element">{{ wallpost.content }}</div>
                    
                    <div class="post-element" v-if="wallpost.urlImage !== 'null' ">{{ wallpost.urlImage }}</div>
                    
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
            title: null,
            content: null,
            imageUrl: null,
            userId: null,
            wallPosts: null,
            formWallActif: false
        }        
    },
    mounted() {
        if(localStorage.authUser) {
        this.userId = localStorage.authUser;
        }
    },
    methods:{
            affichageWall (){
                axios.get('http://localhost:3000/api/wall/')  //-> getAllTheWall -> faudrait en fonction de l'utilisateur
                .then(reponse => this.wallPosts = reponse.data)
                .catch(erreur => console.log(erreur));
            },
            newPost (){
                this.formWallActif = true 
            },
            cancelPost (){
                this.formWallActif = false 
            },
            formPostToWall (){
                if (this.title == null || this.content == null) { //si input titre et content nul pas de validation
                    return false;
                }
                axios.post('http://localhost:3000/api/wall/new-post', {
                        title: this.title,
                        content: this.content,
                        imageUrl: this.imageUrl,
                        userId: this.userId}) //identifiant en localstorage
                .then(function (response) {
                    console.log(response)
                    if(response.status == 200){ //= post bien inscrit dans la base sql
                        window.location.reload(); 
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans le traitement sur le serveur !");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            }  
    },
    beforeMount(){ 
        this.affichageWall() 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
