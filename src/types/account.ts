


export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm extends LoginForm {
  confirm: string
}
