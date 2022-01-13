export class User {
  email: string
  password: string
  password_confirmation: string
  id?: Number
  auth_token?: any

  constructor(
    email: string, password: string, password_confirmation: string,
    id?: Number, auth_token?: any) {
      this.email = email
      this.password = password
      this.password_confirmation = password_confirmation
      this.id = id
      this.auth_token = auth_token
  }

}