type UserResponse ={
    name: string;
    email: string;
    token: string;
}

type SignUpPayload ={
    name: string;
    email: string;
    password:string
}

type LoginPayload ={
    email: string;
    password:string
}

export type {UserResponse, SignUpPayload, LoginPayload}