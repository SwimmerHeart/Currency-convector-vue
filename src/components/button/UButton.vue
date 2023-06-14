<template>
    <v-button  @click="$emit('click')" :type="type">
      <slot></slot>
    </v-button>
</template>

<script>
import VButton from "@/components/button/VButton"

export default {
  name: "UButton",
  components:{
    VButton
  },
  props:{
    type:{
      type: String,
    }
  }
}
</script>

<style scoped>

</style>