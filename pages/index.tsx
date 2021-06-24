import React, { useEffect, useContext } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { getNotes } from "api/index";
import { INote } from "interfaces/note";
import { NotesContext } from "context/notes";
import { Notes } from "components/index";

// type Props = {
//   notesProps: INote[];
// };

const Home = () => {
  const { setNotes } = useContext(NotesContext);

  useEffect(() => {
    setNotes([]);
  }, []);

  return (
    <>
      <Head>
        <title>Notes App</title>
      </Head>
      <Notes />
    </>
  );
};

export default Home;

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await getNotes();

//   return {
//     props: {
//       notesProps: res.data.notes,
//     },
//   };
// };
