interface IReqUser {
  id: string;
  ownContactId: string;
}

declare global {
  namespace Express {
    interface Request {
      validatedBody?: any;
      user?: IReqUser;
    }
  }
}

export {};
