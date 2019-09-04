import AccountType from "./AccountType";

export default interface IAccessToken {
  accountType: AccountType;
  id: number;
  externalId: string;
}
