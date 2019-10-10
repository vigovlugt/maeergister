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
    DateOfBirth: new Date(result.DateOfBirth),
    ...result
  }));
}

/*
 type Student {
    Id: ID
    Name: String
    DateOfBirth: Date
    Adress: String
    City: String
    Grade1: Float
    Grade2: Float
    Grade3: Float
    Grade4: Float
    Class: Class
  }
*/

export async function getStudent(id: number): Promise<any> {
  const con = await getConnection();
  const [results] = await con.query<RowDataPacket[]>(
    `select * from Students where Id = ?;`,
    [id]
  );
  const result = results[0];

  const student = {
    Class: await getClass(parseInt(result.ClassId)),
    DateOfBirth: new Date(result.DateOfBirth),
    ...result
  };

  return student;
}

export async function getStudentsByClass(id: number) {
  const con = await getConnection();
  const [results] = await con.query<RowDataPacket[]>(
    `select * from Students where ClassId = ?;`,
    [id]
  );

  const students = results.map(result => ({
    DateOfBirth: new Date(result.DateOfBirth),
    ...result
  }));

  return students;
}

export async function deleteStudent(id: number) {
  const con = await getConnection();
  const [packet] = await con.query<OkPacket>(
    "delete from Students where Id = ?;",
    [id]
  );
  return packet.affectedRows > 0;
}

export async function createStudent(student: IStudent) {
  const con = await getConnection();
  const [packet] = await con.query<OkPacket>(
    "insert into Students (Name,ClassId,DateOfBirth,Adress,City,Grade1,Grade2,Grade3,Grade4) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      student.Name,
      student.ClassId,
      student.DateOfBirth,
      student.Adress,
      student.City,
      student.Grade1,
      student.Grade2,
      student.Grade3,
      student.Grade4
    ]
  );
  return packet.affectedRows > 0;
}

export async function updateStudent(student: IStudent) {
  const con = await getConnection();
  const [packet] = await con.query<OkPacket>(
    "update Students set Name=?, DateOfBirth=?, Adress=?, City=?, Grade1=?, Grade2=?, Grade3=?, Grade4=? where Id=?",
    [
      student.Name,
      student.DateOfBirth,
      student.Adress,
      student.City,
      student.Grade1,
      student.Grade2,
      student.Grade3,
      student.Grade4,
      student.Id
    ]
  );
  return packet.affectedRows > 0;
}
