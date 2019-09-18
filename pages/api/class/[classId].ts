import { NextApiRequest, NextApiResponse } from "next";
import { getClassInfo } from "../../../services/classService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { classId } = req.query;
  const students = await getClassInfo(
    parseInt(typeof classId == "string" ? classId : classId[0])
  );
  res.status(200).json({
    data: students
  });
};
