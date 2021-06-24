import React, { useState, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { NotesContext } from "context/notes";
import { Form } from "components/index";
import { addNote } from "api/index";
import { INoteForm } from "interfaces/note";

const AddNote = () => {
  const router = useRouter();
  const { notes, setNotes } = useContext(NotesContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddNote = async (formData: INoteForm) => {
    setLoading(true);
    try {
      const { data } = await addNote(formData);
      if (data.newNote) {
        setNotes([...notes, data.newNote]);
      }
      router.push("/");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add Note</title>
      </Head>

      <div>
        <h5 className="text-xl font-semibold">Add New Note</h5>
        <hr className="mb-4 mt-2" />
        {errorMessage !== "" && (
          <div className="bg-red-200 rounded-md p-4 border border-red-600 mb-4 text-red-800">
            <p className="text-lg font-semibold">Error</p>
            <p>{errorMessage}</p>
          </div>
        )}
        <Form onSubmit={handleAddNote} loading={loading} />
      </div>
    </>
  );
};

export default AddNote;
