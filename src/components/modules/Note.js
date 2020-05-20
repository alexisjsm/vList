import Board from './Board'
export default class Note extends Board {
  constructor (title = 'Title', content = 'Content', time = '', file = null) {
    super(title, time, file)
    this.content = content
  }

  get getContent () {
    return this.content
  }
}
