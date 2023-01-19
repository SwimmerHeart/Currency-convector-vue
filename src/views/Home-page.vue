<template>
  <div class="container">
    <div class="calc">
      <div class="calc__box">
        <div class="calc__side">
          <h3 class="calc__title">Хочу поменять</h3>
          <div class="calc__switcher">
            <div class="control">
              <div class="select switcher__box">
                <select @change="convert"
                        v-model="selected[0]"
                        class="switcher__box-select"
                >
                  <option v-for="option in countries" :value="option" v-bind:key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="calc__input-box ">
            <input class="input__box-input"
                   type="text"
                   value="5000"
                   @input="convert"
                   v-model="inputed"
                   :rules="[rules.onlyNumbers]"
            />
            <div class="input__box-rate heading"
                 @change="convert"
            >1 {{ selected[0] }} = {{ExchangeRates}} {{ selected[1] }}</div>
          </div>
        </div>
      </div>
      <div class="calc__center">
        <svg style="width:50px;height:50px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" />
        </svg>
      </div>
      <div class="calc__box">
        <div class="calc__side">
          <h3 class="calc__title">Валюта при конвертации</h3>
          <div class="calc__switcher">
            <div class="control">
              <div class="select switcher__box">
                <select @change="convert"
                        v-model="selected[1]"
                        select=""
                        class="switcher__box-select"
                >
                  <option v-for="option in countries" :value="option" v-bind:key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="calc__input-box">
            <input class="input__box-input"
                   v-model="result"
                   type="number"
                   readonly
            />
            <div class="input__box-rate heading"
                 @change="convert"
            >1 {{ selected[1] }} = {{ExchangeRatesReverse}} {{ selected[0] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home-page',
  data(){
    return {
      valutes: {},
      selected: ['RUB', 'USD'],
      inputed: "",
      result: null,
      ExchangeRates: null,
      ExchangeRatesReverse: null,
      countries: ['RUB'],
      rules: {
        onlyNumbers: (value) => {
          const pattern = /^\d+$/.test(value);
          if (!pattern) this.inputed = this.inputed.replace(/\D/g, '');
          return true;
        }
      }
    }
  },
  methods: {
    convert() {
      // Дефолтные значения / RUB
      let defaultValute = {
        Value: 1,
        Nominal: 1
      };
      // определяем детали 1й валюты
      let firstValute = this.valutes[this.selected[0]] ?? defaultValute,
          firstValuteValue = firstValute.Value * Number(this.inputed),
          firstValuteOneUnit = firstValute.Value,
          firstValuteNominal = firstValute.Nominal;
      // определяем детали 2й валюты
      let secondValute = this.valutes[this.selected[1]] ?? defaultValute,
          secondValuteValue = secondValute.Value,
          secondValuteNominal = secondValute.Nominal;
      // результат вычислений
      let result = (firstValuteValue / firstValuteNominal) / (secondValuteValue / secondValuteNominal),
          ExchangeRates = (firstValuteOneUnit / firstValuteNominal) / (secondValuteValue / secondValuteNominal),
          ExchangeRatesReverse = secondValuteValue * firstValuteNominal / firstValuteOneUnit
      //округляем
      this.result = result ? result.toFixed(4) : null;

      this.ExchangeRates = ExchangeRates ? ExchangeRates.toFixed(4) : null;
      this.ExchangeRatesReverse = ExchangeRatesReverse ? ExchangeRatesReverse.toFixed(4) : null;
    },
  },
  mounted() {
    //'https://www.cbr-xml-daily.ru/daily_json.js'
    //'https://www.cbr-xml-daily.ru/latest.js'
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(res=>res.json())
        .then(data=>{
          this.valutes = data.Valute

          for (let code in this.valutes) {
            this.countries.push(code)
          }
        })
        .catch(err=>console.log(err))
  },
  components: {

  }
}
</script>
<style scoped>
.calc{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
}
.calc__title{
  color: #777;
  margin: 10px 0;
}
.calc__input-box{
  max-width: 300px;
  width: 100%;
  margin: 24px 0;
  padding: 30px 20px 15px;
  border: 1px solid #cdcdcd;
  border-radius: 0.5rem;
  flex-direction: column;
  text-align: left;
}
.input__box-input{
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  font-size: 2.5rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 1rem;
}
.calc__center{
  width: 50px;
  height: 50px;
  margin: 0 1rem;
  padding-top: 40px;
}
.switcher__box{
  max-width: 300px;
  width: 100%;
}
.switcher__box-select{
  width: 100%;
}
</style>
