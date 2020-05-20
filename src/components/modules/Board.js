export default class Board {
  constructor (title = '', time = '', file = null) {
    this.title = title
    this.time = time
    this.file = file
  }

  get getTime () {
    return this.time
  }

  get getTitle () {
    return this.title
  }

  get getFile () {
    return this.file
  }
}
