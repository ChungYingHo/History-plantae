/*
 * @FilePath: \stores\cartInfo.ts
 * @Date: 2024-03-17 16:20:14
 * @Author: Chung-Ying
 * @Description: 購物車物品
 * -----
 * Last Modified: 2024-04-15 23:47:06
 * Modified By: Chung-Ying
 * -----
 * Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
 */

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<any>([])

  return {
    cartItems
  }
})
