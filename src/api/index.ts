import axios, { AxiosResponse } from "axios";
import { INoteForm, INoteResponse } from "interfaces/note";

const apiBaseUrl = "https://notes-app-dody.vercel.app/api";

export const getNotes = (): Promise<AxiosResponse<INoteResponse>> => {
  return axios.get(`${apiBaseUrl}/notes`);
};

export const addNote = (
  formData: INoteForm
): Promise<AxiosResponse<INoteResponse>> => {
  return axios.post(`${apiBaseUrl}/notes`, formData);
};

export const getNote = (
  id: string | undefined | string[]
): Promise<AxiosResponse<INoteResponse>> => {
  return axios.get(`${apiBaseUrl}/note/${id}`);
};

export const deleteNote = (
  id: string
): Promise<AxiosResponse<INoteResponse>> => {
  return axios.delete(`${apiBaseUrl}/note/${id}`);
};

export const updateNote = (
  formData: INoteForm,
  id: string
): Promise<AxiosResponse<INoteResponse>> => {
  return axios.put(`${apiBaseUrl}/note/${id}`, formData);
};
