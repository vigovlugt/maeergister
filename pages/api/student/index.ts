import { NextApiRequest, NextApiResponse } from "next";
import getConnection from "../../../lib/database";
import { getStudents } from "../../../services/studentService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const students = await getStudents();
  res.json({ data: { students } });
};
