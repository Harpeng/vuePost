import axios from 'axios'
import { onMounted, ref } from 'vue'

function usePosts(limit) {
  const posts = ref([])
  const page = ref(1)
  const totalPages = ref(0)
  const isPostLoading = ref(true)
  const dialogVisible = ref(false)
  const fetching = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page.value,
          _limit: limit
        }
      })
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
      posts.value = response.data
      posts.value = [...posts.value]
    } catch (e) {
      console.log(e)
    } finally {
      isPostLoading.value = false
    }
  }

  const showDialog = () => {
    dialogVisible.value = true
  }

  const createPost = (post) => {
    posts.value.push(post)
    dialogVisible.value = false
  }

  const removePost = (post) => {
    posts.value = posts.value.filter((p) => p.id !== post.id)
  }
  onMounted(fetching)
  return {
    posts,
    isPostLoading,
    totalPages,
    page,
    createPost,
    dialogVisible,
    showDialog,
    removePost
  }
}

export { usePosts }
