import React, { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { getNotes, getNote } from "api/index";
import { INote } from "interfaces/note";
import { IconButton, Modal } from "components/index";
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
      router.replace("/");
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
      <Head>
        <title>Note | {title}</title>
      </Head>

      <div className="mb-4">
        <h4 className="font-bold text-2xl">{title}</h4>
        <hr className="my-2" />
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex justify-end">
        <IconButton
          icon={<HiOutlinePencilAlt />}
          background="green-500"
          iconColor="gray-100"
          iconSize="xl"
          className="mr-2"
          onClick={() => router.push(`/edit/${_id}`)}
        />
        <IconButton
          icon={<HiOutlineTrash />}
          onClick={onOpen}
          background="red-500"
          iconColor="gray-100"
          iconSize="xl"
        />
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
