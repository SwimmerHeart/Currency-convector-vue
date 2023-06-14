<template>
  <VSelect :options="options"
           class="column is-narrow mb-0"
           v-model="selectedItem"
  />
</template>

<script>
import VSelect from "@/components/framework/select/VSelect"
export default {
  name: "USelect",
  components:{
    VSelect
  },
  props: {
    value:{
      type: String
    },
    options: {
      type: Array,
      default (){
        return []
      }
    }
  },
  methods:{
    selectOption(option){
      this.$emit('selectOption', option)
    }
  },
  computed:{
    selectedItem:{
      get(){
        return this.value
      },
      set(value){
        console.log('22', value)
        this.$emit('input', value)
      }
    }
  },
}
</script>

<style scoped>

</style>