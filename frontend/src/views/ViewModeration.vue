<template>
  <div class="home">
    <ModerationComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import ModerationComponent from '@/components/ModerationComponent.vue'

export default {
  name: 'ModerationView',
  components: {
    ModerationComponent
  }
}
</script>
