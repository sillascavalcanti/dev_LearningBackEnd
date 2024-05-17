import User from "../model/User";
import { UserRequest } from "../model/request/UserRequest";
import { UserResponse } from "../model/response/UserResponse";

export abstract class UserMapper {
  
  static toResponse(user: User): UserResponse {
    return {fullname: user.fullname, document: user.document, phone: user.phone, email: user.email, address: user.address} as UserResponse;
  }

  static toEntity(request: UserRequest): User{
    return new User(null, request.fullname, request.document, request.password, request.phone, request.email, request.address.street, request.address.number, request.address.complement, request.address.neighborhood, request.address.city, request.address.state, request.address.postalCode);
  } 
}