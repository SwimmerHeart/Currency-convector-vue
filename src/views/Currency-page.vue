<template>
  <div class="container">
    <div class="columns is-vcentered is-centered">
      <h3 class="column is-narrow">Моя валюта</h3>
      <CurrencyNameSelection :options="currencyDisplay"
                             v-model="CurrencyCode"
      />
      <p class="column is-narrow">Текущая дата {{ this.time }}</p>
    </div>
    <CurrencyList :currency="valutes"/>
  </div>
</template>

<script>
import CurrencyList from '@/components/Currency-list.vue'
import CurrencyNameSelection from "@/components/select/CurrencyNameSelection"

import {getExchangeRate} from '@/api/api'
import {snackbarError, snackbarInfo} from "@/components/Snackbar";

export default {
  name: 'Currency-page',
  components: {
    CurrencyList,
    CurrencyNameSelection
  },
  data() {
    return {
      valutes: [],
      filtersOptions: ['Российский рубль'],
      countries: ['RUB'],
      selected: ['RUB', 'USD'],
      time: '',
      CurrencyCode: '',
      currencyDisplay: []
    }
  },
  mounted() {
    const getCurrencies = async () => {
    //   try {
    //     const exchangeData = await getExchangeRate(new Date().getTime())
    //     snackbarInfo('Данные о валютах загружены')
    //     this.valutes = Object.values(exchangeData.Valute)
    //     this.valutes.forEach(item => {
    //       this.currencyDisplay.push({
    //         Name: item['Name'],
    //         ID: item['CharCode']
    //       })
    //     })
    //     this.time = exchangeData.Date.slice(0, -15).split('-').reverse().join('.')
    //     for (let code of this.valutes) {
    //       this.countries.push(code)
    //     }
    //   } catch (error) {
    //     console.log('vue-error', error)
    //     snackbarError(error)
    //   }
      // try{
      //   // const exchangeData1 = await getExchangeRate(new Date().getTime(),{})
      //   const exchangeData1 = await getExchangeRate(new Date().getTime(),
      //       {handlers: {catch: [(error)=>{
      //             snackbarError('Сейчас неполадки у банка, попробуйте позже')
      //           }]}})
      // }
      // catch (error) {
      //   console.log('vue-error2', error)
      //   snackbarError('Сейчас неполадки у банка, попробуйте позже')
      // }

      // try {
      //   const exchangeData1 = await getExchangeRate(new Date().getTime())
      // }
      // catch (e) {
      //
      // }
      const exchangeData2 = await getExchangeRate(new Date().getTime(),
          {handlers: {catch: [(error)=>{
                console.log(error)
                snackbarError('Сейчас неполадки у банка, попробуйте позже, запрос 2')
                return Promise.resolve()
              }]}})
      // try{
      //   const exchangeData3 = await getExchangeRate(new Date().getTime(),
      //       {handlers: {catch: []}})
      // }
      // catch (error) {
      //   snackbarError('Сейчас неполадки у банка, попробуйте позже, запрос 3')
      // }
    }
    getCurrencies()
  },
  computed: {},
  methods: {
    convertOneUnit(option) {
      // const baseCurrency = 'RUB'
      // const baseCurrency = {
      //   CharCode: 'RUB',
      //   Name: 'Российский рубль',
      //   Value: 1,
      //   Nominal: 1
      // }
      // this.valutes.push(baseCurrency)
      this.selected[0] = option
      let defaultValute = {
        Value: 1,
        Nominal: 1
      }
      let firstValute = this.valutes[this.selected[0]] ?? defaultValute,
          firstValuteValue = firstValute.Value,
          firstValuteNominal = firstValute.Nominal;

      let secondValute = this.valutes[this.selected[1]] ?? defaultValute,
          secondValuteValue = secondValute.Value,
          secondValuteNominal = secondValute.Nominal;

      let result = (firstValuteValue / firstValuteNominal) / (secondValuteValue / secondValuteNominal)
      this.result = result ? result.toFixed(4) : null;
      //определяем базовую валюту
      let currentObj = this.valutes.find(item => item.CharCode === this.selected[0])

      defaultValute.Value = currentObj.Value
      defaultValute.Nominal = currentObj.Nominal

      this.valutes.map(item => {
        // item.Value = (defaultValute.Value*defaultValute.Nominal/item.Value*item.Nominal)
        item.Value = (defaultValute.Value / item.Value * item.Nominal)
            .toFixed(4)
      })
    }
  },
  watch: {
    CurrencyCode() {
      this.convertOneUnit(this.CurrencyCode)
    }
  }
}

</script>
<style scoped>

</style>