import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mapper/UserMapper";
import { UserRequest } from "../../model/request/UserRequest";
import { UserResponse } from "../../model/response/UserResponse";
import { UserRepositoryImpl } from "../../repository/impl/UserRepositoryImpl";
import { UserService } from "../UserService";
import { UserRepository } from "../../repository/UserRepository";

@injectable()
export class UserServiceImpl implements UserService{

  private userRepository: UserRepository;

  constructor(@inject(UserRepositoryImpl) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public findById(id: string): Promise<UserResponse>{
    return this.userRepository.findById(id).then(UserMapper.toResponse);
  }

  public save(userRequest: UserRequest): Promise<UserResponse>{
    return this.userRepository.save(UserMapper.toEntity(userRequest)).then(UserMapper.toResponse);
  }
}