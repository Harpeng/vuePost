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
    <!-- <div v-intersection="loadMorePosts" class="observe"></div> -->
    <div class="page__navigation">
      <button class="btn__loadmore" @click="loadMore">показать еще</button>
      <div class="page__wrapper">
        <div
          class="page"
          v-for="(pageNumber, index) in paginationPage"
          :key="pageNumber === '...' ? 'elipsis' + index : pageNumber"
          :class="{ 'current-page': page === pageNumber }"
          @click="changePage(pageNumber)"
        >
         <p v-if="pageNumber !== '...'" class="page__number">{{ pageNumber }}</p>
         <span v-else class="page__elipsis">...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import axios from 'axios'

export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      searchQuery: '',
      selectedSort: '',
      page: 1,
      totalPages: 0,
      offset: 0,
      limit: 10,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' }
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    changePage(pageNumber) {
      if (pageNumber !== '...') {
        this.page = pageNumber;
        this.fetchPosts();
      }
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _start: this.offset,
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        console.log(e)
      } finally {
        this.isPostLoading = false
      }
    },
    async loadMore() {
      try {
        this.page += 1;
        this.offset = (this.page - 1) * this.limit;

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _start: this.offset,
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
        console.log('dfdf', this.offset)
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.fetchPosts()
    console.log(this.paginationPage)

    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }

    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts()
    //   }
    // }

    // const observer = new IntersectionObserver(callback, options)
    // observer.observe(this.$refs.observer)
  },
  computed: {
    paginationPage() {
      if (this.totalPages < 5) {
        return this.totalPages;
      }

      const pages = [];

      if (this.page < 4) {
        pages.push(1, 2, 3, 4,'...', this.totalPages);
      } else if (this.page >= this.totalPages - 3) {
        pages.push(1,'...', this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, '...', this.page - 1, this.page, this.page + 1, '...', this.totalPages)
      }

      return pages;
    },
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  watch: {
    page() {
      console.log('hey')
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

.page__navigation {
  padding: 40px 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
