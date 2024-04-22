<script setup lang="ts">
const numShadows = 700

const generateParticle = (numShadows: number): string => {
  let boxShadowValue = ''

  for (let i = 0; i < numShadows; i++) {
    boxShadowValue += `${Math.random() * 2000}px ${Math.random() * 2000}px #4f6036, `
  }

  // 移除最後一個逗號和空格
  boxShadowValue = boxShadowValue.slice(0, -2)

  return boxShadowValue
}

onMounted(() => {
  const boxShadow = generateParticle(numShadows)
  const div = document.querySelector('.particle') as HTMLElement
  div.style.boxShadow = boxShadow
})
</script>

<template>
  <div class="main-container relative h-screen w-screen">
    <!-- 浮動粒子 -->
    <div class="particle rounded-full bg-transparent"></div>
    <!-- logo 跟主要按鈕 -->
    <div
      class="center-box absolute left-1/2 top-32 flex w-fit -translate-x-1/2 flex-col items-center justify-between gap-20"
    >
      <div class="emboss flex size-44 items-center justify-center rounded-full">
        <img
          src="@/assets/images/logo.png"
          alt="Plantae Taiwan"
          class="m-3 size-11/12"
        />
      </div>
      <div class="flex items-center justify-center gap-9">
        <NuxtLink to="/about">
          <button class="btn size-20 rounded-xl" data-content="關於植宇宙">
            <img src="@/assets/icons/book.png" alt="story" class="icon" />
          </button>
        </NuxtLink>
        <NuxtLink to="/shop">
          <button class="btn size-20 rounded-xl" data-content="植宇宙雜貨店">
            <img
              src="@/assets/icons/shopping-cart.png"
              alt="shop"
              class="icon"
            />
          </button>
        </NuxtLink>
        <NuxtLink to="/order">
          <button class="btn size-20 rounded-xl" data-content="訂單查詢">
            <img src="@/assets/icons/order.png" alt="facebook" class="icon" />
          </button>
        </NuxtLink>
        <NuxtLink to="/article">
          <button class="btn size-20 rounded-xl" data-content="植宇宙手札">
            <img src="@/assets/icons/news.png" alt="facebook" class="icon" />
          </button>
        </NuxtLink>
      </div>
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
      to right bottom,
      rgb(226 232 240 / 100%) 40%,
      rgb(226 232 240 / 0%)
    ),
    url('@/assets/images/main-bg.jpg');
  background-size: cover;

  /* opacity: 0.95; */
  filter: blur(3px);
  z-index: -1;
}

.emboss {
  box-shadow:
    -6px -6px 16px rgb(255 255 255),
    3px 3px 6px rgb(0 0 0 / 30%);
}

.btn {
  @apply emboss relative flex items-center justify-center;

  background-color: rgb(255 255 255 / 25%);

  &:hover {
    box-shadow:
      -3px -3px 6px rgb(255 255 255),
      1px 1px 6px rgb(0 0 0 / 30%);
  }

  &::after {
    content: attr(data-content);
    position: absolute;
    top: 120%;
    left: 50%;
    padding: 5px 10px;
    width: calc(100% + 3rem);
    transform: translateX(-50%);
    color: #fff;
    background-color: rgb(0 0 0 / 50%);
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    writing-mode: horizontal-tb;
  }

  &:hover::after {
    opacity: 1;
  }
}

.icon {
  @apply size-1/2;
}

.particle {
  width: 1.2px;
  height: 1.2px;
  animation: anim-star 100s linear infinite;
}

@keyframes anim-star {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-2000px);
  }
}
</style>
