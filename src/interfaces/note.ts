import { Document } from "mongoose";

export interface INoteModel extends Document {
  title: string;
  description: string;
}

export interface INote {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface INoteForm {
  title: string;
  description: string;
}

export interface INoteResponse {
  notes?: INote[];
  note?: INote;
  message?: string;
  newNote?: INote;
  updatedNote?: INote;
}
