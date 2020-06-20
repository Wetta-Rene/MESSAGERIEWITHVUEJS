<template>
  <div class="tableauDeBord">
    <DiscussionComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import DiscussionComponent from '@/components/DiscussionComponent.vue'

export default {
  name: 'DashboardView',
  components: {
    DiscussionComponent
  }
}
</script>
