<template>
    <div class="connexion">
        <h1>Tous les messages d'une discussion</h1>
        <form @submit.prevent="affichageDesMessages">
        <input type="text" name="discussion" v-model="discussion">
        <button type="submit">Afficher les messages</button>
        </form>
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
            discussion: 2,
            posts: null
        }        
    },
    methods:{
            affichageDesMessages (){
              if (this.discussion == null) {
                    return false;
                }
                axios.get('http://localhost:3000/api/discussions/read/'+this.discussion)
                .then(reponse => this.posts = reponse.data)   
                .catch(erreur => console.log(erreur));
            }
    },
    beforeMount(){ 
    this.affichageDesMessages() 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>