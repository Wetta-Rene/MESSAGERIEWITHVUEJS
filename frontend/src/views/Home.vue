<template>
  <div class="home">
    <div id="infoConnexionToUseApi">Vous devez être connecté.e pour utiliser l'application !</div>
      <Component_Connexion />
      <Component_Discussion />
  </div>
</template>

<script>
// @ is an alias to /src
import Component_Connexion from '@/components/Connexion.vue'
import Component_Discussion from '@/components/Discussion.vue'

export default {
  name: 'InscriptionView',
  components: {
    Component_Connexion, Component_Discussion
  }
}
</script>
