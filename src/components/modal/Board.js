export default class Board {
  constructor (title = '', time = '') {
    this.title = title
    this.time = time
  }

  get getTime () {
    return this.time
  }

  get getTitle () {
    return this.title
  }
}
