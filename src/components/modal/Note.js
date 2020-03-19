export default class Note {
  constructor (title = 'title', content = 'content' | null, list = [] | null) {
    this.id = this.timestamp()
    this.title = title
    this.content = content
    this.list = list
  }

  get getId () {
    return this.id
  }

  get getTitle () {
    return this.title
  }

  get getContent () {
    return this.content
  }

  get getList () {
    return this.list
  }

  timestamp () {
    let time = new Date()
    return time.getTime()
  }
}
