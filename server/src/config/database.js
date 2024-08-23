// server/src/config/database.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function connectDB() {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}

module.exports = { prisma, connectDB }
