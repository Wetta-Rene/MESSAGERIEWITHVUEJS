<template>
  <div class="home">
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
