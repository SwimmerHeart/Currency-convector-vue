<template>
  <VSelect :options="options"
           class="column is-narrow mb-0"
           @change="selectOption"
  />
</template>

<script>
import VSelect from "@/components/select/VSelect"
export default {
  name: "USelect",
  components:{
    VSelect
  },
  props: {
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
  // computed:{
  //   selectedItem:{
  //     get(){
  //       return this.value
  //     },
  //     set(value){
  //       console.log('22', value)
  //       this.$emit('change', value)
  //     }
  //   }
  // },
}
</script>

<style scoped>

</style>