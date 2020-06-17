<template>
  <div class="home">
    <div id="infoConnexionToUseApi">Vous devez être connecté.e pour utiliser l'application !</div>
      <ConnexionComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import ConnexionComponent from '@/components/ConnexionComponent.vue'


export default {
  name: 'InscriptionView',
  components: {
    ConnexionComponent
  }
}
</script>
