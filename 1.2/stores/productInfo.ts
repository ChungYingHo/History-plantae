/*
 * @FilePath: \stores\productInfo.ts
 * @Date: 2024-03-23 23:08:52
 * @Author: Chung-Ying
 * @Description: 商品資訊
 * -----
 * Last Modified: 2024-04-15 23:47:17
 * Modified By: Chung-Ying
 * -----
 * Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
 */

// @ts-ignore
import mangoI from '@/assets/images/products/愛文芒果.jpg'
// @ts-ignore
import mangoB from '@/assets/images/products/黑香芒果.jpg'
// @ts-ignore
import mangoW from '@/assets/images/products/西施芒果.jpg'
// @ts-ignore
import mangoDry from '@/assets/images/products/芒果乾.jpg'

export const useProductStore = defineStore('product', () => {
  const productData = [
    {
      id: 1,
      name: '愛文芒果',
      producer: '植宇宙夥伴的爸媽',
      area: '台南市六甲區',
      intro:
        '愛文芒果是台灣最早的芒果品種之一，果實呈橢圓形，果皮為黃色，果肉質地細緻，味道甜美，香氣濃郁，是台灣最受歡迎的芒果品種之一。',
      img: mangoI,
      unit: [
        {
          name: '箱 / 10斤',
          price: 500
        },
        {
          name: '箱 / 20斤',
          price: 1000
        }
      ]
    },
    {
      id: 2,
      name: '黑香芒果',
      producer: '植宇宙夥伴的爸媽',
      area: '台南市六甲區',
      intro:
        '黑香芒果是台灣的特有品種，果實呈橢圓形，果皮為暗紫色，果肉質地細緻，味道甜美，香氣濃郁，是台灣最受歡迎的芒果品種之一。',
      img: mangoB,
      unit: [
        {
          name: '箱 / 10斤',
          price: 600
        },
        {
          name: '箱 / 20斤',
          price: 1200
        }
      ]
    },
    {
      id: 3,
      name: '西施芒果',
      producer: '植宇宙夥伴的爸媽',
      area: '台南市六甲區',
      intro:
        '西施芒果是台灣的特有品種，果實呈橢圓形，果皮為黃色，果肉質地細緻，味道甜美，香氣濃郁，是台灣最受歡迎的芒果品種之一。',
      img: mangoW,
      unit: [
        {
          name: '箱 / 10斤',
          price: 400
        },
        {
          name: '箱 / 20斤',
          price: 800
        }
      ]
    },
    {
      id: 4,
      name: '芒果乾',
      producer: '植宇宙夥伴的爸媽',
      area: '台南市六甲區',
      intro:
        '芒果乾是將新鮮的芒果去皮、切片、風乾而成，保留了芒果的營養與風味，是一種美味的零食。',
      img: mangoDry,
      unit: [
        {
          name: '包 / 100g',
          price: 100
        },
        {
          name: '包 / 200g',
          price: 200
        }
      ]
    }
  ]
  return {
    productData
  }
})
