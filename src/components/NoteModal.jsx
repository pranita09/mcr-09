import { useState } from "react";
import { actionTypes, styles } from "../utils/constants";
import { useVideos } from "../contexts/videosContext";

export const NoteModal = ({ note, setShowNoteModal }) => {
  const { dispatch } = useVideos();

  const [noteInput, setNoteInput] = useState(note ? note?.content : "");

  const { ADD_NOTE, UPDATE_NOTE } = actionTypes;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (note) {
      dispatch({
        type: UPDATE_NOTE,
        payload: { content: noteInput, _id: note?._id },
      });
    } else {
      dispatch({
        type: ADD_NOTE,
        payload: { content: noteInput, _id: new Date() },
      });
    }
    setNoteInput("");
    setShowNoteModal(false);
  };

  return (
    <div className="py-4 px-4 bg-[white]" style={styles}>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Write your note..."
          value={noteInput}
          className="border border-textSecondary  py-1 px-2 rounded"
          onChange={(e) => setNoteInput(e.target.value)}
        />
        <button
          type="submit"
          className="ml-3 py-1 px-3 bg-primaryColor rounded text-white hover:bg-primaryHover"
        >
          {note ? "Save" : "Add"}
        </button>
      </form>
    </div>
  );
};
