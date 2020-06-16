<template>
  <div class="home">
    <div id="infoConnexionToUseApi">Vous devez être connecté.e pour utiliser l'application !</div>
      <FormWallComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import FormWallComponent from '@/components/FormWallComponent.vue'


export default {
  name: 'InscriptionView',
  components: {
    FormWallComponent
  }
}
</script>
