<template>
    <div id="moderation">
            <h1>Modérer un post</h1>{{ $route.params.id }}
      <div class="wallPartiePosts">
                <article class="articlePost" v-for="wallpostmoderate in wallPostsModerate" :key="wallpostmoderate.id"> 
                    <div class="post-element">{{ wallpostmoderate.title }}</div>
                    <div class="post-element">Ecrit par: {{ wallpostmoderate.userId }} le {{wallpostmoderate.create_at}} </div>
                    <div class="post-element">{{ wallpostmoderate.content }}</div>
                    <div class="post-element">{{ wallpostmoderate.urlImage }}</div>
                </article>
                <div class="divformModeration">
                    <form @submit.prevent="formModeration">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Texte de<br />modération:</span>
                            </div>
                            <textarea class="form-control" v-model="content" ></textarea>
                        </div>
                        <button class="btn btn-success" type="submit">Valider la modération !</button>
                    </form>                   
                </div>
        </div>   
    </div>
</template>

<script>
const axios = require('axios').default;
export default {
  name: 'ModerationComponent',
    data () {
        return{
            postId: null,
            Admin: null,
        }        
    },
    methods:{
        modererPost(){
            axios.get('http://localhost:3000/api/admin/moderation/"'+this.$route.params.postId+'" ') //on recupere l'article qui sera modérer
            .then(reponse => this.wallPostsModerate = reponse.data)   
            .catch(erreur => console.log(erreur));
        },
        redirection(){
            window.location.href= 'http://localhost:8080/' //retour à l'acceuil si pas niveau 4
        }
    },
    beforeMount(){ 
       
        this.modererPost()

        if(localStorage.authUser && localStorage.levelUser == 4){// si utilisateur connecter est un adminisitrateur
        this.Admin = true
        }else{
            this.redirection()
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#profil{
    width: 80%;
    margin: auto;
}
</style>