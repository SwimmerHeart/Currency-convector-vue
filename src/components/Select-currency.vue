<template>
  <div class="control">
    <div class="select switcher__box">
      <select @change="convert"
              v-model="selected[0]"
              class="switcher__box-select"
      >
        <option v-for="option in countries" :value="option" v-bind:key="option">
          {{ option }}
        </option>
      </select>
      {{selected}}
    </div>
  </div>
</template>

<script>

export default {
  name:'select-currency',
  props: {
    todo: {
      type: Object,
      required: true
    },
    data(){
      return{}
    },
    computed:{}
  }
}
</script>


<style scoped lang="scss">
.switcher__box{
  width: 300px;
}
.switcher__box-select{
  width: 100%;
}

</style>