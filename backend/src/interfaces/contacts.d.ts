export interface IContactRequest {
  name: string;
  emails: string | string[];
  phones: string | string[];
}

export interface IContactUpdate extends Partial<IContactRequest> {}
