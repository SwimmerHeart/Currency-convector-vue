<template>
  <div class="container">
    <div class="content is-normal is-flex is-justify-content-center">
      <div class="box currency__box">
        <FormBox @add-text="convector"
        />
        <div class="is-flex is-justify-content-start">
          <p>Результат конвертации: ({{this.amount}} {{this.selected2[0]}} - {{this.selected2[1]}}) {{this.result}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormBox from "@/components/Form-box";
export default {
  name: 'Home-page',
  data() {
    return {
      text: '',
      amount: 1,
      paramsFromText: null,
      valutes: {},
      selected2: [],
      result: null,
      countries: ['RUB'],
    }
  },
  methods: {
    convector(text){
      this.amount = parseInt(text.match(/\d+/))
      this.paramsFromText = text.split(this.amount).join('').split(' ')
      this.selected2.length = 0
      this.countries.forEach(item=>{
        if(this.paramsFromText.includes(item)){
          // this.selected2.length !== 0 ? this.selected2[0] = item : this.selected2[1] = item
          if(this.selected2.length){
            this.selected2[0] = item
          }
          else {
            this.selected2[1] = item
          }
        }
      })

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
    //'https://www.cbr-xml-daily.ru/daily_json.js'
    //'https://www.cbr-xml-daily.ru/latest.js'
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(res => res.json())
        .then(data => {
          this.valutes = data.Valute

          for (let code in this.valutes) {
            this.countries.push(code)
          }
        })
        .catch(err => console.log(err))
  },
  components: {FormBox}
}
</script>
<style scoped>

.currency__box {
  max-width: 800px;
  width: 100%;
}
</style>
