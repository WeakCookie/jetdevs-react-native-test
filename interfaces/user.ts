export interface IUser {
  name: {
    first: string
    last: string
  }
  location: {
    city: string
    state: string
  }
  picture: { thumbnail: string }
  login: { uuid: string }
  isFavorite?: boolean
}

export interface ICredential {
  email: string
  password: string
}