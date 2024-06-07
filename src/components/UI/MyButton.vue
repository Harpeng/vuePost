<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style>
.btn {
  padding: 10px 15px;
  border: 1px solid teal;
  background: none;
  color: teal;
  border-radius: 10px;
  cursor: pointer;
}
</style>
