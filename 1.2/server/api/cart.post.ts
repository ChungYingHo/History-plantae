/*
 * @FilePath: \server\api\cart.post.ts
 * @Date: 2024-04-15 23:14:40
 * @Author: Chung-Ying
 * @Description: 購物車 api
 * -----
 * Last Modified: 2024-04-21 12:42:49
 * Modified By: Chung-Ying
 * -----
 * Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
 */
import { db } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await db.connect()

  try {
    let userId
    // Step 1: 檢查用戶是否存在
    const { rows: existingUserRows } = await client.query(
      `SELECT id FROM users WHERE name = $1 AND address = $2 AND phone = $3 AND card_number = $4`,
      [body.name, body.address, body.phone, body.cardInfo]
    )

    if (existingUserRows.length > 0) {
      // 使用現有用戶的 ID
      userId = existingUserRows[0].id
    } else {
      // 創建新用戶
      const { rows: newUserRows } = await client.query(
        `INSERT INTO users (name, address, phone, card_number) VALUES ($1, $2, $3, $4) RETURNING id`,
        [body.name, body.address, body.phone, body.cardInfo]
      )
      userId = newUserRows[0].id
    }

    // Step 2: 獲取配送方式ID
    const { rows: deliveryRows } = await client.query(
      `SELECT id FROM delivery WHERE name = $1`,
      [body.delivery]
    )
    const deliveryId = deliveryRows[0].id

    // Step 3: 創建訂單
    const { rows: orderRows } = await client.query(
      `INSERT INTO orders (users_id, delivery_id, total_price, note, order_number) VALUES ($1, $2, $3, $4, $5) RETURNING id, order_number`,
      [userId, deliveryId, body.total, body.note, body.order_number]
    )
    const orderId = orderRows[0].id
    const orderNumber = orderRows[0].order_number

    // Step 4: 處理訂單明細
    for (const product of body.products) {
      const { rows: productRows } = await client.query(
        `SELECT id FROM products WHERE name = $1 AND unit = $2`,
        [product.name, product.unit]
      )
      const productId = productRows[0].id

      await client.query(
        `INSERT INTO order_details (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`,
        [orderId, productId, product.amount, product.price]
      )
    }

    await client.release()

    return {
      success: true,
      message: 'Order created successfully!',
      order_number: orderNumber
    }
  } catch (error) {
    console.error('Error processing order:', error)
    return { success: false, message: 'Failed to create order' }
  }
})
