<template>
  <b-field type="is-primary mr-2">
    <b-input :type="type"
             :placeholder="placeholder"
             v-model="defaultValue"
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