<!--
  @FilePath: \components\StepProgress.vue
  @Date: 2024-03-16 20:57:11
  @Author: Chung-Ying
  @Description: 步驟進度條
  -----
  Last Modified: 2024-04-15 23:47:27
  Modified By: Chung-Ying
  -----
  Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
-->

<script setup lang="ts">
const props = defineProps({
  step: {
    type: Number,
    required: true
  }
})

const changeProgressColor = (step: number) => {
  return props.step >= step ? 'blue-grey-darken-3' : 'blue-grey-lighten-3'
}

const changeProgressIcon = (step: number) => {
  return props.step > step ? 'mdi-check-circle' : `mdi-numeric-${step}-circle`
}
</script>

<template>
  <!-- 進度條 -->
  <div class="flex items-center justify-center gap-5 py-3">
    <v-icon
      :icon="changeProgressIcon(1)"
      size="x-large"
      :color="changeProgressColor(1)"
    />
    <v-icon icon="mdi-pan-right" size="large" :color="changeProgressColor(1)" />
    <v-icon
      :icon="changeProgressIcon(2)"
      size="x-large"
      :color="changeProgressColor(2)"
    />
    <v-icon icon="mdi-pan-right" size="large" :color="changeProgressColor(2)" />
    <v-icon
      :icon="changeProgressIcon(3)"
      size="x-large"
      :color="changeProgressColor(3)"
    />
    <v-icon icon="mdi-pan-right" size="large" :color="changeProgressColor(3)" />
    <v-icon
      :icon="changeProgressIcon(4)"
      size="x-large"
      :color="changeProgressColor(4)"
    />
    <v-icon icon="mdi-pan-right" size="large" :color="changeProgressColor(4)" />
    <v-icon
      :icon="changeProgressIcon(5)"
      size="x-large"
      :color="changeProgressColor(5)"
    />
  </div>
</template>

<style scoped lang="scss">
.form-progress {
  height: 15vh;
}

.form-content {
  height: 65vh;
}

.form-btn-group {
  height: 10vh;
}
</style>
