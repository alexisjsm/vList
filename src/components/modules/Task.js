import Board from './Board'

export default class Task extends Board {
  constructor (title = '', list = [{}], time = '') {
    super(title, time)
    this.list = list
  }
  get allTask () {
    return this.list
  }
}
