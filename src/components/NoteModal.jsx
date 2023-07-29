import { useState } from "react";
import { actionTypes, styles } from "../utils/constants";
import { useVideos } from "../contexts/videosContext";
import { v4 as uuid } from "uuid";

export const NoteModal = ({
  currentVideo,
  note,
  setShowNoteModal,
  setShowNoteModalToUpdate,
}) => {
  const { dispatch } = useVideos();

  const [noteInput, setNoteInput] = useState(note ? note?.content : "");

  const { ADD_NOTE, UPDATE_NOTE } = actionTypes;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (note) {
      dispatch({
        type: UPDATE_NOTE,
        payload: {
          note: { ...note, content: noteInput },
          videoId: currentVideo?._id,
          noteId: note?._id,
        },
      });
    } else {
      dispatch({
        type: ADD_NOTE,
        payload: {
          note: { content: noteInput, _id: uuid() },
          videoId: currentVideo?._id,
        },
      });
    }
    setNoteInput("");
    setShowNoteModal && setShowNoteModal(false);
    setShowNoteModalToUpdate && setShowNoteModalToUpdate(false);
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
          required
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
