<template>
    <div class="inscription">
        <h1>Inscription</h1>
        <form @submit.prevent="formInscription">

            <label>Pseudo:</label><label><input type="text" v-model="pseudo" /></label>
            <label>Adresse mail:</label><label><input type="email" v-model="email" /></label>
            <label>Mot de passe:</label><label><input type="password" v-model="password" /></label>
            <label>Vous êtes:</label><label>
                <select v-model="level">
                    <option value="1">Technicien.ne</option>
                    <option value="2">Chef de centre</option>
                    <option value="3">Responsable de secteur</option>
                    <option value="4">Chargé.e de communication</option>
                </select></label>
            <button type="submit">Inscription</button>
        </form>

    </div>
</template>

<script>
const axios = require('axios').default;

export default {

  name: 'InscriptionComponent',
    data () {
        return{
            pseudo: null,
            email: null,
            password: null,
            level: null 
        }
    },
    methods:{
            formInscription (){
                if (this.pseudo == null || this.email == null || this.password == null) {
                    return false;
                }
                axios.post('http://localhost:3000/api/user/signup', {
                        pseudo: this.pseudo,
                        email: this.email,
                        password: this.password,
                        level: this.level})
                .then(function (response) {
                    if(response.status == 200 && response.data.id){ //si l'utilisateur est bien inscrit
                        localStorage.setItem("messageNav", "Inscription ok, veuillez vous identifer !");
                        window.location.replace("http://localhost:8080/"); //on va a la page de connexion
                    }else{
                        localStorage.setItem("messageNav", "Erreur dans l'inscription !");
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
