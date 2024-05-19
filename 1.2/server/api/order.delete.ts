/*
 * @FilePath: \server\api\order.delete.ts
 * @Date: 2024-04-20 22:15:55
 * @Author: Chung-Ying
 * @Description:
 * -----
 * Last Modified: 2024-04-20 22:16:11
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
    // 刪除訂單明細
    await client.query(`DELETE FROM order_details WHERE order_id = $1`, [
      orderId
    ])

    // 刪除訂單
    await client.query(`DELETE FROM orders WHERE id = $1`, [orderId])

    // 檢查是否還有其他訂單使用相同的使用者
    const { rowCount } = await client.query(
      `SELECT COUNT(*) FROM orders WHERE users_id = (SELECT users_id FROM orders WHERE id = $1)`,
      [orderId]
    )

    // 如果沒有其他訂單使用相同的使用者，則刪除該使用者
    if (rowCount === 0) {
      await client.query(
        `DELETE FROM users WHERE id = (SELECT users_id FROM orders WHERE id = $1)`,
        [orderId]
      )
    }

    client.release()

    return {
      success: true,
      message: 'Order and related data deleted successfully!'
    }
  } catch (error) {
    console.error('Error deleting order and related data:', error)
    return {
      success: false,
      message: 'Failed to delete order and related data'
    }
  }
})
