import { UserRequest } from "../model/request/UserRequest";
import { UserResponse } from "../model/response/UserResponse";

export interface UserService{
  findById(id: string): Promise<UserResponse>;
  save(userRequest: UserRequest): Promise<UserResponse>;
}