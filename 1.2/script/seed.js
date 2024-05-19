import { db } from '@vercel/postgres'

async function clearTables(client) {
  try {
    // 清空所有資料表
    await client.query(`
      DROP TABLE IF EXISTS order_details;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS delivery;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
    console.log('Tables cleared successfully.')
  } catch (error) {
    console.error('Error clearing tables:', error)
    throw error
  }
}

async function createTables(client) {
  try {
    // 創建用戶表
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          address VARCHAR(255) NOT NULL,
          phone VARCHAR(255) NOT NULL,
          card_number VARCHAR(255) NOT NULL
      );
    `)

    // 創建產品表
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          unit VARCHAR(255) NOT NULL,
          price NUMERIC NOT NULL
      );
    `)

    // 創建運送方式表
    await client.query(`
      CREATE TABLE IF NOT EXISTS delivery (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          cost INTEGER NOT NULL
      );
    `)

    // 創建訂單表
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          users_id INTEGER NOT NULL REFERENCES users(id),
          delivery_id INTEGER NOT NULL REFERENCES delivery(id),
          order_number VARCHAR(255) NOT NULL UNIQUE,
          total_price INTEGER NOT NULL,
          status VARCHAR(255) NOT NULL DEFAULT '訂單處理中',
          delivery_time VARCHAR(255) DEFAULT '尚未寄送',
          tracking_number VARCHAR(255) DEFAULT '未有貨運單號',
          note TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 創建訂單明細表
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_details (
          id SERIAL PRIMARY KEY,
          order_id INTEGER NOT NULL REFERENCES orders(id),
          product_id INTEGER NOT NULL REFERENCES products(id),
          quantity INTEGER NOT NULL,
          price NUMERIC NOT NULL
      );
    `)

    console.log('Tables created successfully.')
  } catch (error) {
    console.error('Error creating tables:', error)
    throw error
  }
}

async function insertDelivery(client) {
  const deliveryData = ['一般配送 (免費)', '冷藏配送 (+150 元)']

  for (const delivery of deliveryData) {
    let cost = 0
    if (delivery.includes('冷藏')) {
      cost = 150
    }
    await client.query(
      `
            INSERT INTO delivery (name, cost)
            VALUES ($1, $2);
        `,
      [delivery, cost]
    )
  }
}

async function insertProducts(client) {
  const productData = [
    {
      name: '愛文芒果',
      units: [
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
      name: '黑香芒果',
      units: [
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
      name: '西施芒果',
      units: [
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
      name: '芒果乾',
      units: [
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

  for (const product of productData) {
    for (const unit of product.units) {
      await client.query(
        `
        INSERT INTO products (name, unit, price)
        VALUES ($1, $2, $3);
      `,
        [product.name, unit.name, unit.price]
      )
    }
  }

  console.log('Products inserted successfully.')
}

// 在 main 函數中連接數據庫，並調用 createTables 函數創建表
async function main() {
  const client = await db.connect()
  await clearTables(client)
  await createTables(client)
  await insertDelivery(client)
  await insertProducts(client)
  await client.end()
}

main().catch((err) => {
  console.error('An error occurred while creating tables:', err)
})
