<template>
  <div class="home">
    <Component_Inscription />
  </div>
</template>

<script>
// @ is an alias to /src
import Component_Inscription from '@/components/Inscription.vue'

export default {
  name: 'InscriptionView',
  components: {
    Component_Inscription
  }
}
</script>
