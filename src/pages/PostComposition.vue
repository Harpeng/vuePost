<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="btns-app">
      <my-button class="btn-modal" @click="showDialog">Добавить пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading" />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observe"></div>
  </div>
</template>
<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import { usePosts } from '../hooks/usePosts'
import { useLoadMorePosts } from '../hooks/useLoadMorePosts'
import { useSortedPosts } from '../hooks/useSortedPosts'
import { useSearchAndSortedPosts } from '../hooks/useSearchAndSortedPosts'

export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' }
      ]
    }
  },
  setup(props) {
    const {
      posts,
      totalPages,
      isPostLoading,
      page,
      createPost,
      dialogVisible,
      showDialog,
      removePost
    } = usePosts(10)
    const { sortedPosts, selectedSort } = useSortedPosts(posts)
    const { searchQuery, sortedAndSearchedPosts } = useSearchAndSortedPosts(sortedPosts)
    const { loadMorePosts } = useLoadMorePosts(totalPages, posts, page, 10)

    return {
      posts,
      page,
      totalPages,
      isPostLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
      loadMorePosts,
      createPost,
      dialogVisible,
      showDialog,
      removePost
    }
  }
}
</script>
<style>
.btn-modal {
  margin: 15px 0;
}

.btns-app {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page__wrapper {
  display: flex;
  margin: 15px 0;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}
</style>
