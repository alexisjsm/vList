import Board from './Board'
export default class Note extends Board {
  constructor (title = 'Title', content = 'Content', time = '') {
    super(title, time)
    this.content = content
  }

  get getContent () {
    return this.content
  }
}
