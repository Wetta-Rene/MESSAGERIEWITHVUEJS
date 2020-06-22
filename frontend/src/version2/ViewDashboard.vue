<template>
  <div class="tableauDeBord">
    <DashboardComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import DashboardComponent from '@/components/DashboardComponent.vue'

export default {
  name: 'DashboardView',
  components: {
    DashboardComponent
  }
}
</script>
