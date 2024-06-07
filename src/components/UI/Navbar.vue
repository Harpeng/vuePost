<template>
  <div class="navbar">
    <div class="navbar__title">PostGarage</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Все посты</my-button>
      <my-button @click="$router.push('/')">Главная страница</my-button>
    </div>
  </div>
</template>

<script>
import router from '@/router/router'

export default {}
</script>

<style>
.navbar {
  display: flex;
  height: 50px;
  background-color: black;
  box-shadow: 2px 2px 4px gray;
  align-items: center;
  padding: 0 15px;
}

.navbar__title {
  color: teal;
}

.navbar__btns {
  display: flex;
  gap: 10px;
  margin-left: auto;
  cursor: pointer;
}
</style>
