import React, { useContext } from "react";
import { useRouter } from "next/router";
import { INote } from "interfaces/note";
import { IconButton, Modal } from "components/index";
import { HiOutlinePencilAlt, HiOutlineTrash, HiEye } from "react-icons/hi";
import { CgDanger } from "react-icons/cg";
import { useDisclosure } from "hooks/useDisclosure";
import { NotesContext } from "context/notes";
import { deleteNote } from "api/index";

type Props = {
  note: INote;
};

const Note: React.FC<Props> = ({ note }) => {
  const router = useRouter();
  const { title, description, _id } = note;
  const { notes, setNotes } = useContext(NotesContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    try {
      await deleteNote(_id);
      const filteredNotes = notes.filter((note) => note._id !== _id);
      setNotes(filteredNotes);
      document.body.style.overflow = "unset";
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg mb-2">
        <div className="p-4">
          <p className="font-bold text-lg">{title}</p>
          <p className="text-gray-400 truncate line-clamp-3 whitespace-normal">
            {description}
          </p>
        </div>
        <hr />
        <div className="p-4 flex justify-end">
          <div className="flex-1 flex">
            <IconButton
              icon={<HiEye />}
              background="blue-500"
              iconColor="gray-100"
              iconSize="2xl"
              onClick={() => router.push(`/note/${_id}`)}
            />
          </div>
          <div className="flex">
            <IconButton
              icon={<HiOutlinePencilAlt />}
              background="green-500"
              iconColor="gray-100"
              iconSize="2xl"
              className="ml-2"
              onClick={() => router.push(`/edit/${_id}`)}
            />
            <IconButton
              icon={<HiOutlineTrash />}
              onClick={onOpen}
              background="red-500"
              iconColor="gray-100"
              iconSize="2xl"
              className="ml-2"
            />
          </div>
        </div>
      </div>
      <Modal
        title="Delete Note"
        open={isOpen}
        onClose={onClose}
        doneButtonAction={handleDelete}
        doneButtonText="Delete"
        renderModalContent={() => (
          <div className="flex flex-col items-center py-2">
            <span className="text-red-400 text-8xl mb-4">
              <CgDanger />
            </span>
            <p>
              Are you sure to delete{" "}
              <span className="font-semibold text-red-500">{title}</span>?
            </p>
          </div>
        )}
      />
    </>
  );
};

export default Note;
