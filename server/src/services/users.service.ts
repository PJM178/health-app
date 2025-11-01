import { UserRepository } from "../repositories/users.repository";
import { User } from "../models/user.model";
import { HttpError, NotFoundError } from "../utils/errors";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User with id " + id + " not found");
    }

    return user;
  }

  // TODO: authentication flow, just preliminary stuff for now
  async login(username: string, password: string): Promise<{ user: User }> {
    const user = await this.userRepository.findByUsername(username);
    
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const validPassword = user.password === password;

    if (!validPassword) {
      throw new HttpError(401, "Invalid credentials");
    }

    return { user };
  }
}