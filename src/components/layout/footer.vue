<template>
  <footer>
    <div class="content">
      Released under the
      <a
        href="https://www.gnu.org/licenses/gpl-3.0.en.html"
        target="_blank"
        rel="noopener"
        >GPL License</a
      >
      <br />
      Copyright &copy; 2020-{{ currentyear }} Luuks Blog
    </div>
  </footer>
</template>

<script>
export default {
  data: function () {
    return {
      currentyear: new Date().getFullYear(),
    };
  },
};
</script>

<style>
footer {
  position: relative;
  background-color: var(--dark-color);
  padding: 40px 0;
  text-align: center;
}
footer::before {
  content: "";
  background-image: url("/assets/strip-dark.svg");
  background-repeat: no-repeat;
  background-position: 50%;
  position: absolute;
  height: 22px;
  top: -21px;
  left: 0;
  right: 0;
}
</style>
