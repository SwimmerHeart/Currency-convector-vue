<template>
  <div class="container">
    <div class="select__box is-flex is-align-items-center is-justify-content-center mb-3">
      <h3 class="select__title mr-3">Моя валюта</h3>
      <div class="select switcher__box mr-3">
        <select @change="convertOneUnit"
                v-model="selected[0]"
                class="switcher__box-select"
        >
          <option v-for="option in countries" :value="option.Name" v-bind:key="option.ID">
            {{ option.Name}}
          </option>
        </select>
      </div>
      <p>Текущая дата {{this.time}}</p>
    </div>
    <CurrencyList v-bind:currency="valutes"
    />
  </div>
</template>

<script>
import CurrencyList from '@/components/Currency-list.vue'

export default {
  name: 'Currency-page',
  data() {
    return {
      valutes: [],
      filtersOptions: ['Российский рубль'],
      countries: ['RUB'],
      selected: ['RUB', 'USD'],
      time: ''
    }
  },
  methods: {
    convertOneUnit() {
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
    },
  },
  mounted() {
    //'https://www.cbr-xml-daily.ru/daily_json.js'
    //'https://www.cbr-xml-daily.ru/latest.js'
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(res => res.json())
        .then(data => {
          this.valutes = Object.values(data.Valute)
          this.time = data.Date.slice(0,-15).split('-').reverse().join('.')

          for (let code of this.valutes) {
            this.countries.push(code)
          }
        })
        .catch(err => console.log(err))
  },
  components: {
    CurrencyList
  }
}

</script>
<style scoped>
.switcher__box {
  max-width: 300px;
  width: 100%;
}

.switcher__box-select {
  width: 100%;
}
</style>