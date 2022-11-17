import { IUser } from "../interfaces/user";

export function getFullName(user: IUser): string {
  return `${user?.name?.first ?? ''} ${user?.name?.last ?? ''}`
}