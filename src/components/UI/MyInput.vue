<template>
      <input :value="modelValue" @input="updateInput" class="input" type="text"/>
</template>

<script>
export default {
    props: {
        modelValue: [String, Number]
    },
    name: 'my-input',
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>