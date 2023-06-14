<template>
  <form class="is-flex mb-2"
        @submit.prevent="onSubmit"
  >
    <u-input v-model="textInput"/>
    <u-button type="submit">Перевести</u-button>
  </form>
</template>

<script>
import UInput from "@/components/input/UInput"
import UButton from "@/components/button/UButton"

export default {
  name: 'form-box',
  components: {
    UInput,
    UButton
  },
  props: {},
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