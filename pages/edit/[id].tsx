import React, { useState, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { INote, INoteForm } from "interfaces/note";
import { getNotes, getNote } from "api/index";
import { NotesContext } from "context/notes";
import { Form } from "components/index";
import { updateNote } from "api/index";

type Props = {
  note: INote;
};

const Edit: React.FC<Props> = ({ note }) => {
  const router = useRouter();
  const { notes, setNotes } = useContext(NotesContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateNote = async (
    editValue: INoteForm,
    id: string | undefined
  ) => {
    setLoading(true);

    try {
      if (id) {
        const { data } = await updateNote(editValue, id);

        const index = notes.findIndex((note: INote) => note._id === id);
        if (data.updatedNote) {
          notes[index] = data.updatedNote;
          setNotes(notes);
          setLoading(false);
          router.push("/");
        }
      }
      return;
    } catch (error) {
      setLoading(false);

      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Edit Note | {note.title}</title>
      </Head>

      <div>
        <h5 className="text-xl font-semibold">Edit Note</h5>
        <hr className="mb-4 mt-2" />
        {errorMessage !== "" && (
          <div className="bg-red-200 rounded-md p-4 border border-red-600 mb-4 text-red-800">
            <p className="text-lg font-semibold">Error</p>
            <p>{errorMessage}</p>
          </div>
        )}
        <Form
          onSubmit={handleUpdateNote}
          editValue={{
            title: note.title,
            description: note.description,
          }}
          editId={note._id}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Edit;

export const getStaticPaths = async () => {
  const { data } = await getNotes();

  const paths = data?.notes?.map((note: INote) => {
    return {
      params: {
        id: note._id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await getNote(params && params.id);

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      note: data.note,
    },
  };
};
