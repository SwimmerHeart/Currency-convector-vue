<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-narrow">
        <CurrencyNameSelection :options="formSelection" v-model="form"/>
        <FormInput @add-text="convector"/>
        <FormSelect />
        <div class="columns">
          <p class="column has-text-left">
            Результат конвертации: ({{ this.amount }} {{ this.selected2[0] }} - {{ this.selected2[1] }})
            {{ this.result }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/Form-input";
import {getExchangeRate} from "@/api/api";
import {snackbarError, snackbarInfo} from "@/components/Snackbar";
import FormSelect from "@/components/Form-select";
import CurrencyNameSelection from "@/components/select/CurrencyNameSelection"

export default {
  name: 'Home-page',
  components: {
    FormSelect,
    FormInput,
    CurrencyNameSelection
  },
  data() {
    return {
      text: '',
      amount: 1,
      paramsFromText: null,
      valutes: {},
      selected2: [],
      elem1: '',
      elem2: '',
      result: null,
      countries: ['RUB'],
      formSelection: ['в строке', 'с выбором валюты'],
      form: ''
    }
  },
  methods: {
    convector(text) {
      this.amount = parseInt(text.match(/\d+/))
      this.paramsFromText = text.split(this.amount).join('').split(' ')
      this.selected2.length = 0
      console.log(this.paramsFromText)
      this.countries.forEach(item => {
        if (this.paramsFromText.indexOf(item) !== -1) {
          this.elem1 = this.paramsFromText.indexOf(item)
          return true
        }
        if (this.paramsFromText.lastIndexOf(item) !== -1) {
          this.elem2 = this.paramsFromText.lastIndexOf(item)
          return true
        }
        // this.selected2.length !== 0 ? this.selected2[0] = item : this.selected2[1] = item
      })
      console.log('this.elem1', this.elem1)
      console.log('this.elem2', this.elem2)

      // Дефолтные значения / RUB
      let defaultValute = {
        Value: 1,
        Nominal: 1
      };
      // определяем детали 1й валюты
      let firstValute = this.valutes[this.selected2[0]] ?? defaultValute,
          firstValuteValue = firstValute.Value * this.amount,
          firstValuteNominal = firstValute.Nominal;
      // определяем детали 2й валюты
      let secondValute = this.valutes[this.selected2[1]] ?? defaultValute,
          secondValuteValue = secondValute.Value,
          secondValuteNominal = secondValute.Nominal;
      // результат вычислений
      let result = (firstValuteValue / firstValuteNominal) / (secondValuteValue / secondValuteNominal)
      //округляем
      this.result = result ? result.toFixed(4) : null;
    },
  },

  mounted() {
    const getCurrencies = async () => {
      try {
        const exchangeData = await getExchangeRate()
        snackbarInfo('Данные о валютах загружены')
        this.valutes = exchangeData.Valute
        for (let code in this.valutes) {
          this.countries.push(code)
        }
      } catch (error) {
        snackbarError(error)
      }
    }
    getCurrencies()
  }
}
</script>
<style scoped>

</style>
