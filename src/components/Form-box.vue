<template>
  <form class="is-flex mb-2"
        @submit.prevent="onSubmit"
  >
    <v-input v-model="textInput"/>
    <v-button>Перевести</v-button>
  </form>
</template>

<script>
import VButton from "@/components/VButton"
import VInput from "@/components/input/VInput"

export default {
  name: 'form-box',
  components: {
    VButton,
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