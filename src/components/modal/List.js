import { Board } from './Board'

export default class List extends Board {
  constructor (title = '', list = {}) {
    super(title)
    this.list = list
  }

  get getList () {
    return this.list
  }
}
