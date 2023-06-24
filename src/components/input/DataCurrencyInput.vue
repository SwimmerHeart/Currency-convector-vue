<template>
  <VInput :placeholder="placeholder"
           v-model="defaultValue"
          :type="type"

  />
</template>

<script>
import VInput from "@/components/framework/input/VInput"
export default {
  name: "DataCurrencyInput",
  components:{
    VInput
  },
  props:{
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed:{
    defaultValue:{
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>

</style>