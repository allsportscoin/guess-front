<template>
    <router-view/>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$http = axios;
export default {
  name: 'app',
  data () {
      return {
      }
   },
   created () {
       this.$store.dispatch('addAllData');
   },
   methods: {
   }
}
</script>
