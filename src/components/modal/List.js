import Board from './Board'
import Element from './Element'

export default class List extends Board {
  constructor (title = '', element = '', value = false) {
    super(title)
    this.list = new Element(element, value)
  }

  get getList () {
    return this.list
  }
}
