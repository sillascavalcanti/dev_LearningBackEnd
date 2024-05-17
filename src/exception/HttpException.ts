type ConstHttpException = { message: (msg: string | { [key: string]: string[] }) => HttpException };

export class HttpException extends Error {

  readonly status: number;
  readonly _message: string | { [key: string]: string[] };
  readonly timestamp: Date;

  private constructor(status: number, message: string | { [key: string]: string[] }) {
    super();
    this.status = status;
    this._message = message;
    this.timestamp = new Date();
  }

  static readonly UNAUTHORIZED: ConstHttpException = { message: (msg: string | { [key: string]: string[] }) => new HttpException(401, msg) };

  static readonly CONFLICT: ConstHttpException = { message: (msg: string | { [key: string]: string[] }) => new HttpException(409, msg) };

  static readonly NOT_FOUND: ConstHttpException = { message: (msg: string | { [key: string]: string[] }) => new HttpException(404, msg) };

  static readonly INTERNAL: ConstHttpException = { message: (msg: string | { [key: string]: string[] }) => new HttpException(500, msg) };

  static readonly BAD_REQUEST: ConstHttpException = { message: (msg: string | { [key: string]: string[] }) => new HttpException(400, msg) };

}