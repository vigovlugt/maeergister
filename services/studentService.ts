import getConnection from "../lib/database";
import IStudent from "../models/Student";
import { RowDataPacket } from "mysql2/promise";
import { getClass } from "./classService";

export async function getStudent(id:number):Promise<any>{
  const con = await getConnection();
  const [results] = await con.query<RowDataPacket[]>(
    `select * from Students where Id = ?;`,
    [id]
  );
  const result = results[0];
  console.log(results);
  const student:IStudent = {
      Id: result.Id,
      Name: result.Name,
      Class:await getClass(parseInt(result.ClassId)),
      DateOfBirth: new Date(result.DateOfBirth)
  }


  return student;
}