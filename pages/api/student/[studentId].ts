import { NextApiRequest, NextApiResponse } from "next";
import { getStudent } from "../../../services/studentService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { studentId } = req.query;
  const students = await getStudent(
    parseInt(typeof studentId == "string" ? studentId : studentId[0])
  );
  res.status(200).json({
    data: students
  });
};
