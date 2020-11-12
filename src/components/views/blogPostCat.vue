<template>
  <div class="blog-post-list">
    <template v-for="post in posts" v-bind:key="post.id">
      <li>
        <b class="key">{{ post.publish_date }}</b>
        <span class="value">
          <router-link :to="'/posts/' + post.id">{{ post.title }}</router-link>
        </span>
      </li>
    </template>
  </div>
</template>
<script>
import bPosts from "@/assets/posts.json";

export default {
  data() {
    return {
      cat: this.$route.params.cat,
      posts: [],
    };
  },
  beforeRouteUpdate(to) {
    this.cat = to.params.cat;
    this.setCats();
  },
  mounted() {
    this.setCats();
  },
  methods: {
    setCats() {
      this.posts = [];
      bPosts.forEach((p) => {
        if (p.categories.includes(this.cat)) {
          this.posts.push(p);
        }
      });
    },
  },
};
</script>
<style>
.blog-post-list {
  list-style: none;
}

.blog-post-list .key::after {
  content: ":";
}

.blog-post-list .value {
  margin-left: 10px;
}
</style>
