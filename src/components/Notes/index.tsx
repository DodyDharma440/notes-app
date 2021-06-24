import React, { useContext } from "react";
import { useRouter } from "next/router";
import { NotesContext } from "context/notes";
import { Note } from "components/index";
import { ImFilesEmpty } from "react-icons/im";

const Notes = () => {
  const router = useRouter();
  const { notes } = useContext(NotesContext);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-semibold">Your Notes</h5>
        <button
          onClick={() => router.push("/add")}
          className="bg-blue-400 rounded-lg px-4 py-2 focus:outline-none hover:bg-blue-500"
        >
          Add New
        </button>
      </div>
      <hr className="mb-4 mt-2" />
      {notes.length === 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
          <span className="text-yellow-200 text-8xl mb-6">
            <ImFilesEmpty />
          </span>
          <h5 className="font-semibold text-3xl mb-2 text-gray-700">
            Whooops!
          </h5>
          <p className="text-center text-gray-500">
            Your notes is empty. Click add button in the top to add your first
            note!
          </p>
        </div>
      ) : (
        notes.map((note) => <Note key={note._id} note={note} />)
      )}
    </div>
  );
};

export default Notes;
