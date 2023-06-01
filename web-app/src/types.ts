export type IMessage = {
  firstOfDay?: boolean
  senderId: string
  text: string
  receiverId: string
  sentByMe?: boolean
  createdAt?: Date
  _id?: string
  roomId?: string
}

export type IChatRoom = {
  members: string[]
  messages: IMessage[]
  _id?: string
  post: IPost
}
export interface IUser {
  data: {
    user: IUser | null
  }

  // token: string;
  isSignedIn?: boolean
  accessToken?: string
  currentChatRoom?: IChatRoom
}
export interface IUserState {
  user: IUser | null
  isSignedIn: boolean
  currentChatRoom?: IChatRoom
  accessToken: string
}
export type ISignInInfo = {
  email: string
  password: string
}
export interface IUser {
  // data?: any;
  _id?: string
  email: string
  firstName: string
  credits: number
  name: string
  location?: {
    coordinates: []
  }
  favorites?: string[]
}
export interface ISignUpInfo {
  name: string
  email: string
  confirmEmail?: string
  password: string
  passwordConfirm: string
}

export interface IPost {
  typeOfItems: string[]
  group: string
  condition: string
  createdAt: string
  description: string
  _id: string
  images: string[]
  itemCount: number
  location: {
    coordinates: [number, number]
    type: string
    city: string
  }
  distance: number
  sizes: string[]
  age: string
  title: string
  user: string
  userName?: string
}
export interface IReviewPost {
  typeOfItems: string[]
  group: string
  condition: string
  createdAt: string
  description: string
  images: string[]
  itemCount: number
  location: {
    city: string
  }
  distance: number
  sizes: string[]
  age: string
  title: string
  _id: string
}

// REACT QUERY
export interface IQueryClientResults<T> {
  data: {
    data: T
  }
}

interface IMetadata {
  nextPage: number
  totalPages: number
  totalResults: number
  _id: null
}

export interface IPostQueryResult {
  metadata: IMetadata
  posts: IPost[]
}

export interface IGeoLocation {
  coordinates: [number, number]
  type: string
  city?: string
}

// ENUMS
export interface IEnum {
  [key: string]: string[]
  sizes: string[]
  clothes: string[]
  main: string[]
  toys: string[]
  other: string[]
}

// LOCATION

export interface ILocation {
  city: string
  lat: string
  lng: string
}
export interface IGeoJson {
  type: IPoint
  coordinates: [number, number]
  city?: string
}
export enum IPoint {
  Point = 'Point',
}

export interface ICheckBox {
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
}

export interface IUpdateData {
  newData: IGeoJson | string
  field: string
}

export interface IStringObj {
  [key: string]: string
}

export interface IUpdateEmailProps {
  newEmail: string
  password: string
}
export interface IUpdatePasswordProps {
  password: string
  passwordNew: string
  passwordConfirm: string
}
