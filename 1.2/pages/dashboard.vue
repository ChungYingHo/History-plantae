<!--
  @FilePath: \pages\dashboard.vue
  @Date: 2024-04-20 22:17:23
  @Author: Chung-Ying
  @Description:
  -----
  Last Modified: 2024-04-21 13:08:00
  Modified By: Chung-Ying
  -----
  Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
-->

<script setup lang="ts">
definePageMeta({
  layout: 'manage'
})

const { data: orderList } = useFetch('/api/order') as any
console.log((orderList.value as { data: any })?.data)

function formatDate(isoDateString: string) {
  const date = new Date(isoDateString)
  const formattedDate = date.toISOString().split('T')[0] // 2024-04-19
  return formattedDate
}

const isDeleteDialog = ref(false)
const isEditDialog = ref(false)
const currentIndex = ref(0)
const currentId = ref()

// delete dialog
const handleStartDelete = (id: number) => {
  isDeleteDialog.value = true
  currentId.value = id
  console.log('currentId', currentId.value)
}

const handleCancelDelete = () => {
  isDeleteDialog.value = false
  currentId.value = null
}

const handleConfirmDelete = async () => {
  try {
    const data = await $fetch(`/api/order`, {
      method: 'DELETE',
      body: {
        orderId: currentId.value
      }
    })
    console.log(data)
    if ((data as { success: boolean }).success) {
      isDeleteDialog.value = false
      currentId.value = null
      orderList.value.data.splice(currentIndex.value, 1)
    }
  } catch (error) {
    console.error(error)
  }
}

// edit dialog
const handleStartEdit = (index: number, id: number) => {
  currentIndex.value = index
  currentId.value = id
  isEditDialog.value = true
  console.log('currentIndex', currentIndex.value)
  console.log('currentId', currentId.value)
}

const handleCancelEdit = () => {
  currentIndex.value = 0
  currentId.value = null
  isEditDialog.value = false
}

const handleConfirmEdit = async () => {
  // todo update order status
  try {
    console.log('currentId', currentId.value)
    console.log('currentIndex', currentIndex.value)
    console.log('orderList', orderList.value.data[currentIndex.value])
    const data = await $fetch(`/api/order`, {
      method: 'PUT',
      body: {
        orderId: currentId.value,
        status: orderList.value.data[currentIndex.value].status,
        delivery_time: orderList.value.data[currentIndex.value].delivery_time,
        tracking_number:
          orderList.value.data[currentIndex.value].tracking_number
      }
    })
    console.log(data)
    if ((data as { success: boolean }).success) {
      isEditDialog.value = false
      currentIndex.value = 0
      currentId.value = null
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="w-full">
    <div class="dashboard-header flex h-14 w-full items-center">
      <img src="@/assets/logo.png" alt="logo" class="ml-12 h-10 w-10" />
      <NuxtLink to="/">
        <h1 class="ml-4 text-2xl">PLANTAE Taiwan Dashboard</h1></NuxtLink
      >

      <p class="ml-10">訂單數量：{{ orderList.data.length }}</p>
    </div>
    <!-- todo order list -->
    <div v-if="orderList" class="mx-auto mt-7 w-10/12">
      <v-card
        v-for="(item, index) in orderList.data"
        :key="item.id"
        :color="index % 2 === 0 ? 'cyan-lighten-5' : 'lime-lighten-5'"
        hover
        class="mb-4"
        :title="item.user_name"
        :subtitle="`${item.order_number} (${formatDate(item.created_at)})`"
      >
        <!-- todo 之後可以依狀態改變 icon -->
        <!-- <template #append>
          <v-icon color="success" icon="mdi-check"></v-icon>
        </template> -->
        <v-row class="p-2">
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>商品名稱</v-card-title>
              <v-card-text>
                <v-row
                  v-for="(product, pIndex) in item.product_names"
                  :key="pIndex"
                >
                  <v-col cols="5" md="4">
                    ({{ pIndex + 1 }}) {{ product }}
                  </v-col>
                  <v-col cols="3" md="4">
                    {{ item.product_quantities[pIndex] }}
                  </v-col>
                  <v-col cols="4" md="4">
                    <p>{{ item.product_units[pIndex] }}</p>
                  </v-col>
                </v-row>
                <v-alert class="mt-5">訂單總額：{{ item.total_price }}</v-alert>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>訂單資訊</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <p>匯款帳號：{{ item.card_number }}</p>
                  </v-col>
                  <v-col cols="12">
                    <p>電話：{{ item.phone }}</p>
                  </v-col>
                  <v-col cols="12">
                    <p>地址：{{ item.address }}</p>
                  </v-col>
                  <v-col cols="12">
                    <p>備註：{{ item.note || '沒有備註' }}</p>
                  </v-col>
                  <v-col cols="12">
                    <p>狀態：{{ item.status }}</p>
                  </v-col>
                  <v-col cols="12">
                    <p>寄送日期：{{ item.delivery_time }}</p>
                  </v-col>
                  <v-col cols="12">
                    <p>貨運單號：{{ item.tracking_number || '尚未寄送' }}</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <!-- todo delete and edit -->
        <template #actions>
          <v-btn
            append-icon="mdi-delete-alert"
            color="red-lighten-2"
            text="刪除訂單"
            variant="outlined"
            @click="handleStartDelete(item.id)"
          ></v-btn>

          <v-btn
            append-icon="mdi-file-edit"
            color="green-lighten-2"
            text="編輯狀態"
            variant="outlined"
            @click="handleStartEdit(index, item.id)"
          ></v-btn>
        </template>
      </v-card>
      <!-- todo delete dialog -->
      <v-dialog v-model="isDeleteDialog" width="auto">
        <v-card
          max-width="400"
          prepend-icon="mdi-alert-box"
          text="一旦刪除就無法返回，還確定刪除嗎？"
          title="確認要刪除嗎"
        >
          <template #prepend>
            <v-icon color="red" icon="mdi-delete-alert"></v-icon>
          </template>
          <template #actions>
            <v-btn
              text="狠心刪除"
              color="red-lighten-2"
              @click="handleConfirmDelete"
            ></v-btn>
            <v-btn
              class="ms-auto"
              text="取消"
              color="green-lighten-2"
              @click="handleCancelDelete"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
      <!-- todo edit dialog -->
      <v-dialog v-model="isEditDialog" width="auto">
        <v-card
          class="edit-card"
          prepend-icon="mdi-file-edit"
          text="請先跟出貨人員確認訂單狀態後再修改。"
          title="編輯訂單狀態"
        >
          <template #prepend>
            <v-icon color="green" icon="mdi-file-edit"></v-icon>
          </template>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="orderList.data[currentIndex].status"
                  label="訂單狀態 (ex: 訂單處理中、備貨中 (預計出貨日期)、已出貨)"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="orderList.data[currentIndex].delivery_time"
                  label="寄出時間 (ex: 2024-04-20)"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="orderList.data[currentIndex].tracking_number"
                  label="貨運追蹤編號 (請聯繫寄貨人員)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <template #actions>
            <v-btn
              class="ms-auto"
              text="取消"
              color="red-lighten-2"
              @click="handleCancelEdit"
            ></v-btn>
            <v-btn
              text="確定"
              color="green-lighten-2"
              @click="handleConfirmEdit"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-header {
  background-color: #f3f4f6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  h1 {
    font-family: 'Caveat', sans-serif;
    @media screen and (max-width: 600px) {
      font-size: 0.8rem;
    }
  }
}

.edit-card {
  width: 500px;

  @media screen and (max-width: 600px) {
    width: 80vw;
  }
}
</style>
