import { UserRepository } from "../repositories/users.repository";
import { User } from "../models/user.model";
import { NotFoundError } from "../utils/errors";

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
}