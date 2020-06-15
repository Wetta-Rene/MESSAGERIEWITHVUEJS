<template>
  <div>Le contenu de ta page</div>
</template>

<script>
const axios = require('axios').default;

export default {

  name: 'Dashboardview',
    data () {
        return {
        info: null
        }
    },
    mounted () {
        axios.get('http://localhost:3000/api/discussions')
        .then(response => (this.info = response))
    }

}
</script>
