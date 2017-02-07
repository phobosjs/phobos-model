const chai = require('chai')

const _Module = require('../index')
const SampleModelClass = require('./support/model-class')

const expect = chai.expect

describe('phobos.js model', () => {


  SampleModelClass.prototype.name = 'Sample'

  const Instance = new SampleModelClass(_Module)

  it('Proxy correctly wraps a class', () => {
    expect(SampleModelClass.fields).to.include.keys('weather')
    expect(SampleModelClass.fields).to.include.keys('distance')
  })

  it('Proxy set() and get()', () => {
    Instance.weather = 'test'
    expect(Instance.weather).to.equal('test')
  })

  it('Proxy deleteProperty()', () => {
    delete Instance.weather
    expect(Instance.weather).to.equal(undefined)
  })

  it('Proxy ownKeys()', () => {
    Instance.weather = 'test'
    Instance.distance = 'test'
    expect(Object.keys(Instance)).to.deep.equal([ 'weather', 'distance' ])
  })

  it('Proxy has()', () => {
    Instance.weather = 'test'
    Instance.distance = 'test'

    const keys = []

    for (const key in Instance) {
      if (Instance.hasOwnProperty(key)) keys.push(key)
    }

    expect(keys).to.deep.equal([ 'weather', 'distance' ])
  })

})
