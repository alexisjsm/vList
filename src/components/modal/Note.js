import Board from './Board'
export default class Note extends Board {
  constructor (title = 'Title', content = 'Content') {
    super(title)
    this.content = content
  }

  get getContent () {
    return this.content
  }
}
