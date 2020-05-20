import Board from './Board'

export default class Task extends Board {
  constructor (title = '', list = [{}], time = '', file = null) {
    super(title, time, file)
    this.list = list
  }
  get allTask () {
    return this.list
  }
}
