<template>
  <header>
    <div class="content">
      <div class="logo">
        <router-link class="site-title" to="/">
          Luuks Blog
        </router-link>
      </div>
      <nav>
        <div class="nav-content">
          <router-link id="nav-home" to="/">Home</router-link>
          <router-link id="nav-about" to="/about">About</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
  },
  methods: {
  }
};
</script>

<style>
header {
  background-color: var(--main-color);
}
header .content {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.logo .site-title {
  font-family: "Fugaz One", cursive;
  color: inherit;
  text-decoration: none;
  font-size: 28pt;
}
nav .nav-content {
  display: flex;
  flex-flow: row;
  align-items: center;
}
nav .nav-content a {
  padding: 8px 15px;
  border-radius: 5px;
  opacity: 0.75;
  font-size: 20pt;
  text-decoration: none;
  transition: all 0.1s linear;
  font-weight: bold;
}
nav .nav-content a:hover {
  opacity: 1;
}
nav .nav-content a.router-link-exact-active {
  opacity: 1;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--main-color);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}
.dropdown-content .dropdown-link {
  font-size: 0.8vw;
}
.dropdown-content a {
  display: block;
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
