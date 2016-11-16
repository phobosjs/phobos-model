'use strict'

/** This class is meant to wrap around a store model object in order to establish
 *  an interface to edit fields dynamically using pre-defined methods called "traps" */
class PhobosModelProxy {

  /**
   * Initialize the proxy and set the correct proxy methods on the object
   * @param {object} klass - The model object to get wrapped
   * @return {object} Returns an instance of the PhobosModelProxy wrapping `klass`
   */
  constructor(klass) {
    this.fields = PhobosModelProxy.fields

    return new Proxy(klass, {
      get: this.get,
      set: this.set,
      deleteProperty: this.deleteProperty,
      has: this.has,
      ownKeys: this.ownKeys
    })
  }

  /**
   * A unified getter for the model
   * @param {object} target - The model object - this is used internally
   * @param {string} prop - The property of the model in question
   * @return {mixed} Returns the prop specified, or undefined when not set
   */
  get(target, prop) {
    return target[prop]
  }

  /**
   * A unified setter for the model - uses model's validation as well
   * @param {object} target - The model object - this is used internally
   * @param {string} prop - The property of the model in question
   * @param {mixed} value - The value for the property of the model in question
   */
  set(target, prop, value) {
    if (!this.has(target, prop)) return
    if (!target.validate(prop, value)) {
      target.error = `invalid value for ${target.name}.${prop}`
      return
    }

    return target[prop] = value
  }

  /**
   * A unified delete method for the model
   * @param {object} target - The model object - this is used internally
   * @param {string} prop - The property of the model in question
   */
  deleteProperty(target, prop) {
    target[prop] = undefined
  }

  /**
   * The `has` trap is used for enumeration of the model
   * @param {object} target - The model object - this is used internally
   * @param {string} prop - The property of the model in question
   */
  has(target, prop) {
    return target.fields.indexOf(prop) > -1
  }

  /**
   * The `ownKeys` trap is used for things like Object.keys()
   * @param {object} target - The model object - this is used internally
   */
  ownKeys(target) {
    return target.fields
  }

  static set fields(fields) {
    if (!Array.isArray(fields)) throw new Error('Fields property provided to PhobosModelProxy are not an array')
    return this._fields = fields
  }

}

module.exports = PhobosModelProxy
