import axios from 'axios'

function useLoadMorePosts(totalPages, posts, page, limit) {
  const loadMorePosts = async () => {
    try {
      page.value += 1
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page.value,
          _limit: limit
        }
      })
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
      posts.value = [...posts.value, ...response.data]
    } catch (e) {
      console.log(e)
    }
  }
  return {
    loadMorePosts
  }
}

export { useLoadMorePosts }
