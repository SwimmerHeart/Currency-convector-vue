<template>
  <div class="container">
    <div class="columns is-centered is-vcentered">
      <DisplaySelectionCheckbox v-model="formCheck" :label="labelComponent"/>
<!--      <input type="checkbox" id="checkbox" v-model="formCheck">-->
<!--      <label for="checkbox">{{component}}</label>-->
<!--        <FormSelection :options="formSelection" v-model="form"/>-->
    </div>
    <div class="columns is-centered">
      <div>
        <keep-alive>
          <component :is="component"
                     @input="convector"
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
            Результат конвертации: {{ this.exchangeRate }}
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
  //Переключение между компонентами формам с помощью checkbox
  //Переключение должно осуществляться с помощью базового компонента Vue
  data() {
    return {
      valutes: {},
      formSelection: ['в строке','с выбором валюты'],
      form: 'в строке',
      component: 'FormInput',
      formCheck: true,
      labelComponent: 'сокращенный вариант',
      currencyDisplay: [{Name: 'Российский рубль', ID: 'RUB'}],
      convert: {
        amount: undefined,
        CurrencyCodeFrom: '',
        CurrencyCodeTo: '',
        countries: ['RUB']
      },
      countries: ['RUB'],
      exchangeRate: ''
    }
  },
  methods: {
    convector() {
      const baseValue = {
        Value: 1,
        Nominal: 1
      };
      let codeFrom = this.convert.CurrencyCodeFrom,
          codeTo = this.convert.CurrencyCodeTo,
          amount = this.convert.amount

      let exchangeCurrencyFrom = 1 / ((this.valutes[codeFrom]?.Value ?? baseValue.Value)/ (this.valutes[codeFrom]?.Nominal ?? baseValue.Nominal))
      let exchangeCurrencyTo = 1 / ((this.valutes[codeTo]?.Value ?? baseValue.Value)/ (this.valutes[codeTo]?.Nominal ?? baseValue.Nominal))
      this.exchangeRate = (+amount * (exchangeCurrencyTo / exchangeCurrencyFrom)).toFixed(4)
    },
  },
  mounted() {
    const getCurrencies = async () => {
      try {
        const exchangeData = await getExchangeRate()
        snackbarInfo('Данные о валютах загружены')
        this.valutes = exchangeData.Valute
        for (let code in this.valutes) {
          //потом удалить ниже строчку
          this.convert.countries.push(code)
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
  watch: {
    formCheck() {
      this.component = this.formCheck ? 'FormInput' : 'FormSelect'
      this.labelComponent = this.formCheck ? 'сокращенный вариант' : 'полный вариант'
    },

  }
}
</script>
<style scoped>

</style>
