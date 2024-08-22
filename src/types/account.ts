


export interface LoginForm {
  username: string
  pwd: string
}

export interface RegisterForm extends LoginForm {
  confirm: string
}
