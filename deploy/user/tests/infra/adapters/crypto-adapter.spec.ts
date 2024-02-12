import cryptografy from 'crypto'
import util from 'util'
import sinon from 'sinon'
import { assert } from '@sinonjs/referee-sinon'
import { CryptoAdapter } from '../../../src/infra/adapters'

describe('Crypto Adapter', () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('should call randomBytes with correct size', async () => {
    const sut = new CryptoAdapter()
    const randomBytesSpy = sinon.spy(cryptografy, 'randomBytes')

    await sut.hash('any_password')

    assert(randomBytesSpy.callCount)
    assert(randomBytesSpy.withArgs(16).calledOnce)
  })

  it('should call promisify with correct size', async () => {
    const sut = new CryptoAdapter()
    const promisifySpy = sinon.spy(util, 'promisify')

    await sut.hash('any_password')

    assert(promisifySpy.callCount)
  })

  it('should return the correct hash', async () => {
    const sut = new CryptoAdapter()
    sinon.stub(util, 'promisify').returns(() => ({ toString () { return 'any_hash' } }))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    sinon.stub(cryptografy, 'randomBytes').returns((() => ({ toString () { return 'any_salt' } }))() as any)

    const hash = await sut.hash('any_password')
    assert.equals(hash, 'any_hash.any_salt')
  })
})
