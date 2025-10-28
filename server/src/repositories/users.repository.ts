import { User } from "../models/user.model";

export class UserRepository {
  private user: User;

  constructor() {
    this.user = { id: "this-is-uuid", name: "John User" };
  }

  async findAll(): Promise<User[]> {
    const users = await new Promise<User[]>((res, rej) => {
      return (
        setTimeout(() => res([this.user, this.user]), 1000)
      ); 
    });

    return users;
  }

  async findById(id: string): Promise<User | null> {
    const user = await new Promise<User>((res, rej) => {
      return (
        setTimeout(() => res(this.user), 1000)
      ); 
    });

    return user;
  }
}