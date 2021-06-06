export interface User {
  email: string
  token: string
  username: string
  createdAt: string
}

export interface Task {
  body?: string
  createdAt?: string
  id?: string
  isDone?: boolean
  isRoot?: boolean
  subTasks?: SubTask[]
  username?: string
}

export interface SubTask {
  subTaskId?: string
  subTaskTitle?: string
}
