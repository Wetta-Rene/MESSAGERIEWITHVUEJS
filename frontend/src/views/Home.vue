<template>
  <div class="home">
    <Component_Connexion />
  </div>
</template>

<script>
// @ is an alias to /src
import Component_Connexion from '@/components/Connexion.vue'

export default {
  name: 'InscriptionView',
  components: {
    Component_Connexion
  }
}
</script>
