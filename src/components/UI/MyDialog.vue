<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ToggleMixin from '../../components/mixins/ToggleMixin'
export default {
  name: 'my-dialog',
  mixins: [ToggleMixin]
}
</script>

<style>
.dialog {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog-content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-width: 300px;
  min-height: 50px;
  padding: 20px;
}
</style>
