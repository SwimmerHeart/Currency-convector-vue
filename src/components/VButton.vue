<template>
  <button class="button is-primary"
          type="submit"
          @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "VButton"
}
</script>
