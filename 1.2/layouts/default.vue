<!--
  @FilePath: \layouts\default.vue
  @Date: 2024-03-15 20:35:33
  @Author: Chung-Ying
  @Description: 預設版面
  -----
  Last Modified: 2024-04-21 16:19:59
  Modified By: Chung-Ying
  -----
  Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
-->

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const getIconColor = (path: string) => {
  return path === route.path ? 'lime-darken-2' : 'grey-darken-1'
}

const isMenuOpen = ref(false)

const resetMenuOpen = () => {
  isMenuOpen.value = false
}

const isRwd960 = ref(false)

const handleToggle = () => {
  isRwd960.value = !isRwd960.value
}

const resetRwd960 = (link: string) => {
  isRwd960.value = true
  if (link.includes('http')) {
    window.open(link, '_blank')
  } else {
    router.push(link)
  }
}

const handleSocial = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="default-container relative h-screen w-screen">
    <header
      class="absolute left-0 top-5 z-10 flex h-12 w-full items-center justify-between px-20"
    >
      <NuxtLink to="/">
        <div class="logo-container flex h-full items-center gap-5">
          <img src="@/assets/logo.png" alt="plantae-taiwan" class="h-12" />
          <p class="title text-xl text-slate-600">PLANTAE Taiwan</p>
        </div>
      </NuxtLink>
      <!-- RWD 960 up -->
      <div class="link flex items-center justify-end gap-3">
        <NuxtLink to="/">
          <Transition>
            <button
              v-show="isMenuOpen"
              class="btn btn-menu size-12 rounded-full"
              data-content="主頁"
              @click="resetMenuOpen"
            >
              <v-icon icon="mdi-home" :color="getIconColor('/')" />
            </button>
          </Transition>
        </NuxtLink>

        <NuxtLink to="/shop">
          <Transition
            ><button
              v-show="isMenuOpen"
              class="btn btn-menu size-12 rounded-full"
              data-content="植宇宙雜貨店"
              @click="resetMenuOpen"
            >
              <v-icon icon="mdi-gift" :color="getIconColor('/shop')" /></button
          ></Transition>
        </NuxtLink>

        <NuxtLink to="/cart">
          <Transition
            ><button
              v-show="isMenuOpen"
              class="btn btn-menu size-12 rounded-full"
              data-content="購物車"
              @click="resetMenuOpen"
            >
              <v-icon icon="mdi-cart-variant" :color="getIconColor('/cart')" />
            </button>
          </Transition>
        </NuxtLink>

        <NuxtLink to="/info">
          <Transition
            ><button
              v-show="isMenuOpen"
              class="btn btn-menu size-12 rounded-full"
              data-content="訂單查詢"
              @click="resetMenuOpen"
            >
              <v-icon
                icon="mdi-information"
                :color="getIconColor('/info')"
              /></button
          ></Transition>
        </NuxtLink>

        <NuxtLink to="/article">
          <Transition
            ><button
              v-show="isMenuOpen"
              class="btn btn-menu size-12 rounded-full"
              data-content="植宇宙手札"
              @click="resetMenuOpen"
            >
              <v-icon
                icon="mdi-book-open-page-variant"
                :color="getIconColor('/article')"
              />
            </button>
          </Transition>
        </NuxtLink>

        <button
          class="btn btn-menu size-12 rounded-full"
          @click="() => (isMenuOpen = !isMenuOpen)"
        >
          <v-icon icon="mdi-apps" color="blue-grey-darken-2"></v-icon>
        </button>

        <button
          class="btn btn-social size-12 rounded-full"
          data-content="Instagram"
          @click="
            () => handleSocial('https://www.instagram.com/plantae_taiwan/')
          "
        >
          <img src="@/assets/icons/ig.png" alt="instagram" class="icon" />
        </button>
        <button
          class="btn btn-social size-12 rounded-full"
          data-content="Facebook"
          @click="() => handleSocial('https://www.facebook.com/plantae.tw')"
        >
          <img src="@/assets/icons/facebook.png" alt="instagram" class="icon" />
        </button>
      </div>
      <!-- toggle button -->
      <button
        class="btn btn-toggle relative size-12 rounded-full"
        @click="handleToggle"
      >
        <v-icon
          icon="mdi-apps"
          :color="isRwd960 ? 'lime-darken-2' : 'blue-grey-darken-2'"
        ></v-icon>
        <div
          v-show="isRwd960"
          class="rwd-menu absolute right-0 flex flex-col items-end gap-1 rounded-lg"
        >
          <p @click="resetRwd960('/')">主頁</p>

          <p @click="resetRwd960('/shop')">植宇宙雜貨店</p>

          <p @click="resetRwd960('/cart')">購物車</p>

          <p @click="resetRwd960('/info')">訂單查詢</p>

          <p @click="resetRwd960('/article')">植宇宙手札</p>

          <p @click="resetRwd960('https://www.facebook.com/plantae.tw')">
            Facebook
          </p>

          <p @click="resetRwd960('https://www.instagram.com/plantae_taiwan/')">
            Instagram
          </p>
        </div>
      </button>
    </header>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.default-container {
  background-color: #f0f8ff;
}

.title {
  font-family: 'Caveat', sans-serif;
}

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
    /* @include tooltip; */

    width: calc(100% + 3rem);
  }

  &:hover::after {
    opacity: 1;
  }
}

.icon {
  @apply size-1/2;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

// RWD 960
@media screen and (max-width: 960px) {
  .link {
    display: none;
  }

  .rwd-menu {
    width: 25vw;
    bottom: -500%;
    background-color: rgb(0 0 0 / 50%);
    padding: 1rem;
    color: #f0f8ff;

    p {
      &:hover {
        color: #afb42b;
      }
    }
  }
}

@media screen and (min-width: 960px) {
  .btn-toggle,
  .rwd-menu {
    display: none;
  }
}

// RWD 600
@media screen and (max-width: 600px) {
  header {
    padding: 0 1.5rem;
  }

  .btn {
    width: 2rem;
    height: 2rem;
  }

  .logo-container {
    p {
      font-size: 1rem;
    }
  }

  .rwd-menu {
    width: 50vw;
    bottom: -720%;
  }
}
</style>
