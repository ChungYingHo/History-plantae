/*
 * @FilePath: \server\api\order.get.ts
 * @Date: 2024-04-20 22:12:50
 * @Author: Chung-Ying
 * @Description:
 * -----
 * Last Modified: 2024-04-21 13:02:25
 * Modified By: Chung-Ying
 * -----
 * Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
 */

import { db } from '@vercel/postgres'

export default defineEventHandler(async () => {
  const client = await db.connect()
  try {
    // 獲取訂單數據
    const { rows: orders } = await client.query(
      `SELECT o.*, u.name AS user_name, u.phone, u.address, u.card_number,
              d.name AS delivery_method,
              array_agg(p.name) AS product_names,
              array_agg(p.unit) AS product_units,
              array_agg(od.quantity) AS product_quantities,
              array_agg(od.price) AS product_prices
         FROM orders o
         JOIN users u ON o.users_id = u.id
         JOIN delivery d ON o.delivery_id = d.id
         JOIN order_details od ON o.id = od.order_id
         JOIN products p ON od.product_id = p.id
         GROUP BY o.id, u.name, u.phone, u.address, u.card_number, d.name
         ORDER BY o.created_at DESC`
    )

    client.release()
    return {
      success: true,
      data: orders
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return { success: false, message: 'Error fetching orders' }
  }
})
