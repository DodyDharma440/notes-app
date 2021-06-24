import mongoose from "mongoose";
import { INoteModel } from "interfaces/note";

const noteSchema: mongoose.Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
      trim: true,
      maxLength: [40, "Title can't be more than 40 characters"],
    },
    description: {
      type: String,
      required: true,
      maxLength: [1000, "Description can't be more than 1000 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Note ||
  mongoose.model<INoteModel>("Note", noteSchema);
