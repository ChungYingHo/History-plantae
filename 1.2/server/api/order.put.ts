/*
 * @FilePath: \server\api\order.put.ts
 * @Date: 2024-04-20 22:14:49
 * @Author: Chung-Ying
 * @Description:
 * -----
 * Last Modified: 2024-04-20 22:15:05
 * Modified By: Chung-Ying
 * -----
 * Copyright (c) 2024 by PLANTAE Taiwan, All Rights Reserved.
 */

import { db } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const orderId = body.orderId
  const client = await db.connect()

  try {
    // 更新訂單資訊
    await client.query(
      `UPDATE orders
       SET status = $1,
           delivery_time = $2,
           tracking_number = $3
       WHERE id = $4`,
      [body.status, body.delivery_time, body.tracking_number, orderId]
    )

    client.release()

    return { success: true, message: 'Order updated successfully!' }
  } catch (error) {
    console.error('Error updating order:', error)
    return { success: false, message: 'Failed to update order' }
  }
})
