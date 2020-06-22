<template>
    <div class="profil">
        <h1>Mon profil</h1>
                        <ul class="list-group" v-for="membre in memberDatas" :key="membre.id">
                            <li class="list-group-item">Pseudo: {{membre.pseudo}}</li>
                            <li class="list-group-item">Email: {{membre.email}}</li>
                            <li class="list-group-item">Mot de passe: C'est secret...</li>
                            <li class="list-group-item">Fonction: {{membre.level}}</li>
                        </ul>            
    </div>
</template>

<script>
const axios = require('axios').default;
export default {
  name: 'ProfilComponent',
    data () {
        return{
            userId: null,
            userPosts: null,
            memberDatas: null,
            Admin: null
        }        
    },
    mounted() {
        if(localStorage.authUser) {
        this.userId = localStorage.authUser;
        }
    },
    methods:{
            affichageProfil (){
                axios.get('http://localhost:3000/api/auth/profil/'+localStorage.authUser)  //
                .then(reponse => this.memberDatas = reponse.data)
                .catch(erreur => console.log(erreur));
            },
    },
    beforeMount(){ 
        this.affichageProfil() 

        if(localStorage.authUser && localStorage.levelUser == 4){// si utilisateur connecter est un adminisitrateur
        this.Admin = true
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>