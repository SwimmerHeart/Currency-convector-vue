<template>
  <div class="container">
    <div class="select__box is-flex is-align-items-center is-justify-content-center mb-3">
      <h3 class="select__title mr-3">Моя валюта</h3>
      <div class="select mr-3">
      </div>
      <VSelect @selectOption="convertOneUnit"
               :options="valutes"
               class="select mr-3"
      />
      <p>Текущая дата {{this.time}}</p>
    </div>
    <CurrencyList v-bind:currency="valutes" />
    <b-button
        label="Ошибка загрузки с API"
        size="is-medium"
        @click="snackbar" />
  </div>
</template>

<script>
import CurrencyList from '@/components/Currency-list.vue'
import VSelect from "@/components/select/VSelect"

import {getExchangeRate} from '@/api/api'

export default {
  name: 'Currency-page',
  components:{
    CurrencyList,
    VSelect,
  },
  data() {
    return {
      valutes: [],
      filtersOptions: ['Российский рубль'],
      countries: ['RUB'],
      selected: ['RUB', 'USD'],
      time: '',
      temp: false
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