import Board from './Board'

export default class Task extends Board {
  constructor (title = '', list = [{}]) {
    super(title)
    this.list = list
  }
  get allList () {
    return this.list
  }

  set changeStateElement (elementName = 'String') {
    Object.keys(this.list).forEach(e => {
      if (e === elementName) {
        if (this.list[e]) {
          this.list[e] = false
        } else {
          this.list[e] = true
        }
      }
    })
  }
}
