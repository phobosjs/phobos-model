'use strict'

class SampleModelClass {

  constructor(_Module) {
    return new _Module(this)
  }

  validate(prop, value) {
    return SampleModelClass.validationPass
  }

  get(prop) {
    return this[prop]
  }

  set(prop, value) {
    return this[prop] = value
  }

  static get fields() {
    return { weather: {}, distance: {} }
  }

}

module.exports = SampleModelClass
