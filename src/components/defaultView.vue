<template>
  <div class="section-wrapper">
    <div id="top-section" class="top-section">
      <Navbar></Navbar>
    </div>
    <div id="page-section" class="main-section">
      <router-view></router-view>
    </div>
    <div id="bottom-section" class="bottom-section">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
export default {
  name: "DefaultView",
  components: { Footer, Navbar },
  methods: {},
  data() {
    return {
      layout: "div"
    };
  }
};
</script>

<style>
#page-section {
  background-color: var(--secondary-color);
}
</style>
