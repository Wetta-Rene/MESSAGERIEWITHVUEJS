<template>
  <div class="home">
      <DetailMessagesComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import DetailMessagesComponent from '@/components/DetailMessagesComponent.vue'


export default {
  name: 'DetailMessageView',
  components: {
    DetailMessagesComponent
  }
}
</script>
