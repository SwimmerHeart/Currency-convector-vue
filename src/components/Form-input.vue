<template>
  <form class="is-flex mb-2"
        @submit.prevent="onSubmit"
  >
    <DataCurrencyInput v-model="textInput"
                       placeholder="Введите строку типа '15 usd in rub' для конвертирования"
    />
    <VButton submit="submit" :type="type"
    >Перевести</VButton>
  </form>
</template>

<script>
import DataCurrencyInput from "@/components/input/DataCurrencyInput"
import VButton from "@/components/framework/button/VButton"

export default {
  name: 'form-input',
  components: {
    DataCurrencyInput,
    VButton
  },
  props: {
    type:{
      type: String,
    },
    value: {
      type: Object,
      default: null
    },
    countries: {
      type: Array,
      default: []
    },
  },
  methods: {
    onSubmit() {
      this.$emit('addData')
    }
  },
  computed:{
    textInput:{
      get(){
        if(!this.value?.amount){
          return ''
        }
        if(!this.value?.CurrencyCodeFrom) return `${this.value.amount}`
        if(!this.value?.CurrencyCodeTo) return `${this.value.amount} ${this.value.CurrencyCodeFrom} in `
        return `${this.value.amount} ${this.value.CurrencyCodeFrom} in ${this.value.CurrencyCodeTo}`
      },
      set(value){
        const regex = new RegExp(`(\\d+)\\s*(${this.countries.join('|')})\\b\\s+in\\s+(${this.countries.join('|')})\\b`, 'i');
        const match = value.toUpperCase().match(regex);
        if (match) {
          const resultStr = {
            amount: parseFloat(match[1]),
            CurrencyCodeFrom: match[2],
            CurrencyCodeTo: match[3]
          }
          this.$emit('input', resultStr)
        }
      }
    },
  }
}

</script>