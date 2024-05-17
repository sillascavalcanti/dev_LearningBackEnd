import User from "../model/User";

export interface UserRepository {
  findUniqueByEmailAndPassword(email: String, password: String): Promise<User>;
  findByEmailAndDocument(email: string, document: string): Promise<User>;
  findById(id: string): Promise<User>;
  save(user: User): Promise<User>;
}
