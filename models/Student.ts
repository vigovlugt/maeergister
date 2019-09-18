import IClass from "./IClass";

export default interface IStudent {
  Id: number;
  Name: string;
  Class: IClass;
  DateOfBirth: Date;
}

export const DefaultStudent: IStudent = {
  Id: -1,
  Name: "",
  Class: null,
  DateOfBirth: null
};
