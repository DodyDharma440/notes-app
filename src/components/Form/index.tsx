import React, { useState, useEffect } from "react";
import { INoteForm } from "interfaces/note";

type Props = {
  onSubmit: (formData: INoteForm, id?: string) => void;
  editValue?: INoteForm;
  editId?: string;
  loading?: boolean;
};

type FormWrapperProps = {
  children: React.ReactNode;
};

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => (
  <div className="flex flex-col mb-4">{children}</div>
);

const Form: React.FC<Props> = ({ onSubmit, editValue, editId }) => {
  const [inputValue, setInputValue] = useState<INoteForm>({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) {
      onSubmit(inputValue, editId);
      return;
    }

    onSubmit(inputValue);
  };

  useEffect(() => {
    setInputValue({
      title: "",
      description: "",
    });

    if (editValue) {
      setInputValue(editValue);
    }
  }, [editValue, editId]);

  const inputFieldClass =
    "shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2";

  return (
    <form onSubmit={handleSubmit}>
      <FormWrapper>
        <label className="mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={inputValue.title}
          onChange={handleChange}
          autoComplete="off"
          className={inputFieldClass}
        />
      </FormWrapper>
      <FormWrapper>
        <label className="mb-1">Description</label>
        <textarea
          value={inputValue.description}
          name="description"
          onChange={handleChange}
          className={inputFieldClass}
          style={{ minHeight: 200 }}
        />
      </FormWrapper>
      <button
        type="submit"
        className="bg-blue-500 rounded-md px-4 py-2 focus:outline-none hover:bg-blue-600"
      >
        {editValue ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default Form;
