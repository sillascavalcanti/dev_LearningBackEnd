import { inject, injectable } from "tsyringe";
import User from "../model/User";
import { UserRepositoryImpl } from "../repository/impl/UserRepositoryImpl";
import * as JWT from 'jsonwebtoken'

@injectable()
export class AuthenticationService {

  private useRepository: UserRepositoryImpl;
  private iss: String | undefined;
  private secret: JWT.Secret;

  constructor(@inject(UserRepositoryImpl) userRepository: UserRepositoryImpl) {
    this.useRepository = userRepository;
    this.iss = process.env.JWT_ISS;
    this.secret = process.env.JWT_SECRET || 'teste';
  }

  public Auth(email: string, password: string): Promise<string> {
    return this.useRepository.findUniqueByEmailAndPassword(email, password).then((user: User) => {
      return JWT.sign({ sub: user.id, exp: Date.now() + 3600000, iss: this.iss, iat: Date.now() }, this.secret);
    }).catch(() => {
      throw new Error("Authentication failure.");
    });
  }

  public validate(token: string): Promise<User> {
    return new Promise((resolve, reject) => {
      
      let options: JWT.VerifyOptions & { complete: true } = {
        complete: true
      };
      JWT.verify(token, this.secret, options, (err, jwt) => {
        if (err instanceof JWT.TokenExpiredError) {
          reject('The token has expired.');
        }
        if (err || jwt === undefined) reject("Illegal Token.");
        let sub = jwt?.payload.sub;
        if (typeof sub === 'function') {
          sub = sub();
        }
        if (sub === undefined) {
          reject("Sub is undefined.");
        } else {
          this.useRepository.findById(sub).then(resolve).catch(() => reject("Illegal Token."));
        }
      });
    });
  }

}