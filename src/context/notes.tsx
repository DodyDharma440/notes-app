import { createContext, useState, Dispatch, SetStateAction } from "react";
import { INote } from "interfaces/note";

type Props = {
  children: React.ReactNode;
};

type Context = {
  notes: INote[] | [];
  setNotes: Dispatch<SetStateAction<INote[]>>;
};

const initialContext: Context = {
  notes: [],
  setNotes: () => {},
};

export const NotesContext = createContext(initialContext);

export const NotesProvider: React.FC<Props> = ({ children }) => {
  const [notes, setNotes] = useState<INote[] | []>([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
