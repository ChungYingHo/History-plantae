<!--
  @FilePath: \pages\shop.vue
  @Date: 2024-03-16 09:29:38
  @Author: Chung-Ying
  @Description: 商場
  -----
  Last Modified: 2024-04-15 23:46:41
  Modified By: Chung-Ying
  -----
  Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
-->

<script setup lang="ts">
import { useProductStore } from '@/stores/productInfo'
import { useCartStore } from '@/stores/cartInfo'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const router = useRouter()

const useProduct = useProductStore()
const useCart = useCartStore()

const formData = reactive<any>([])

const handleChip = (
  item: { id: any; name: any; img: any },
  unit: { name: any; price: any }
) => {
  const existingIndex = formData.findIndex(
    (data: { id: any; unit: any }) =>
      data.id === item.id && data.unit === unit.name
  )

  if (existingIndex !== -1) {
    formData.splice(existingIndex, 1) // 移除
  } else {
    formData.push({
      id: item.id,
      name: item.name,
      img: item.img,
      unit: unit.name,
      price: unit.price,
      amount: 1
    }) // 添加
  }
}

const addCart = () => {
  if (formData.length === 0) {
    Swal.fire({
      icon: 'error',
      title: '未選擇商品',
      text: '請選擇商品後再加入購物車'
    })
    return
  } else {
    useCart.cartItems = formData
    // @ts-ignore
    Swal.fire({
      icon: 'success',
      title: '成功加入購物車',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: '前往購物車',
      cancelButtonText: '繼續選購'
    }).then((result) => {
      if (result.isConfirmed) {
        useCart.cartItems = formData
        router.push('/cart')
      }
    })
  }
}
</script>

<template>
  <div class="shop-container h-full w-full">
    <div class="shop-sub-container mx-auto mt-20 w-10/12 py-5">
      <v-row>
        <v-col
          v-for="item in useProduct.productData"
          :key="item.id"
          md="4"
          sm="6"
          xs="12"
        >
          <v-card class="card mx-auto">
            <v-img
              class="align-end text-white"
              height="250"
              :src="item.img"
              cover
            >
              <v-card-title>{{ item.name }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4"
              >生產者：{{ item.producer }}</v-card-subtitle
            >
            <v-card-subtitle>產地：{{ item.area }}</v-card-subtitle>

            <v-card-text>
              <p class="text-base text-slate-600">{{ item.intro }}</p>
              <v-chip-group class="mt-3 flex gap-3" multiple>
                <v-chip
                  v-for="unit in item.unit"
                  :key="unit"
                  color="orange"
                  class="unit-chip"
                  @click="handleChip(item, unit)"
                >
                  {{ unit.name }} - {{ unit.price }}元</v-chip
                >
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn color="teal" @click="addCart">加入購物車</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  min-height: 83vh;
}

.shop-container {
  background-color: #f0f8ff;
}

.unit-chip {
  :hover {
    cursor: pointer;
  }
}

// RWD 1280
@media screen and (max-width: 1280px) {
  .card {
    min-height: 10vh;
    height: fit-content;
  }
}
</style>
