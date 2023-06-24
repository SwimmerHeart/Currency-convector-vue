<template>
  <div class="container">
    <div class="columns is-centered is-vcentered">
        <FormSelection :options="formSelection" v-model="form"/>
    </div>
    <div class="columns is-centered">
      <div>
        <FormInput v-if="form === 'в строке'"
                   @add-text="convector"
        />
        <FormSelect v-else
                    :options="currencyDisplay"
                    @addDataSelect="convectorWithSelect"
        />
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
import FormSelection from "@/components/select/FormSelection"

export default {
  name: 'Home-page',
  components: {
    FormSelect,
    FormInput,
    FormSelection
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
      formSelection: ['в строке','с выбором валюты'],
      form: 'в строке',
      currencyDisplay: [{Name: 'Российский рубль', ID: 'RUB'}],
      CurrencyCodeFrom: '',
      CurrencyCodeTo: '',
      amountSelect: 1
    }
  },
  methods: {
    convector(text) {
      //определяем сумму из инпута, вырезая текст
      this.amount = parseInt(text.match(/\d+/))
      //получаем массив из слитных букв(сначала вырезаем из строки сумму, потом вырезаем пробелы)
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
    convectorWithSelect(amount, codeFrom, codeTo){
      this.CurrencyCodeFrom = codeFrom;
      this.CurrencyCodeTo = codeTo;
      this.amountSelect = +amount;

      const baseCurrency = 'RUB'
      let baseValue = {
        Value: 1,
        Nominal: 1
      };
      let exchangeCurrencyFrom = 1 / ((this.valutes[codeFrom]?.Value ?? baseValue.Value)/ (this.valutes[codeFrom]?.Nominal ?? baseValue.Nominal))
      let exchangeCurrencyTo = 1 / ((this.valutes[codeTo]?.Value ?? baseValue.Value)/ (this.valutes[codeTo]?.Nominal ?? baseValue.Nominal))
      let exchangeRate = +amount * (exchangeCurrencyTo / exchangeCurrencyFrom)
      this.text = `${amount} ${codeFrom} in ${codeTo}`
      console.log(exchangeRate)
    }
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
        Object.values(exchangeData.Valute).forEach(item => {
          this.currencyDisplay.push({
            Name: item['Name'],
            ID: item['CharCode']
          })
        })
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
