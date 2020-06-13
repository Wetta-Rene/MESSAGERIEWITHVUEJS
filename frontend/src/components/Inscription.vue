<template>
    <div class="connexion">
        <h1>Inscription</h1>
        <form @submit="formInscription">
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
import axios from 'axios'
export default {

  name: 'Component_Inscription',
    data () {
        return{
            pseudo: '',
            email: '',
            password: '',
            level: ''
        }
    },
    methods:{
        formInscription (){
            axios.post('http://localhost:3000/api/auth/signup', {
                    pseudo: this.pseudo,
                    email: this.email,
                    password: this.password,
                    level: this.level})
            .then(() => console.log("bienvenue"))
            .catch(() => console.log("erreur signup"))
        }  
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
