<template>
  <VInput placeholder="Введите строку типа '15 usd in rub' для конвертирования"
           v-model="defaultValue"
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