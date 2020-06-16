<template>
    <div class="connexion">
        <h1>Nouvelle conversation</h1>
        <form @submit.prevent="formDiscussion">

            <label>Expéditeur (3):</label><label><input type="text" v-model="expediteur" /></label>
            <label>Destinataire (8):</label><label><input type="text" v-model="destinataire" /></label>
            <label>Message:</label><label><input type="textarea" v-model="content" /></label>
    
            <button type="submit">Créer la discussion</button>
        </form>

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
            content: null 
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
                .then(function (response) {
                    console.log(response);
                    if(response){ //
                        window.location.replace("http://localhost:8080/tableau"); //on change de page -> faudrait charger id de la discussion cree
                        console.log(response);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            }  
        
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
