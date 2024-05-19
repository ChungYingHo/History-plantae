/*
 * @FilePath: \server\api\search.ts
 * @Date: 2024-04-15 23:38:41
 * @Author: Chung-Ying
 * @Description: 搜尋訂單 api
 * -----
 * Last Modified: 2024-04-21 09:57:35
 * Modified By: Chung-Ying
 * -----
 * Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
 */

import { db } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const orderNumber = body.orderNumber

  // return { ...body }

  if (!orderNumber) {
    return { success: false, message: 'Order number is required' }
  }

  const client = await db.connect()

  try {
    const { rows: orderRows } = await client.query(
      `SELECT o.id, o.total_price, o.status, o.delivery_time, o.tracking_number, u.name, u.phone, u.address, u.card_number, d.name as delivery_name
        FROM orders o
        JOIN users u ON o.users_id = u.id
        JOIN delivery d ON o.delivery_id = d.id
        WHERE o.order_number = $1`,
      [orderNumber]
    )

    if (orderRows.length === 0) {
      return { success: false, message: 'Order not found' }
    }

    const orderDetails = await client.query(
      `SELECT p.name, p.unit, od.quantity, od.price
        FROM order_details od
        JOIN products p ON od.product_id = p.id
        WHERE od.order_id = $1`,
      [orderRows[0].id]
    )

    client.release()

    return {
      success: true,
      order: orderRows[0],
      products: orderDetails.rows
    }
  } catch (error) {
    console.error('Error searching order:', error)
    return { success: false, message: 'Error searching order' }
  }
})
