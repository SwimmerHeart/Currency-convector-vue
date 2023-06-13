<template>
  <b-field type="is-primary mr-1">
    <b-input type="text"
             placeholder="Введите строку типа '15 usd in rub' для конвертирования"
             v-model.trim="defaultValue"
    />
  </b-field>
</template>
`
<script>
export default {
  name: "VInput",
  props: {
    value: {
      type: String,
      default: null
    },
    placeholder:{
      type: String,
      default: ''
    },
    type:{
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
  },
}
</script>

<style scoped>

</style>