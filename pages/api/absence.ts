import { NextApiRequest, NextApiResponse } from "next";
import getConnection, { getTable } from "../../lib/database";
import {
  getAbsences,
  createAbsence,
  deleteAbsence
} from "../../services/absenceService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      handleGet(req, res);
      break;
    case "POST":
      handlePost(req, res);
      break;
    case "DELETE":
      handleDelete(req, res);
      break;
  }
};

const handleGet = async (req, res) => {
  const absences = await getAbsences();
  res.send({
    data: absences
  });
};

const handlePost = async (req, res) => {
  const { className, reason, type, studentId } = JSON.parse(req.body);
  const result = await createAbsence({ className, reason, type, studentId });
  res.send({
    success: result.affectedRows > 0
  });
};

const handleDelete = async (req, res) => {
  const { id } = req.body;
  const result = await deleteAbsence(id);
  res.send({
    success: result.affectedRows > 0
  });
};
