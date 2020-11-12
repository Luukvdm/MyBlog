<template>
  <div class="blog-post-wrapper">
    <article class="content">
      <h1>{{ post.title }}</h1>
      <span>{{ post.publish_date }}</span>
      <div v-html="rawHtml"></div>
    </article>
  </div>
</template>
<script>
import posts from "@/assets/posts.json";
import axios from "axios";

export default {
  data() {
    return {
      post: "",
      rawHtml: ""
    };
  },
  created() {
    this.loadFile();
  },
  computed: {
    compiledHtml: function() {
      return this.content;
    }
  },
  methods: {
    loadFile() {
      console.log(posts);
      this.post = posts.find(p => p.id == this.$route.params.id);
      console.log(this.post);
      axios({
        method: "get",
        url: "/static/" + this.post.content
      })
        .then(result => {
          this.rawHtml = result.data;
        })
        .catch(error => {
          console.error("Error getting post content");
          console.error(error);
        });
    }
  }
};
</script>
<style>
.blog-post-wrapper {
  display: flex;
  justify-content: center;
  text-align: left;
}
</style>
