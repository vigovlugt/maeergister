import getConnection from "../lib/database";
import { RowDataPacket, OkPacket } from "mysql";

export async function getAbsences() {
  const con = await getConnection();
  const [results] = await con.query<RowDataPacket[]>(`
        select Absences.Id as AbsenceId, Date, Class, Reason, Type,
        Name as StudentName
        from Absences
        left join Students on Absences.StudentId = Students.Id
    `);
  return results;
}

export async function createAbsence(absence: {
  className: any;
  reason: any;
  type: any;
  studentId: any;
}) {
  const { className, reason, type, studentId } = absence;
  const con = await getConnection();
  const [result] = await con.query<OkPacket>(
    `
    insert into Absences (Class,Reason,Type,StudentId,Date)
    values (?,?,?,?,NOW())
    `,
    [className, reason, type, studentId]
  );
  return result;
}

export async function deleteAbsence(id) {
  const con = await getConnection();
  const [result] = await con.query<OkPacket>(
    "delete from Absences where Id = ?",
    [id]
  );
  return result;
}
