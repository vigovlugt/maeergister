import IClass from "./IClass";

export default interface IStudent {
  Id: number;
  Name: string;
  Class: IClass;
  DateOfBirth: Date;
  Adress: string;
  City: string;
  Grade1: string;
  Grade2: string;
  Grade3: string;
  Grade4: string;
  ClassId: number;
}

export const DefaultStudent: IStudent = {
  Id: -1,
  Name: "",
  Class: null,
  DateOfBirth: null,
  Adress: "",
  City: "",
  Grade1: null,
  Grade2: null,
  Grade3: null,
  Grade4: null,
  ClassId: null
};
