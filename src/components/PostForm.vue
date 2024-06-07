<template>
  <form @submit.prevent class="form">
    <h4>Создание поста</h4>
    <my-input v-focus v-model="post.title" class="input" type="text" placeholder="Название" />
    <my-input v-model="post.body" class="input" type="text" placeholder="Описание" />
    <my-button class="btn-form" @click="createPost">Создать</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
}

.btn-form {
  align-self: flex-end;
  margin-top: 15px;
}
</style>
