<!--
  @FilePath: \pages\cart.vue
  @Date: 2024-04-01 21:42:56
  @Author: Chung-Ying
  @Description: 購物車頁面
  -----
  Last Modified: 2024-04-21 15:59:53
  Modified By: Chung-Ying
  -----
  Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
-->

<script setup lang="ts">
import { useCartStore } from '@/stores/cartInfo'
import Swal from 'sweetalert2'

const useCart = useCartStore()

// sweet-alert2
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

function showToast(icon: any, title: any) {
  Toast.fire({
    icon: icon,
    title: title
  })
}

// form data
const formData = reactive<any>({
  check: false,
  card_check: false,
  name: '',
  date: '',
  phone: '',
  address: '',
  delivery: '一般配送 (免費)',
  cardInfo: '',
  cardName: '',
  note: '',
  order_number: '',
  products: []
})

const totalAmount = computed(() => {
  return useCart.cartItems.reduce(
    (acc: number, item: any[]) => {
      // @ts-ignore
      return acc + item.price * item.amount
    },
    formData.delivery === '一般配送 (免費)' ? 0 : 150
  )
})

const generateUavCode = (): string => {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0].replace(/-/g, '') // 將日期格式化為YYYYMMDD
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomStr = ''
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)

    randomStr += chars[randomIndex]
  }

  return `plantae${dateStr}-${randomStr}`
}

const removeCart = (index: number) => {
  useCart.cartItems.splice(index, 1)
  showToast('success', '已移除品項')
}

// step progress
const step = ref(1)

const nextStep = () => {
  switch (step.value) {
    case 1:
      if (useCart.cartItems.length === 0) {
        showToast('error', '請選擇商品')
        return
      } else if (!formData.check) {
        showToast('error', '請詳閱聲明')
        return
      }
      break
    case 2:
      if (useCart.cartItems.length === 0) {
        showToast('error', '請選擇商品')
        return
      }
      break
    case 3:
      if (!formData.name || !formData.phone || !formData.address) {
        showToast('error', '請填寫完整資訊')
        return
      }
      break
    case 4:
      if (!formData.cardInfo) {
        showToast('error', '請填寫匯款帳號')
        return
      }
      if (!formData.card_check) {
        showToast('error', '請詳閱匯款注意事項')
        return
      }
      break
    default:
      break
  }

  // 如果沒有返回，增加 step 值
  step.value++
}

const prevStep = () => {
  if (step.value > 1) {
    step.value -= 1
  }
}

const dialog = ref(false)
const loadingStatus = ref('loading')
const displayOrderNumber = ref('')

const handleCopy = () => {
  navigator.clipboard.writeText(displayOrderNumber.value)
  showToast('success', '已複製訂單編號')
}

const handleConnect = () => {
  window.open('https://www.facebook.com/plantae.taiwan', '_blank')
}

const handleSubmit = async () => {
  if (!formData.total) {
    formData.total = totalAmount.value
  }

  if (!formData.order_number) {
    formData.order_number = generateUavCode()
  }

  if (formData.products.length === 0) {
    formData.products = useCart.cartItems
  }
  // 送出表單
  console.log(formData)

  dialog.value = true

  const data = await $fetch('/api/cart', {
    method: 'POST',
    body: formData
  })
  console.log('data', data)
  if ((data as { success: boolean }).success) {
    displayOrderNumber.value = formData.order_number
    loadingStatus.value = 'success'
    useCart.cartItems = []
    step.value = 1
    formData.check = false
    formData.card_check = false
    formData.name = ''
    formData.date = ''
    formData.phone = ''
    formData.address = ''
    formData.delivery = '一般配送 (免費)'
    formData.cardInfo = ''
    formData.cardName = ''
    formData.note = ''
    formData.order_number = ''
    formData.products = []
  } else {
    loadingStatus.value = 'fail'
  }
}
</script>

<template>
  <div class="cart-container">
    <div
      class="cart-sub-container mx-auto mt-20 flex w-10/12 flex-col justify-between gap-3 py-5"
    >
      <!-- step progress -->
      <StepProgress :step="step" class="step-progress" />
      <p class="rwd-step text-xl font-semibold text-lime-600">
        Step {{ step }} / 5
      </p>

      <!-- step -->
      <div
        class="cart-third-container flex w-full flex-1 items-start justify-between"
      >
        <v-row>
          <v-col cols="12" md="7">
            <div class="cart-left flex items-start">
              <!-- 聲明 -->
              <div v-show="step === 1" class="w-full">
                <v-row>
                  <v-col cols="12" class="flex items-center gap-2">
                    <v-icon
                      color="pink-darken-2"
                      icon="mdi-information-outline"
                    ></v-icon>
                    <p class="text-2xl font-medium text-slate-600">
                      植宇宙聲明 - 宅配 & 付款
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <p class="text-lg text-lime-600">宅配規則</p>
                    <p class="mb-2 text-base">
                      1.
                      一般宅配免收配送費用，如有冷藏運送的需求，可以在表單中選擇，需額外酌收
                      150 元配送費。
                    </p>
                    <p class="mb-2 text-base">
                      2.
                      為求盡量出貨隔日到貨，出貨日為每週一到週四，如有特殊需求請備註說明。
                    </p>
                    <p class="mb-2 text-base">
                      3.
                      由於堅持自然成熟的原則，芒果的成熟期不一致，因此無法保證出貨日期，我們會盡快為您安排發貨，通常在兩週內完成出貨，訂單流程可以前往「訂單查詢」檢視。
                    </p>
                    <p class="mb-2 text-base">
                      4.
                      如您有單筆大量訂購的需要，可以至植宇宙臉書粉轉或IG與我們聯繫喔。
                    </p>
                    <p class="mt-5 text-lg text-lime-600">付款方式</p>
                    <p class="mb-2 text-base">
                      1.
                      介紹人代收：部分介紹人提供代收服務，若您是透過介紹人訂購，可以先問問他們喔！然後在表單中註明介紹人姓名，以利後續流程！
                    </p>
                    <p class="mb-2 text-base">
                      2.
                      匯款：匯款後麻煩在表單中上傳匯款截圖或是匯款畫面，以利後續流程！
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox
                      v-model="formData.check"
                      label="我已詳閱聲明"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </div>

              <!-- 商品確認 -->
              <div v-show="step === 2" class="w-full">
                <v-row>
                  <v-col cols="12">
                    <p class="text-2xl font-medium text-slate-600">商品確認</p>
                  </v-col>
                </v-row>
                <v-row>
                  <!-- RWD 600up -->
                  <v-col
                    v-for="(item, index) in useCart.cartItems"
                    :key="item.name"
                    md="4"
                    sm="6"
                    cols="12"
                  >
                    <v-card>
                      <v-img
                        class="product-600-up align-end text-white"
                        height="125"
                        :src="item.img"
                        cover
                      >
                      </v-img>

                      <v-card-text>
                        <p class="text-lg text-lime-600">{{ item.name }}</p>
                        <p class="my-2 text-base text-slate-600">
                          {{ item.unit }} (單價：{{ item.price }})
                        </p>
                        <div>
                          <span class="text-base text-slate-600"
                            >數量 (可調整)：</span
                          >
                          <input
                            v-model="item.amount"
                            type="number"
                            min="1"
                            max="10"
                            class="rounded outline outline-1 outline-slate-400"
                          />
                        </div>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn color="pink" @click="removeCart(index)"
                          >移除</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </div>

              <!-- 收件資訊 -->
              <div v-show="step === 3" class="w-full">
                <v-row>
                  <v-col cols="12">
                    <p class="text-2xl font-medium text-slate-600">
                      收件人資訊
                    </p>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.name"
                      label="收件人姓名"
                      placeholder="請輸入收件人姓名"
                      variant="solo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="formData.phone"
                      label="收件人電話"
                      placeholder="請輸入收件人電話"
                      variant="solo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.address"
                      label="收件人地址"
                      placeholder="請輸入收件人地址"
                      variant="solo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <p class="text-slate-600">配送方式</p>
                    <v-radio-group v-model="formData.delivery">
                      <v-radio
                        label="一般配送 (免費)"
                        value="一般配送 (免費)"
                      ></v-radio>
                      <v-radio
                        label="冷藏配送 (+150 元)"
                        value="冷藏配送 (+150 元)"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-textarea
                      v-model="formData.note"
                      label="可以留下您想說的話喔"
                      row-height="20"
                      rows="5"
                      variant="solo"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                </v-row>
              </div>

              <!-- 付款方式 -->
              <div v-show="step === 4" class="w-full">
                <v-row>
                  <v-col cols="12">
                    <p class="text-2xl font-medium text-slate-600">付款方式</p>
                  </v-col>
                  <v-col cols="12">
                    <v-alert
                      type="info"
                      variant="tonal"
                      title="匯款注意事項"
                      text="因本工作室尚未開立信用卡刷卡服務，請您於下單後，於三日內完成匯款，匯款時請備註收件人姓名，以利我們確認並成立訂單。"
                    ></v-alert>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.cardInfo"
                      label="匯款帳號"
                      placeholder="請輸入您的匯款帳號"
                      variant="solo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox
                      v-model="formData.card_check"
                      label="確認您詳細知曉匯款需備註「收件人姓名」"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </div>

              <!-- 最後確認 -->
              <div v-show="step === 5" class="w-full">
                <v-row>
                  <v-col cols="12">
                    <p class="text-2xl font-medium text-slate-600">最後確認</p>
                  </v-col>
                  <v-col cols="12">
                    <ul>
                      <li class="mb-2">
                        <span class="text-lg text-lime-600">收件人姓名：</span
                        ><span class="text-slate-600">{{ formData.name }}</span>
                      </li>
                      <li class="mb-2">
                        <span class="text-lg text-lime-600">收件人電話：</span
                        ><span class="text-slate-600">{{
                          formData.phone
                        }}</span>
                      </li>
                      <li class="mb-2">
                        <span class="text-lg text-lime-600">收件人地址：</span
                        ><span class="text-slate-600">{{
                          formData.address
                        }}</span>
                      </li>
                      <li class="mb-2">
                        <span class="text-lg text-lime-600">配送方式：</span
                        ><span class="text-slate-600">{{
                          formData.delivery === '1' ? '一般配送' : '冷藏配送'
                        }}</span>
                      </li>
                      <li class="mb-2">
                        <span class="text-lg text-lime-600">付款方式：</span
                        ><span class="text-slate-600">{{
                          formData.payment === '1' ? '介紹人代收' : '轉帳付款'
                        }}</span>
                      </li>
                      <li v-show="formData.payment === '2'" class="mb-2">
                        <span class="text-lg text-lime-600">匯款帳號：</span
                        ><span class="text-slate-600">{{
                          formData.cardInfo
                        }}</span>
                      </li>
                      <li class="mb-2">
                        <span class="text-lg text-lime-600">備註：</span
                        ><span class="text-slate-600">{{ formData.note }}</span>
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <!-- right part -->
          <v-col cols="12" md="5">
            <!-- total amount -->
            <div class="cart-right">
              <v-row>
                <v-col cols="12">
                  <p class="text-2xl font-medium text-slate-600">商品總額</p>
                </v-col>
                <v-col v-if="useCart.cartItems.length === 0" cols="12">
                  <p class="text-lg font-medium text-pink-600">
                    您尚未選購任何商品
                  </p>
                  <NuxtLink to="/shop">
                    <v-btn color="pink" dark class="mt-3">前往選購</v-btn>
                  </NuxtLink>
                </v-col>
                <v-col v-else cols="12">
                  <v-row v-for="item in useCart.cartItems" :key="item.name">
                    <v-col cols="8">
                      <p class="text-lg text-lime-600">{{ item.name }}</p>
                      <p class="text-base text-slate-600">
                        數量：{{ item.amount }} {{ item.unit }}
                      </p>
                    </v-col>
                    <v-col cols="4">
                      <p class="text-lg text-slate-600">
                        {{ item.price * item.amount }} 元
                      </p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="8">
                      <p class="text-lg text-lime-600">運費</p>
                    </v-col>
                    <v-col cols="4">
                      <p class="text-lg text-slate-600">
                        {{ formData.delivery === '一般配送 (免費)' ? 0 : 150 }}
                        元
                      </p>
                    </v-col>
                  </v-row>
                  <v-divider
                    class="my-3 border-opacity-100"
                    color="success"
                  ></v-divider>
                  <v-row>
                    <v-col cols="8">
                      <p class="text-lg text-lime-600">總金額</p>
                    </v-col>
                    <v-col cols="4">
                      <p class="text-lg text-slate-600">
                        {{ totalAmount }}
                        元
                      </p>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- progress button -->
      <div
        class="progress-btn flex w-full"
        :class="step === 1 ? 'justify-end' : 'justify-between'"
      >
        <v-btn
          v-show="step > 1"
          prepend-icon="mdi-arrow-left"
          @click="prevStep"
        >
          <template #prepend>
            <v-icon color="warning"></v-icon>
          </template>
          前一步
        </v-btn>
        <v-btn
          v-show="step < 5"
          append-icon="mdi-arrow-right"
          @click="nextStep"
        >
          <template #append>
            <v-icon color="success"></v-icon>
          </template>
          下一步
        </v-btn>
        <!-- todo submit -->
        <v-dialog v-model="dialog" max-width="400">
          <template #activator="{ props: activatorProps }">
            <v-btn
              v-show="step === 5"
              append-icon="mdi-check"
              color="success"
              v-bind="activatorProps"
              @click="handleSubmit"
            >
              <template #append>
                <v-icon color="success"></v-icon>
              </template>
              確認送出
            </v-btn>
          </template>
          <!-- todo loading -->
          <v-card v-if="loadingStatus === 'loading'">
            <v-card-title>訂單送出中</v-card-title>
            <v-card-text>
              <v-progress-linear
                indeterminate
                color="success"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
          <!-- todo success -->
          <v-card
            v-if="loadingStatus === 'success'"
            prepend-icon="mdi-check"
            title="訂單發送成功"
          >
            <v-row>
              <v-col cols="12">
                <p class="mx-2 text-base text-slate-600">
                  請記得保留此編號以便查詢訂單狀態
                </p>
              </v-col>
              <v-col cols="12">
                <V-text-field
                  v-model="displayOrderNumber"
                  label="訂單編號"
                  readonly
                  class="mx-2"
                  append-inner-icon="mdi-content-copy"
                  @click:append-inner="handleCopy"
                >
                </V-text-field>
              </v-col>
            </v-row>
            <template #actions>
              <v-spacer></v-spacer>

              <v-btn @click="dialog = false"> Ok </v-btn>
            </template>
            <template #prepend>
              <v-icon color="success"></v-icon>
            </template>
          </v-card>
          <!-- todo fail -->
          <v-card
            v-if="loadingStatus === 'fail'"
            prepend-icon="mdi-close"
            title="訂單發送失敗"
          >
            <v-row>
              <v-col cols="12">
                <p class="mx-2 text-base text-slate-600">
                  看來您遇到非預期的問題，請再試一次，或聯繫我們。
                </p>
              </v-col>
            </v-row>
            <template #actions>
              <v-spacer></v-spacer>
              <v-btn @click="handleConnect"> 聯繫植宇宙 </v-btn>

              <v-btn @click="dialog = false"> Ok </v-btn>
            </template>
            <template #prepend>
              <v-icon color="error"></v-icon>
            </template>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart-container {
  background-color: #f0f8ff;
  min-height: 100vh;
}

.rwd-step {
  display: none;
}

.cart-sub-container {
  min-height: 85vh;
}

.cart-left {
  padding-right: 1.5rem;
}

// RWD 600
@media screen and (max-width: 600px) {
  .step-progress {
    display: none;
  }

  .rwd-step {
    display: block;
    font-family: 'Caveat', sans-serif;
  }

  .cart-left {
    padding-right: 0;
  }

  .product-600-up {
    display: none;
  }
}
</style>
