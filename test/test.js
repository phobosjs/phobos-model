const chai = require('chai')
const _Module = require('../index')

const expect = chai.expect

describe('phobos.js model', () => {
  class SampleModelClass {

    constructor() {
      return new _Module(this)
    }

    validate(prop, value) {
      return SampleModelClass.validationPass
    }

  }

  SampleModelClass.prototype.validationPass = false
  SampleModelClass.prototype.fields = [ 'weather', 'distance' ]
  SampleModelClass.prototype.name = 'Sample'

  const Instance = new SampleModelClass()

  it('Proxy correctly wraps a class', () => {
    expect(Instance.fields).to.include('weather')
    expect(Instance.fields).to.include('distance')
  })

  it('Proxy rejects set() on validation error', () => {
    Instance.weather = 'test'
    expect(Instance.weather).to.equal(undefined)
    expect(Instance.error).to.equal('invalid value for Sample.weather')
  })

  it('Proxy set() and get()', () => {
    SampleModelClass.validationPass = true
    Instance.weather = 'test'
    expect(Instance.weather).to.equal('test')
  })

  it('Proxy deleteProperty()', () => {
    SampleModelClass.validationPass = true
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
