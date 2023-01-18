<template>
  <div class="about">
        <CurrencyList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CurrencyList from '@/components/CurrencyList.vue'

export default {
  name: 'HomeView',
  components: {
    CurrencyList
  }
}
</script>
