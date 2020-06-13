import Vue from 'vue'
import App from './App.vue'
import router from './router'
require('dotenv').config();  //chargement du module dotenv pour charger .env avec les mots de passe, config, etc...


Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
