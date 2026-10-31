import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import app from '../src/app.js'

let server
let baseUrl

before(async () => {
  server = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => server.once('listening', resolve))
  baseUrl = `http://127.0.0.1:${server.address().port}/api`
})

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()))
  })
})

test('health endpoint reports unavailable database state explicitly', async () => {
  const response = await fetch(`${baseUrl}/health`)
  assert.equal(response.status, 503)
  assert.deepEqual(await response.json(), { status: 'degraded', database: 'disconnected' })
})

test('registration rejects invalid input before attempting database access', async () => {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '', email: 'not-an-email', password: 'short' }),
  })
  assert.equal(response.status, 400)
  assert.match((await response.json()).message, /valid name and email/i)
})

test('login rejects missing credentials before attempting database access', async () => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
  assert.equal(response.status, 400)
  assert.match((await response.json()).message, /email and password/i)
})

test('protected resources reject unauthenticated requests', async () => {
  const response = await fetch(`${baseUrl}/customers`)
  assert.equal(response.status, 401)
  assert.match((await response.json()).message, /authentication/i)
})
