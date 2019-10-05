import getConnection from "../lib/database";
import IStudent from "../models/Student";
import { RowDataPacket, OkPacket } from "mysql2/promise";
import { getClass } from "./classService";

export async function getStudents() {
  const con = await getConnection();
  const [results] = await con.query<RowDataPacket[]>(
    `select * from Students`,
    []
  );
  return results.map(result => ({
    Id: result.Id,
    Name: result.Name,
    DateOfBirth: new Date(result.DateOfBirth)
  }));
}

export async function getStudent(id: number): Promise<any> {
  const con = await getConnection();
  const [results] = await con.query<RowDataPacket[]>(
    `select * from Students where Id = ?;`,
    [id]
  );
  const result = results[0];
  console.log(results);
  const student: IStudent = {
    Id: result.Id,
    Name: result.Name,
    Class: await getClass(parseInt(result.ClassId)),
    DateOfBirth: new Date(result.DateOfBirth)
  };

  return student;
}

export async function deleteStudent(id: number) {
  const con = await getConnection();
  const [packet] = await con.query<OkPacket>(
    "delete from Students where Id = ?;",
    []
  );
  return packet.affectedRows > 0;
}

export async function createStudent(student: IStudent) {
  const con = await getConnection();
  const [packet] = await con.query<OkPacket>(
    "insert into Students (Name,Class,DateOfBirth) VALUES (?,?,?)",
    [student.Name, student.Class, student.DateOfBirth]
  );
  return packet.affectedRows > 0;
}

export async function updateStudent(student: IStudent) {
  const con = await getConnection();
  const [packet] = await con.query<OkPacket>(
    "update Students set Name=?, Class=?, DateOfBirth=?",
    [student.Name, student.Class, student.DateOfBirth]
  );
  return packet.affectedRows > 0;
}
