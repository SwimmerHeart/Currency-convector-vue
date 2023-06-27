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
    value:{
      type: Object,
      default: {}
    }
  },
  data(){
    return{
      data: ''
    }
  },
  methods: {
    onSubmit() {
       this.$emit('input', this.data)
    }
  },
  computed:{
    textInput:{
      get(){
        return this.value.amount
      },
      set(value){
        const resultStr = {
          amount: value,
          CurrencyCodeFrom: this.value.CurrencyCodeFrom,
          CurrencyCodeTo: this.value.CurrencyCodeTo,
          countries: this.value.countries
        }
        this.$emit('input', resultStr)
      }
    },
    CurrencyCodeFrom:{
      get(){
        return this.value.CurrencyCodeFrom
      },
      set(value){
        const resultStr = {
          amount: this.value.amount,
          CurrencyCodeFrom: value,
          CurrencyCodeTo: this.value.CurrencyCodeTo,
          countries: this.value.countries
        }
        this.$emit('input', resultStr)
      }
    },
    CurrencyCodeTo:{
      get(){
        return this.value.CurrencyCodeTo
      },
      set(value){
        const resultStr = {
          amount: this.value.amount,
          CurrencyCodeFrom: this.value.CurrencyCodeFrom,
          CurrencyCodeTo: value,
          countries: this.value.countries
        }
        this.$emit('input', resultStr)
      }
    }
  },
  watch:{
    value(value){
      this.data = this.value
}
  }
}
</script>

<style scoped>

</style>