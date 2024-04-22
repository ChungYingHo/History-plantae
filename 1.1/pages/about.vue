<template>
  <div class="main-container relative h-screen w-screen">
    <div
      class="about-container absolute left-1/2 top-1/2 h-4/6 w-8/12 -translate-x-1/2 -translate-y-1/2"
    >
      <p>About</p>
    </div>
  </div>
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
    url('@/assets/images/about-bg.jpg');
  background-size: cover;

  /* opacity: 0.95; */
  filter: blur(5px);
  z-index: -1;
}

.about-container {
  border-radius: 10px;
  box-shadow:
    inset 3px 3px 8px rgba(#3c4045, 0.3),
    inset -5px -5px 8px #fff;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(226 232 240 / 50%);
    filter: blur(10px);
    border-radius: 10px;
  }
}
</style>
