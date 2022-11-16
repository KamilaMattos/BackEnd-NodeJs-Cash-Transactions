export interface IUserRequest {
  username: string
  password: string
}


export interface IUser {
  id: string
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
}
