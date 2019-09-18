import { NextApiRequest, NextApiResponse } from "next";
import {
  getClasses,
  createClass,
  deleteClass
} from "../../services/classService";

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

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const classes = await getClasses();
  res.status(200).json({
    data: classes
  });
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = JSON.parse(req.body);
  const classObj = await createClass(name);

  res.status(200).json(classObj);
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = JSON.parse(req.body);
    await deleteClass(id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).json({ error });
  }
};
