<template>
  <form class="is-flex mb-2"
        @submit.prevent="onSubmit"
  >
    <input class="input is-primary mr-1"
           type="text"
           placeholder="Введите строку типа '15 usd in rub' для конвертирования"
           v-model="textInput"
    >
    <button class="button is-primary"
            type="submit"
    >Перевести
    </button>
  </form>
</template>


<script>
export default {
  name: 'form-box',
  components: {},
  props: {

  },
  data(){
    return {
      textInput: ''
    }
  },
  methods: {
    onSubmit() {
        if(this.textInput.trim()){
          const text =this.textInput.trim().toUpperCase()
          this.$emit('add-text', text)
        }
      this.textInput = ''
    },
  }
}

</script>