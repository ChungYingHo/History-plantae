<!--
  @FilePath: \pages\info.vue
  @Date: 2024-04-05 10:50:15
  @Author: Chung-Ying
  @Description: 訂單查詢
  -----
  Last Modified: 2024-04-21 12:47:16
  Modified By: Chung-Ying
  -----
  Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
-->

<script setup lang="ts">
const orderNumber = ref('')
const loading = ref(false)
const searchList = ref()
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  // eslint-disable-next-line prettier/prettier
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  }
})

const onClick = async () => {
  if (!orderNumber.value) {
    Toast.fire({
      icon: 'error',
      title: '請輸入訂單編號'
    })
    return
  }

  searchList.value = null
  loading.value = true
  console.log(orderNumber.value)
  try {
    const data = await $fetch('/api/search', {
      method: 'POST',
      body: { orderNumber: orderNumber.value.trim() }
    })
    console.log(data)
    // @ts-ignore
    if (data.success === false) {
      Swal.fire({
        icon: 'error',
        title: '未能查詢到訂單狀態',
        text: '請確認您的訂單編號是否正確',
        footer:
          '<a href="https://www.facebook.com/plantae.tw" target=_blank>聯繫植宇宙</a>'
      })
      return
    }
    searchList.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="info-container">
    <div
      class="info-sub-container mx-auto mt-20 flex w-10/12 items-start justify-between py-5"
    >
      <v-row class="info-sub-container-row flex justify-between">
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" class="flex items-center gap-2">
              <v-icon
                color="pink-darken-2"
                icon="mdi-information-outline"
              ></v-icon>
              <p class="text-2xl font-medium text-slate-600">訂單查詢說明</p>
            </v-col>
            <v-col cols="12">
              <p class="text-lg text-lime-600">狀態查詢</p>
              <p class="mb-2 text-base">
                1. 請在右方搜尋欄輸入您的訂單編號，即可查詢您的訂單狀態。
              </p>
              <p class="mb-2 text-base">
                2.
                訂單狀態有：備貨中與已出貨，可以在備貨中狀態看到預計寄出的時間。
              </p>
              <p class="mb-2 text-base">
                3.
                若搜尋功能異常，如無法查詢到您的訂單狀態，請聯繫我們，我們會盡快為您處理。
              </p>
              <p class="mt-5 text-lg text-lime-600">貨運查詢</p>
              <p class="mb-2 text-base">
                1.
                若訂單狀態為已出貨，會提供您XX物流的貨運單號，請至XX物流官網查詢貨運狀態。
              </p>
              <p class="mb-2 text-base">
                2. 物流人員會在送貨前與您聯繫，請保持手機暢通，以確保順利收貨。
              </p>
            </v-col>
          </v-row>
        </v-col>
        <!-- 搜尋欄 -->
        <v-col cols="12" md="4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="orderNumber"
                :loading="loading"
                append-inner-icon="mdi-magnify"
                density="compact"
                label="請輸入訂單編號查詢"
                variant="solo"
                hide-details
                single-line
                @click:append-inner="onClick"
              ></v-text-field>
            </v-col>
            <v-col v-if="searchList" cols="12">
              <v-card class="mt-5" outlined color="pink-lighten-5">
                <v-card-title class="text-pink-darken-2 text-lg">
                  訂單狀態
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <p class="mb-2 text-lg text-pink-600">
                        收件人姓名：<span class="text-base text-slate-600">{{
                          searchList.order.name
                        }}</span>
                      </p>
                      <p class="mb-2 text-lg text-pink-600">
                        收件人電話：<span class="text-base text-slate-600">{{
                          searchList.order.phone
                        }}</span>
                      </p>
                      <p class="mb-2 text-lg text-pink-600">
                        收件人地址：<span class="text-base text-slate-600">{{
                          searchList.order.address
                        }}</span>
                      </p>
                      <p class="mb-2 text-lg text-pink-600">
                        訂單狀態：<span class="text-base text-slate-600">{{
                          searchList.order.status
                        }}</span>
                      </p>
                      <p class="mb-2 text-lg text-pink-600">
                        寄出時間：<span class="text-base text-slate-600">{{
                          searchList.order.delivery_time
                        }}</span>
                      </p>
                      <p class="mb-2 text-lg text-pink-600">
                        貨運單號：<span class="text-base text-slate-600">{{
                          searchList.order.tracking_number
                        }}</span>
                      </p>
                      <p class="mb-2 text-lg text-pink-600">訂購商品：</p>
                      <ul>
                        <li
                          v-for="item in searchList.products"
                          :key="item.name + item.unit"
                        >
                          <span class="text-base text-slate-600">{{
                            item.name
                          }}</span>
                          x
                          <span class="text-base text-slate-600">{{
                            item.quantity
                          }}</span>
                          <span class="text-base text-slate-600">{{
                            item.unit
                          }}</span>
                        </li>
                      </ul>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col v-else cols="12">
              <p class="text-lg font-medium text-pink-600">尚未有查詢資料</p>
            </v-col>
          </v-row>
        </v-col></v-row
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-container {
  background-color: #f0f8ff;
  min-height: 100vh;
}

// RWD 600
@media screen and (max-width: 600px) {
  .info-sub-container-row {
    flex-direction: column-reverse;
  }
}
</style>
