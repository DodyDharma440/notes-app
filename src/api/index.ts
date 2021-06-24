import axios, { AxiosResponse } from "axios";
import { INoteForm, INoteResponse } from "interfaces/note";

const apiNotes = axios.create({
  baseURL: "https://notes-app-wine-ten.vercel.app/api",
});

export const getNotes = (): Promise<AxiosResponse<INoteResponse>> => {
  return apiNotes.get("/notes");
};

export const addNote = (
  formData: INoteForm
): Promise<AxiosResponse<INoteResponse>> => {
  return apiNotes.post("/notes", formData);
};

export const getNote = (
  id: string | undefined | string[]
): Promise<AxiosResponse<INoteResponse>> => {
  return apiNotes.get(`/note/${id}`);
};

export const deleteNote = (
  id: string
): Promise<AxiosResponse<INoteResponse>> => {
  return apiNotes.delete(`/note/${id}`);
};

export const updateNote = (
  formData: INoteForm,
  id: string
): Promise<AxiosResponse<INoteResponse>> => {
  return apiNotes.put(`/note/${id}`, formData);
};
