<template>
  <div class="home section-wrapper">
    <div class="curve-container">
      <svg class="curve-content" viewBox="0 0 500 150" preserveAspectRatio="none">
        <path class="curve-path-main" d="M0.00,49.98 C150.00,150.00 271.49,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z">
        </path>
      </svg>
    </div>
    <div id="page-top-section" class="top-section">
      <h1>Home</h1>
      <ul>
      <template v-for="post in posts">
        <li v-bind:key="post.id">
          <router-link v-bind:to="'posts/' + post.id">{{ post.title }}</router-link>
        </li>
      </template>
      </ul>
    </div>
    <div class="main-section">

    </div>
    <div id="page-bottom-section" class="bottom-section">
    </div>
    <div class="curve-container">
      <svg class="curve-content" viewBox="0 0 500 150" preserveAspectRatio="none">
        <path class="curve-path-secondary" d="M-58.14,84.37 C150.00,150.00 372.45,72.52 500.56,113.97 L500.00,150.00 L0.00,150.00 Z">
        </path>
      </svg>
    </div>
  </div>
</template>
<script>
import bPosts from "@/assets/posts.json"

export default {
  name: 'Home',
  data() {
    return {
      posts: bPosts
    };
  },
};
</script>
<style>

.home {
}

/*
#page-top-section, #page-bottom-section {
    background-color: var(--main-color);
    position: relative;
    text-align: center;
    color: var(--secondary-color);
    
    padding: 50px 0 80px 0;
    height: 250px;
    width: 100%;
}
*/

.curve-content {
  height: 100%; 
  width: 100%;
}

.curve-path-main {
  fill: var(--main-color);
  stroke: none;
}

.curve-path-secondary {
  fill: var(--dark-color);
  stroke: none;
}

</style>
