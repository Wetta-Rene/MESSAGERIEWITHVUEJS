<template>
    <div class="wall">
        <h1>Groupomania's Wall</h1>
        <div class="wallButton">
            <button type="button" class="btn btn-secondary" v-on:click="newPost ()" v-if="!formWallActif">Créer un post</button>
            <button type="button" class="btn btn-danger" v-on:click="cancelPost ()" v-if="formWallActif">Annuler le post</button>
        </div>

        <div class="wallPartieForm" v-if="formWallActif">
            <form @submit.prevent="formPostToWall">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Titre:</span>
                    </div>
                    <input type="text" class="form-control" v-model="title">
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Texte:</span>
                    </div>
                    <textarea class="form-control" v-model="content" ></textarea>
                </div>
            <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Image:</span>
                    </div>
                    <input type="" class="form-control" v-model="imageUrl" >
                </div>
                <button class="btn btn-success" type="submit">Poster et voir sur le WALL !</button>
            </form>   
        </div>











        <div class="wallPartiePosts" v-if="!formWallActif">
                <article class="articlePost" v-for="wallpost in wallPosts" :key="wallpost.id"> 
                    <div class="post-element">{{ wallpost.title }}</div>
                    <div class="post-element">Ecrit par: {{ wallpost.userId }} le {{ wallpost.create_at }} </div>
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
.wall{
    width: 98%;
    margin: auto;
        h1{
            margin-top: 2%;
        }
}
.wallButton{
    margin-top: 10%;
}
.wallPartiePosts, .wallPartieForm{
    margin-top: 4%;
}

.articlePost{
    border: 2px solid black;
    margin-bottom: 2%;
    display: flex;
    flex-direction: column;
}
.post-element{
    flex-basis: 100%;
}
.post-element:nth-child(1){ //div titre
    font-size: 1.4em;
    text-align: left; 
    padding-left: 1%;
}
.post-element:nth-child(2){ //div auteur + date
    font-size: 0.8em;
    text-align: right;
    padding-right: 1%;
    border-top: 1px solid black;
}
.post-element:nth-child(3){ //div texte
    font-size: 1.6em;
    border-top: 1px solid black;
}
.post-element:nth-child(4){ //div texte
    border-top: 1px solid black;
}

.input-group{ //formulaire
    margin-bottom: 2%;
}
</style>