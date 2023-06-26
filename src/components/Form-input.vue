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
  },
  methods: {
    // onSubmit() {
    //   if (this.textInput.trim()) {
    //     const text = this.textInput.trim().toUpperCase()
    //     this.$emit('add-text', text)
    //     this.textInput = ''
    //   }
    // }
    onSubmit() {
      this.$emit('add-text')
    }
  },
  computed:{
    textInput:{
      get(){
        return `${this.value.amount} ${this.value.CurrencyCodeFrom} in ${this.value.CurrencyCodeTo}`
      },
      set(value){
        const regex = new RegExp(`(\\d+)\\s*(${this.value.countries?.join('|')})\\b\\s+in\\s+(${this.value.countries?.join('|')})\\b`, 'i');
        const match = value.toUpperCase().match(regex);
        if (match) {
          const resultStr = {
            amount: match[1],
            CurrencyCodeFrom: match[2],
            CurrencyCodeTo: match[3],
            countries: this.value.countries
          }
          this.$emit('input', resultStr)
        }
      }
    },
  }
}

</script>