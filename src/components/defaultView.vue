<template>
  <div class="section-wrapper">
    <div id="top-section" class="top-section">
      <Navbar></Navbar>
      <div class="curve-container top-section">
        <svg
          class="curve-content"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <path
            class="curve-path-main"
            d="M0.00,49.98 C150.00,150.00 271.49,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
          ></path>
        </svg>
      </div>
    </div>

    <div id="page-section" class="main-section">
      <router-view></router-view>
    </div>

    <div id="bottom-section" class="bottom-section">
      <div class="curve-container bottom-section">
        <svg
          class="curve-content"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <path
            class="curve-path-secondary"
            d="M-58.14,84.37 C150.00,150.00 372.45,72.52 500.56,113.97 L500.00,150.00 L0.00,150.00 Z"
          ></path>
        </svg>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
export default {
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
