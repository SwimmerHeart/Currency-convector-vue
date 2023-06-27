<template>
  <b-checkbox v-model="checkbox">
    {{ label }}
  </b-checkbox>
</template>

<script>
export default {
  name: "VCheckbox",
  props: {
    value: {
      type: [String, Boolean],
      default: null
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    checkbox: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>

</style>