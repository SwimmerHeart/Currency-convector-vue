<template>
  <form class="is-flex mb-2"
        @submit.prevent="onSubmit"
  >
    <my-input v-model="textInput"/>
    <v-button>Перевести</v-button>
  </form>
</template>

<script>
import VButton from "@/components/VButton"
import VInput from "@/components/input/VInput"
import MyInput from "@/components/input/UInput"

export default {
  name: 'form-box',
  components: {
    VButton,
    MyInput,
    VInput
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
    },
  }
}

</script>