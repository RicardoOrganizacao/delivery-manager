export class Task {
  id: number
  title: string
  description?: string
  done?: boolean
  deadline?: string

  constructor(id: number, title: string, description?: string, done?: boolean, deadline?: string) {
    this.id = id
    this.title = title
    this.description = description
    this.done = done
    this.deadline = deadline
  }
}