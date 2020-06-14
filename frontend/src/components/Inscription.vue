<template>
    <div class="connexion">
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
                </select></label>
            <button type="submit">Inscription</button>
        </form>

    </div>
</template>

<script>
const axios = require('axios').default;

export default {

  name: 'Component_Inscription',
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
                axios.post('http://localhost:3000/api/auth/signup', {
                        pseudo: this.pseudo,
                        email: this.email,
                        password: this.password,
                        level: this.level})
                .then(function (response) {
                    console.log(response);
                    console.log(response.data.id);
                    if(response.data.id){ //si l'utilisateur est bien inscrit
                        window.location.replace("http://localhost:8080/"); //on recharge la page
                        //localstorage.setItem********
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
