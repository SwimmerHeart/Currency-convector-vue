<template>
  <b-field>
    <b-select v-model="selectedItem"
    >
      <option v-for="option in options"
              :value="option.CharCode"
              :key="option.ID"
      >
        {{option.Name}}
      </option>
    </b-select>
  </b-field>
</template>

<script>
export default {
  name: "VSelect",
  props: {
    value: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default (){
        return []
      }
    }
  },
  computed:{
    selectedItem:{
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