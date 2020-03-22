export default class Element {
  constructor (element = '', value = false) {
    this.element = element
    this.value = value
  }
  get getElement () {
    return this.element
  }

  get getValue () {
    return this.value
  }
}
