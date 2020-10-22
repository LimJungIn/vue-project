<template>
  <b-container class="table-container">
    <b-table striped hover :items="items"></b-table>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        items: [
         { age: 32, first_name: 'Cyndi' },
         { age: 27, first_name: 'Havij' },
         { age: 42, first_name: 'Robert' }
        ]
      }
    }
  }
</script>
 <style>
  .table-container{
    margin-top:3%;
  }
</style>
