<template>
  <div>
    <table class="table is-hoverable is-bordered  m-auto">
      <tbody>
      <tr class="has-background-success-light">
        <th>Код</th>
        <th>Единиц</th>
        <th>Валюта</th>
        <th>Курс ЦБ РФ</th>
      </tr>
      <tr v-for="cur in currency"
          :key="cur.ID"
      >
        <td>{{cur.CharCode}}</td>
        <td>{{ cur.Nominal }}</td>
        <td>{{cur.Name}}</td>
        <td>{{cur.Value}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'currency-list',
  components: {},
  props: {
    currency:{
      type:Array
    },

  }
}
</script>


<style scoped lang="scss">
  .table{
    max-width: 1200px;
    width: 100%;
  }

</style>
