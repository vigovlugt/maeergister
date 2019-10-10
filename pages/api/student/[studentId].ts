import { NextApiRequest, NextApiResponse } from "next";
import {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} from "../../../services/studentService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      get(req, res);
      break;
    case "POST":
      post(req, res);
      break;
    case "PUT":
      put(req, res);
      break;
    case "DELETE":
      deleteMethod(req, res);
      break;
  }
};

const get = async (req, res) => {
  const { studentId } = req.query;
  const students = await getStudent(
    parseInt(typeof studentId == "string" ? studentId : studentId[0])
  );
  res.status(200).json({
    data: students
  });
};

const post = async (req, res) => {
  const student = JSON.parse(req.body);
  const success = await createStudent(student);
  res.json({ success });
};

const put = async (req, res) => {
  const student = JSON.parse(req.body);
  const success = await updateStudent(student);
  res.json({ success });
};

const deleteMethod = async (req, res) => {
  const id: number = parseInt(req.query.studentId);
  const success = await deleteStudent(id);
  res.json({ success });
};
