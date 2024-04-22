<template>
  <div class="main-container relative h-screen w-screen"></div>
</template>

<style scoped lang="scss">
.main-container::after {
  position: absolute;
  content: '';
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      to bottom,
      rgb(226 232 240 / 100%) 10%,
      rgb(226 232 240 / 0%)
    ),
    url('@/assets/images/article-bg.jpg');
  background-size: cover;

  /* opacity: 0.95; */
  filter: blur(5px);
  z-index: -1;
}
</style>
