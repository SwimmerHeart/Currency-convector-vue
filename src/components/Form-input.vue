<template>
  <form class="is-flex mb-2"
        @submit.prevent="onSubmit"
  >
    <DataCurrencyInput v-model="textInput"
                       placeholder="Введите строку типа '15 usd in rub' для конвертирования"
    />
    <VButton submit="submit" :type="type"
    >Перевести</VButton>
  </form>
</template>

<script>
import DataCurrencyInput from "@/components/input/DataCurrencyInput"
import VButton from "@/components/framework/button/VButton"

export default {
  name: 'form-box',
  components: {
    DataCurrencyInput,
    VButton
  },
  props: {
    type:{
      type: String,
    }
  },
  data(){
    return {
      textInput: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.textInput.trim()) {
        const text = this.textInput.trim().toUpperCase()
        this.$emit('add-text', text)
        this.textInput = ''
      }
    }
  }
}

</script>