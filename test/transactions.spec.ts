import request from 'supertest'
import { beforeAll, describe, it, expect, afterAll, beforeEach } from 'vitest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
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

  it('should be able to list all transactions', async () => {
    const newTransaction = {
      title: 'Transaction test',
      amount: 50,
      type: 'credit'
    }

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send(newTransaction)

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listAllTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(listAllTransactions.statusCode).toEqual(200)
    expect(listAllTransactions.body.transaction).toEqual([
      {
        id: expect.any(String),
        title: 'Transaction test',
        amount: 50,
        created_at: expect.any(String),
        session_id: expect.any(String)
      }
    ])
  })

  it('should be able to list a specific transaction by id', async () => {
    const newTransaction = {
      title: 'Transaction test',
      amount: 50,
      type: 'credit'
    }

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send(newTransaction)

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listAllTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    const transactionId = listAllTransactions.body.transaction[0].id

    const getTransactionById = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionById.body.transaction).toEqual({
      id: expect.any(String),
      title: 'Transaction test',
      amount: 50,
      created_at: expect.any(String),
      session_id: expect.any(String)
    })
  })
})
