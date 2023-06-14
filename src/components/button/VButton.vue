<template>
  <b-button type="is-primary"
            @click="$emit('click')"
  >
    <slot></slot>
  </b-button>
</template>

<script>
export default {
  name: "VButton"
}
</script>
