<template>
  <VSelect @selectOption="convertOneUnit"
           :options="valutes"
           class="column is-narrow mb-0"
  />
</template>

<script>
import VSelect from "@/components/select/VSelect"
export default {
  name: "USelect",
  components:{
    VSelect
  }
}
</script>

<style scoped>

</style>