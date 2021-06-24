import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import Note from "models/Note";
import { INoteResponse, INoteForm } from "interfaces/note";

dbConnect();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<INoteResponse>
) => {
  const { id } = req.query;
  const formData: INoteForm = req.body;

  switch (req.method) {
    case "GET":
      try {
        const note = await Note.findById(id);

        if (!note) {
          res.status(404).json({
            message: "Note not found",
          });
          return;
        }

        res.status(200).json({
          note,
        });
      } catch (error) {
        res.status(400).json({
          message: error.message,
        });
      }
      break;

    case "PUT" || "PATCH":
      try {
        const note = await Note.findByIdAndUpdate(id, formData, {
          new: true,
          runValidators: true,
        });

        if (!note) {
          res.status(404).json({
            message: "Note not found",
          });
          return;
        }

        res.status(200).json({
          updatedNote: note,
        });
      } catch (error) {
        res.status(400).json({
          message: error.message,
        });
      }
      break;

    case "DELETE":
      try {
        const note = await Note.findByIdAndRemove(id);

        if (!note) {
          res.status(404).json({
            message: "Note not found",
          });
          return;
        }

        res.status(200).json({
          message: "Delete note success",
        });
      } catch (error) {
        res.status(400).json({
          message: error.message,
        });
      }
      break;

    default:
      res.status(400).json({
        message: "Invalid endpoint",
      });
      break;
  }
};
