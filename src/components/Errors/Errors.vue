<template>
  <div>
    <div class="alert alert-danger">{{ msg }}</div>
  </div>
</template>
<script>
export default {
  name: 'Errors',
  props: ['msg'],
};
</script>
<style scoped>
.alert {
  border-radius: 0px;
}
.alert-danger {
  background: red;
  color: #fff;
}
</style>
