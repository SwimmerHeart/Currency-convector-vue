<template>
  <form
      @submit.prevent="onSubmit"
  >
    <VField>
      <DataAmountInput v-model="data.amount"
                       placeholder="0,00"
      />
      <CurrencyNameSelection placeholder="Currency from"
                             :options="options"
                             v-model="data.CurrencyCodeFrom"
      />
      <CurrencyNameSelection placeholder="Currency to"
                             :options="options"
                             v-model="data.CurrencyCodeTo"
      />
      <VButton submit="submit" :type="type"
      >Перевести
      </VButton>
    </VField>
  </form>
</template>

<script>
import VButton from "@/components/framework/button/VButton"
import CurrencyNameSelection from "@/components/select/CurrencyNameSelection"
import VField from "@/components/framework/VField"
import DataAmountInput from "@/components/input/DataAmountInput"

export default {
  name: "Form-select",
  components: {
    VButton,
    CurrencyNameSelection,
    VField,
    DataAmountInput
  },
  props: {
    type: {
      type: String,
    },
    options:{
      type: Array,
      default: []
    },
    countries:{
      type: Array,
      default: []
    },
    value:{
      type: Object,
      default: {}
    }
  },
  data(){
    return{
      data: {
        amount: undefined,
        CurrencyCodeFrom: '',
        CurrencyCodeTo: ''
      }
    }
  },
  methods: {
    onSubmit() {
       this.$emit('input', this.data)
    }
  },
  computed:{
    // amount:{
    //   get(){
    //     console.log('amount', this.value.amount)
    //     return this.value.amount
    //   },
    //   set(value){
    //     const resultStr = {
    //       amount: value,
    //       CurrencyCodeFrom: this.value.CurrencyCodeFrom,
    //       CurrencyCodeTo: this.value.CurrencyCodeTo
    //     }
    //     this.$emit('input', resultStr)
    //     console.log('textInput-resultStr', resultStr)
    //   }
    // },
    // CurrencyCodeFrom:{
    //   get(){
    //     console.log('CurrencyCodeFrom', this.value.CurrencyCodeFrom)
    //     return this.value.CurrencyCodeFrom
    //   },
    //   set(value){
    //     const resultStr = {
    //       amount: this.value.amount,
    //       CurrencyCodeFrom: value,
    //       CurrencyCodeTo: this.value.CurrencyCodeTo
    //     }
    //     this.$emit('input', resultStr)
    //   }
    // },
    // CurrencyCodeTo:{
    //   get(){
    //     console.log('CurrencyCodeTo', this.value.CurrencyCodeTo)
    //     return this.value.CurrencyCodeTo
    //   },
    //   set(value){
    //     const resultStr = {
    //       amount: this.value.amount,
    //       CurrencyCodeFrom: this.value.CurrencyCodeFrom,
    //       CurrencyCodeTo: value
    //     }
    //     this.$emit('input', resultStr)
    //   }
    // }
  },
  watch: {
    value: {
      handler: function() {
        this.data = this.value
      },
      //при создании делает первый запрос
      immediate: true
    }
},
}
</script>

<style scoped>

</style>