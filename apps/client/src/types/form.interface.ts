interface ILoginForm {
  username:string;
  email:string;
  password:string
}

interface ISignupForm extends ILoginForm{
  username:string
}

export type{ILoginForm, ISignupForm}