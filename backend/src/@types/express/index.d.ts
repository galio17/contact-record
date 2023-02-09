import { IReqUser } from "../../interfaces/others";

declare global {
  namespace Express {
    interface Request {
      validatedBody: any;
      user: IReqUser;
    }
  }
}

export {};
