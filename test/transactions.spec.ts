import request from 'supertest'
import { beforeAll, describe, it, expect, afterAll } from 'vitest'
import { app } from '../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new transaction', async () => {
    const newTransaction = {
      title: 'Transaction test',
      amount: 50,
      type: 'credit'
    }

    const response = await request(app.server)
      .post('/transactions')
      .send(newTransaction)

    expect(response.statusCode).toEqual(201)
  })
})
