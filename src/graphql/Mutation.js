import { gql } from '@apollo/client'

export const CREATE_TASK = gql`
mutation CreateTask($taskInput: taskInput) {
  createTask(TaskInput: $taskInput) {
    id
  }
}
`
export const USER_LOGIN = gql`
mutation UserLogin($email: String, $password: String) {
  userLogin(email: $email, password: $password) {
    userId
    userToken
    userTokenExpire
  }
}
`
export const TASK_DELETE = gql`
mutation Mutation($taskId: ID) {
  deleteTask(taskId: $taskId) {
    id
  }
}
`
export const TASK_EDIT = gql`
mutation Mutation($taskEditInput: taskEditInput) {
  editTask(TaskEditInput: $taskEditInput) {
    id
  }
}
`
export const CHANGE_PRIORITY = gql`
mutation ChangePriority($taskId: ID, $priority: String) {
  changePriority(taskId: $taskId, priority: $priority) {
    id
  }
}
`

export const CHANGE_STATUS = gql`
mutation ChangeStatus($taskId: ID, $status: String) {
  changeStatus(taskId: $taskId, status: $status) {
    id
  }
}
`
