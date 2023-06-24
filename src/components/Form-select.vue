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
    }
  },
  data() {
    return {
      textInput: '',
      CurrencyCodeFrom: '',
      CurrencyCodeTo: ''
    }
  },
  methods: {
    onSubmit() {
       this.$emit('addDataSelect', this.textInput, this.CurrencyCodeFrom, this.CurrencyCodeTo)
          this.textInput = ''
          this.CurrencyCodeFrom = ''
          this.CurrencyCodeTo = ''
    }
  }
}
</script>

<style scoped>

</style>