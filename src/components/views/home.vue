<template>
  <div class="home section-wrapper">
    <div class="content-container main-section">
      <div id="home-container" class="content">
        <h1>Home</h1>
        <p>
          Welcome to my blog. This is where I post about the things that I
          learned or want to share with the world. Most of the posts will be
          related to school assignments or security related.
        </p>
      </div>

      <div id="recent-container">
        <div class="curve-container">
          <svg
            class="curve-content"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
          >
            <path
              class="curve-path-main"
              d="M0.00,49.98 C190.18,106.37 444.69,22.48 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            ></path>
          </svg>
        </div>
        <div class="recent-content-wrapper">
          <div class="content">
            <h1>Recent Posts</h1>
            <ul class="recent-list">
              <template v-for="post in posts" v-bind:key="post.id">
                <li>
                  <b class="key">{{ post.publish_date }}</b>
                  <span class="value">
                    <router-link :to="'/posts/' + post.id">{{
                      post.title
                    }}</router-link>
                  </span>
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div class="curve-container">
          <svg
            class="curve-content"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
          >
            <path
              class="curve-path-main"
              d="M0.00,49.98 C219.52,8.68 175.50,83.68 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
            ></path>
          </svg>
        </div>
      </div>

      <div id="other-container" class="content">
        <h1>Open Source</h1>
        <p>
          This blog like most of the code I write is published under a open
          source licence. You can find the source code on
          <a href="https://github.com/Luukvdm/MyBlog">my Github</a>.
          <br />
          Feel free to use my code for your own blog.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import bPosts from "@/assets/posts.json";

export default {
  data() {
    return {
      posts: bPosts,
    };
  },
  methods: {
    setPosts() {
      let sPosts = bPosts.sort(
        (a, b) => Date.parse(b.publish_date) - Date.parse(a.publish_date)
      );
      this.posts = sPosts.slice(0, 5);
    },
  },
};
</script>
<style>
#recent-container .curve-container {
  height: 75px;
}

#recent-container .recent-content-wrapper {
  background-color: var(--main-color);
}

.recent-list {
  list-style: none;
}

.recent-list .key::after {
  content: ":";
}

.recent-list .value {
  margin-left: 10px;
}
</style>
