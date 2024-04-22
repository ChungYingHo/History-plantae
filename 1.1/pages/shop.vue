<template>
  <div
    class="main-container relative flex h-screen w-screen items-center justify-center"
  >
    <div
      class="shop-container absolute bottom-5 left-1/2 h-5/6 w-8/12 -translate-x-1/2"
    ></div>
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
    url('@/assets/images/shop-bg.jpg');
  background-size: cover;

  /* opacity: 0.95; */
  filter: blur(5px);
  z-index: -1;
}

.shop-container {
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
