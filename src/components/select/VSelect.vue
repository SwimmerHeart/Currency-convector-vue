<template>
  <select v-model="selected"  @change="$emit('selectOption', selected)">
    <option v-for="option in options"
            :value="option.Name"
            :key="option.ID"
    >
      {{option.Name}}
    </option>
  </select>
</template>

<script>
export default {
  name: "VSelect",
  props: {
    options: {
      type: Array,
      default (){
        return []
      }
    }
  },
  data(){
    return{
      selected: ''
    }
  }
}
</script>

<style scoped>

</style>