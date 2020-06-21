<template>
    <div class="wall">
        <div class="wallPartiePosts">
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
            newConversation: false
        }        
    },
    methods:{
            affichageWall (){
                axios.get('http://localhost:3000/api/wall/')  //-> getAllTheWall -> faudrait en fonction de l'utilisateur
                .then(reponse => this.posts = reponse.data)
                .catch(erreur => console.log(erreur));
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
