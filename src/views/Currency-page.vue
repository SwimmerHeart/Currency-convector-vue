<template>
  <div class="container">
    <div class="columns is-vcentered is-centered">
      <h3 class="column is-narrow">Моя валюта</h3>
      <USelect :options="valutes"
               @selectOption="convertOneUnit"
      />
      <p class="column is-narrow">Текущая дата {{this.time}}</p>
    </div>
    <CurrencyList :currency="valutes" />
    <b-button
        label="Ошибка загрузки с API"
        size="is-medium"
        @click="snackbar" />
  </div>
</template>

<script>
import CurrencyList from '@/components/Currency-list.vue'
import VSelect from "@/components/select/VSelect"
import USelect from "@/components/select/USelect"

import {getExchangeRate} from '@/api/api'

export default {
  name: 'Currency-page',
  components:{
    CurrencyList,
    VSelect,
    USelect
  },
  data() {
    return {
      valutes: [],
      filtersOptions: ['Российский рубль'],
      countries: ['RUB'],
      selected: ['RUB', 'USD'],
      time: '',
    }
  },
  methods: {
    snackbar() {
      this.$buefy.snackbar.open(`Default, positioned bottom-right with a green 'OK' button`)
    },
    convertOneUnit(option) {
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

      let currentObj = this.valutes.find(item=>item.Name === this.selected[0])

      defaultValute.Value = currentObj.Value
      defaultValute.Nominal = currentObj.Nominal

      this.valutes.map(item=>{
        // item.Value = (defaultValute.Value*defaultValute.Nominal/item.Value*item.Nominal)
        item.Value = (defaultValute.Value/item.Value*item.Nominal)
            .toFixed(4)
      })
    }
  },
  mounted() {
    //'https://www.cbr-xml-daily.ru/daily_json.js'
    //'https://www.cbr-xml-daily.ru/latest.js'
    //http://www.cbr.ru/scripts/XML_daily.asp?date_req=02/03/2002

    // fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    //     .then(res => res.json())
    //     .then(data => {
    //       this.valutes = Object.values(data.Valute)
    //       this.time = data.Date.slice(0,-15).split('-').reverse().join('.')
    //       for (let code of this.valutes) {
    //         this.countries.push(code)
    //       }
    //     })
    //     .catch(err => console.log(err))

    const getCurrencies = async () => {
      const exchangeData = await getExchangeRate()

      this.valutes = Object.values(exchangeData.Valute)
      //получаем текущую дату
      this.time = exchangeData.Date.slice(0,-15).split('-').reverse().join('.')
      for (let code of this.valutes) {
        this.countries.push(code)
      }
    }
    getCurrencies()

    // const getExchangeRateSber = async()=>{
    //   const response = await fetch('http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx')
    // }

  }
}

</script>
<style scoped>

</style>