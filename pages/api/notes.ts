import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import Note from "models/Note";
import { INoteResponse, INoteForm } from "interfaces/note";

dbConnect();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<INoteResponse>
) => {
  const formData: INoteForm = req.body;

  switch (req.method) {
    case "GET":
      try {
        const notes = await Note.find();
        res.status(200).json({
          notes,
        });
      } catch (error) {
        res.status(400).json({
          message: error.message,
        });
      }
      break;

    case "POST":
      try {
        const note = await Note.create(formData);
        res.status(201).json({
          newNote: note,
        });
      } catch (error) {
        res.status(400).json({
          message: error.message,
        });
      }
      break;

    default:
      res.status(400).json({
        message: "Method not valid",
      });
      break;
  }
};
