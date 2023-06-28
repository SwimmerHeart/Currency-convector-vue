<template>
  <div class="container">
    <div class="columns is-centered is-vcentered">
      <DisplaySelectionCheckbox v-model="formCheck"
                                :label="labelComponent"/>
      <!--        <FormSelection :options="formSelection" v-model="form"/>-->
    </div>
    <div class="columns is-centered">
      <div>
        <keep-alive>
          <component :is="formCheck"
                     :options="currencyDisplay"
                     :countries="countries"
                     v-model="convert"
          ></component>
        </keep-alive>
        <!--        <FormInput v-if="form === 'в строке'"-->
        <!--                   @addData="convector"-->
        <!--                   v-model="convert"-->
        <!--        />-->
        <!--        <FormSelect v-else-->
        <!--                    :options="currencyDisplay"-->
        <!--                    @addData="convector"-->
        <!--                    v-model="convert"-->
        <!--        />-->
        <div class="columns">
          <p class="column has-text-left">
            Результат конвертации: {{ exchangeRate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/Form-input"
import {getExchangeRate} from "@/api/api"
import {snackbarError, snackbarInfo} from "@/components/Snackbar"
import FormSelect from "@/components/Form-select"
import FormSelection from "@/components/select/FormSelection"
import DisplaySelectionCheckbox from "@/components/input/DisplaySelectionCheckbox"

export default {
  name: 'Home-page',
  components: {
    FormSelect,
    FormInput,
    FormSelection,
    DisplaySelectionCheckbox
  },
  data() {
    return {
      valutes: {},
      formSelection: ['в строке', 'с выбором валюты'],
      form: 'в строке',
      formCheck: 'FormInput',
      currencyDisplay: [{Name: 'Российский рубль', ID: 'RUB'}],
      convert: {
        amount: undefined,
        CurrencyCodeFrom: '',
        CurrencyCodeTo: ''
      },
      countries: ['RUB'],
      dictForm: {
        'FormInput': 'сокращенный вариант',
        'FormSelect': 'полный вариант',
      }
    }
  },
  methods: {
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
  },
  computed: {
    exchangeRate() {
      if(!this.convert.amount || !this.convert.CurrencyCodeFrom || !this.convert.CurrencyCodeTo) return ''
      const baseValue = {
        Value: 1,
        Nominal: 1
      }
      let codeFrom = this.convert.CurrencyCodeFrom,
          codeTo = this.convert.CurrencyCodeTo,
          amount = this.convert.amount

      let exchangeCurrencyFrom = 1 / ((this.valutes[codeFrom]?.Value ?? baseValue.Value) / (this.valutes[codeFrom]?.Nominal ?? baseValue.Nominal))
      let exchangeCurrencyTo = 1 / ((this.valutes[codeTo]?.Value ?? baseValue.Value) / (this.valutes[codeTo]?.Nominal ?? baseValue.Nominal))
      return (+amount * (exchangeCurrencyTo / exchangeCurrencyFrom)).toFixed(2)
    },
    labelComponent (){
      return this.dictForm[this.formCheck]
    }
  }
}
</script>
<style scoped>

</style>
