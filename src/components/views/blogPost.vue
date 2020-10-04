<template>
  <div class="blog-post-wrapper">
    <article>
      <h1>{{ this.post.title }}</h1>
      <span>{{ this.post.publish_date }}</span>
      <div v-html="compiledHtml">{{ this.content }}</div>
    </article>
  </div>
</template>
<script>
import posts from '@/assets/posts.json'
import axios from "axios"

export default {
  name: "SomeBlogPost",
  data() {
    return {
      post: "",
      content: ""
    }
  },
  created() {
    this.loadFile()
  },
  computed: {
    compiledHtml: function() {
      return this.content
    }
  },
  methods: {
    loadFile() {
        this.post = posts.find(p => p.id = this.$route.params.id)
      axios({
        method: "get",
        url: "/static/" + this.post.content
      }).then(result => {
        this.content = result.data
      }).catch(error => {
        console.error("Error getting post content")
        console.error(error)
      })
    }
  }
}
</script>
<style>
.blog-post-wrapper {
  display: flex;
  justify-content: center;
  text-align: left;
}
</style>
