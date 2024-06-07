import Main from '@/pages/Main.vue'
import Post from '@/pages/Post.vue'
import PostPage from '@/pages/PostPage.vue'
import PostPageWithStore from '@/pages/PostPageWithStore.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/posts/:id',
    component: Post
  },
  {
    path: '/store',
    component: PostPageWithStore
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
