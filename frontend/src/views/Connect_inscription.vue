<template>
  <div class="home">
    <Component_Connexion />
    <Component_Inscription />
  </div>
</template>

<script>
// @ is an alias to /src
import Component_Inscription from '@/components/Inscription.vue'
import Component_Connexion from '@/components/Connexion.vue'

export default {
  name: 'Home',
  components: {
    Component_Inscription, Component_Connexion
  }
}
</script>
