<template>
  <div class="blog-post-wrapper">
    <article class="content">
      <h1>{{ post.title }}</h1>
      <span>{{ post.publish_date }}</span>
      <markdown :url="this.contentUrl" />
    </article>
  </div>
</template>
<script>
import posts from "@/assets/posts.json";
import markdown from "@/components/views/markdown";

export default {
  components: {
    markdown,
  },
  data() {
    return {
      post: "",
      contentUrl: "",
    };
  },
  created() {
    this.post = posts.find((p) => p.id == this.$route.params.id);
    this.contentUrl = "/static/" + this.post.content;
  },
};
</script>
<style>
.blog-post-wrapper {
  display: flex;
  justify-content: center;
  text-align: left;
}
</style>
