<template>
  <form class="is-flex mb-2"
        @submit.prevent="onSubmit"
  >
    <DataCurrencyInput v-model="textInput"/>
    <VButton submit="submit" :type="type"
    >Перевести
    </VButton>
  </form>
</template>

<script>
import DataCurrencyInput from "@/components/input/DataCurrencyInput"
import VButton from "@/components/framework/button/VButton"

export default {
  name: "Form-select",
  components: {
    DataCurrencyInput,
    VButton
  },
  props: {
    type: {
      type: String,
    }
  },
  data() {
    return {
      textInput: ''
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style scoped>

</style>