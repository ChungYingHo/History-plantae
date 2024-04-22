<script setup lang="ts">
// display route path
const route = useRoute()
const currentPath = ref<string | null>(null)

onMounted(() => {
  if (route.path === '/') currentPath.value = '主頁'
  else if (route.path === '/about') currentPath.value = '關於植宇宙'
  else if (route.path === '/shop') currentPath.value = '植宇宙雜貨店'
  else if (route.path === '/article') currentPath.value = '植宇宙手札'
})

// todo select path
const isSelected = ref(false)

const handleSelect = () => {
  isSelected.value = !isSelected.value
}

// watch route path
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') currentPath.value = '主頁'
    else if (newPath === '/about') currentPath.value = '關於植宇宙'
    else if (newPath === '/shop') currentPath.value = '植宇宙雜貨店'
    else if (newPath === '/order') currentPath.value = '訂單查詢'
    else if (newPath === '/article') currentPath.value = '植宇宙手札'
    isSelected.value = false
  }
)
</script>

<template>
  <div class="relative h-screen w-screen">
    <!-- 左邊版權 -->
    <div class="absolute left-7 top-5 z-10 flex items-center gap-3">
      <div class="copyright rounded-3xl px-4 py-1">
        <p class="emboss-text text-center text-lg">
          Copyright © 2024 Plantae Taiwan
        </p>
      </div>
      <p class="emboss-text text-center text-base">獻給您，來自大自然的贈禮</p>
    </div>
    <!-- 右方按鈕 -->
    <div
      class="absolute right-7 top-5 z-10 flex items-center justify-center gap-5"
    >
      <!-- 頁面選擇 -->
      <div class="relative items-center justify-start gap-3">
        <button
          class="current-path relative w-44 rounded-3xl px-4 py-1"
          data-content="當前頁面"
          @click="handleSelect"
        >
          <p class="emboss-text text-center text-lg">
            {{ currentPath }}
          </p>
        </button>
        <!-- 選擇彈出視窗 -->
        <div v-if="isSelected" class="select-path flex flex-col gap-1">
          <NuxtLink to="/" class="hover:text-lime-300">主頁</NuxtLink>
          <NuxtLink to="/about" class="hover:text-lime-300"
            >關於植宇宙</NuxtLink
          >
          <NuxtLink to="/shop" class="hover:text-lime-300"
            >植宇宙雜貨店</NuxtLink
          >
          <NuxtLink to="/order" class="hover:text-lime-300">訂單查詢</NuxtLink>
          <NuxtLink to="/article" class="hover:text-lime-300"
            >植宇宙手札</NuxtLink
          >
        </div>
      </div>
      <!-- 按鈕 -->
      <NuxtLink to="https://www.instagram.com/plantae_taiwan/" target="_blank">
        <button class="btn size-12 rounded-full" data-content="Instagram">
          <img src="@/assets/icons/ig.png" alt="instagram" class="icon" />
        </button>
      </NuxtLink>
      <NuxtLink to="https://www.facebook.com/plantae.tw" target="_blank">
        <button class="btn size-12 rounded-full" data-content="Facebook">
          <img src="@/assets/icons/facebook.png" alt="instagram" class="icon" />
        </button>
      </NuxtLink>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
/* 常用樣式 */
@mixin tooltip {
  content: attr(data-content);
  position: absolute;
  top: 120%;
  left: 50%;
  padding: 5px 10px;
  text-align: center;
  transform: translateX(-50%);
  color: #fff;
  background-color: rgb(0 0 0 / 50%);
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.copyright {
  box-shadow:
    inset 3px 3px 8px rgba(#3c4045, 0.3),
    inset -5px -5px 8px #fff;
}

.emboss-text {
  color: #a5adb6; /* 字体颜色 */
  text-shadow:
    0 1px 0 #cbd5e0,
    0 -1px 0 #fff;
}

/* 浮雕效果 */
.emboss {
  box-shadow:
    -6px -6px 16px rgb(255 255 255),
    3px 3px 6px rgb(0 0 0 / 30%);
}

.btn {
  @apply emboss relative flex items-center justify-center;

  &:hover {
    box-shadow:
      -3px -3px 6px rgb(255 255 255),
      1px 1px 6px rgb(0 0 0 / 30%);
  }

  &::after {
    @include tooltip;

    width: calc(100% + 3rem);
  }

  &:hover::after {
    opacity: 1;
  }
}

.icon {
  @apply size-1/2;
}

.current-path {
  @apply copyright;

  letter-spacing: 0.25rem;
}

.select-path {
  position: absolute;
  top: 120%;
  left: 50%;
  padding: 5px 10px;
  width: 100%;
  text-align: center;
  transform: translateX(-50%);
  color: #fff;
  background-color: rgb(0 0 0 / 50%);
  border-radius: 5px;
  transition: opacity 0.3s;
}
</style>
