export default class Board {
  constructor (title) {
    this.id = this.timestamp()
    this.title = title
  }

  get getId () {
    return this.id
  }

  get getTitle () {
    return this.title
  }

  timestamp () {
    let time = new Date()
    return time.getTime()
  }
}
