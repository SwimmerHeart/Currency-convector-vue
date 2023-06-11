<template>
    <input class="input is-primary mr-1"
           type="text"
           placeholder="Введите строку типа '15 usd in rub' для конвертирования"
           :value="value"
           @input="$emit('input', $event.target.value)"
    >
</template>
`
<script>
export default {
  name: "VInput",
  props: {
    value: {
      type: String,
      default: null
    }
  },
}
</script>

<style scoped>

</style>