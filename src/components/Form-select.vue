<template>
  <form
      @submit.prevent="onSubmit"
  >
    <VField>
      <DataCurrencyInput v-model="textInput"
                         placeholder="0,00"
                         type="number"
      />
      <CurrencyNameSelection placeholder="Currency from"
                             :options="options"
                             v-model="CurrencyCodeFrom"
      />
      <CurrencyNameSelection placeholder="Currency to"
                             :options="options"
                             v-model="CurrencyCodeTo"
      />
      <VButton submit="submit" :type="type"
      >Перевести
      </VButton>
    </VField>
  </form>
</template>

<script>
import DataCurrencyInput from "@/components/input/DataCurrencyInput"
import VButton from "@/components/framework/button/VButton"
import CurrencyNameSelection from "@/components/select/CurrencyNameSelection"
import VField from "@/components/framework/VField"

export default {
  name: "Form-select",
  components: {
    DataCurrencyInput,
    VButton,
    CurrencyNameSelection,
    VField
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
  methods: {
    onSubmit() {
       this.$emit('addDataSelect')
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
  }
}
</script>

<style scoped>

</style>