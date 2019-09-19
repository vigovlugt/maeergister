import getConnection from "../lib/database";
import { RowDataPacket, OkPacket } from "mysql";
import IClass from "../models/IClass";

export async function getClasses() {
  const con = await getConnection();
  const [results] = await con.query<RowDataPacket[]>(
    "select *, (select count(*) from Students where ClassId = Classes.Id) as 'Students' from Classes"
  );
  return results;
}

export async function getClass(id:number):Promise<IClass> {
    const con = await getConnection();
  const [results] = await con.query<RowDataPacket[]>(
    "select * from Classes where Id = ?",
    [id]
  );

const classObj:IClass = {
    Id: results[0].Id,
    Name: results[0].Name
}

  return classObj;
}

export async function getClassInfo(id: number) {
  const con = await getConnection();
  const [results] = await con.query<RowDataPacket[][]>(
    "select * from Classes where Id = ?; select * from Students where ClassId = ?",
    [id, id]
  );
  return { class: results[0][0], students: results[1] };
}

export async function createClass(name: string) {
  const con = await getConnection();
  const classObj = { Name: name };
  const [insertResult] = await con.query<OkPacket>(
    "insert into Classes set ?",
    classObj
  );
  const [results] = await con.query<RowDataPacket[]>(
    "select *, 0 as 'Students' from Classes where Id = ?",
    [insertResult.insertId]
  );
  return results[0];
}

export async function deleteClass(id: number) {
  const con = await getConnection();
  await con.query("delete from Classes where Id = ?", [id]);
  return;
}
