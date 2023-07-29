import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useVideos } from "../contexts/videosContext";
import {
  NoteModal,
  PlaylistModal,
  SideBar,
  SuggestedVideos,
} from "../components";
import {
  MdOutlineAutoDelete,
  MdOutlineWatchLater,
  MdOutlinePlaylistAdd,
  MdOutlineEditNote,
} from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { actionTypes } from "../utils/constants";
import { useState } from "react";
import { Modal } from "@mui/material";

export const SingleVideo = () => {
  const { videoId } = useParams();
  const {
    state: { videos },
    dispatch,
    isPresentInWatchLater,
  } = useVideos();

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showNoteModalToUpdate, setShowNoteModalToUpdate] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const { ADD_TO_WATCH_LATER, REMOVE_FROM_WATCH_LATER, DELETE_NOTE } =
    actionTypes;

  const currentVideo = videos?.find((video) => video?._id === +videoId);

  return (
    <div>
      <div className="grid grid-cols-[12.5rem_1fr]">
        <SideBar />
        <div className="py-1 px-4 grid grid-cols-[1fr_23rem] gap-2">
          <div className="py-3">
            <div>
              <iframe
                src={currentVideo?.src}
                title={currentVideo?.title}
                className="w-full h-[400px]"
              ></iframe>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-bgSecondary">
              <div className="flex items-center justify-center gap-2">
                <img
                  src="https://picsum.photos/40/40"
                  alt="creator"
                  className="h-12 w-12 rounded-full"
                />
                <p className="font-semibold">{currentVideo?.title}</p>
              </div>
              <div className="flex items-center gap-4">
                {isPresentInWatchLater(currentVideo) ? (
                  <span
                    onClick={() => {
                      dispatch({
                        type: REMOVE_FROM_WATCH_LATER,
                        payload: currentVideo,
                      });
                      toast.success("Video removed from watch later.");
                    }}
                  >
                    <MdOutlineAutoDelete
                      className="text-2xl cursor-pointer"
                      title="Remove from Watch Later"
                    />
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      dispatch({
                        type: ADD_TO_WATCH_LATER,
                        payload: currentVideo,
                      });
                      toast.success("Video added to watch later.");
                    }}
                  >
                    <MdOutlineWatchLater
                      className="text-2xl cursor-pointer"
                      title="Add to Watch Later"
                    />
                  </span>
                )}
                <span onClick={() => setShowPlaylistModal(true)}>
                  <MdOutlinePlaylistAdd
                    className="text-2xl cursor-pointer"
                    title="Add to Playlist"
                  />
                </span>
                <span onClick={() => setShowNoteModal(true)}>
                  <MdOutlineEditNote
                    className="text-2xl cursor-pointer"
                    title="Add a note"
                  />
                </span>
              </div>
            </div>
            <div className="py-2">
              <p className="text-2xl">My Notes</p>
              <div className="flex flex-col items-start justify-center gap-2 py-4">
                {currentVideo?.notes?.length > 0 &&
                  currentVideo?.notes?.map((note) => (
                    <div
                      key={note?._id}
                      className="flex items-center justify-start gap-12"
                    >
                      <p>{note?.content}</p>
                      <div className="flex items-center justify-center gap-4">
                        <span onClick={() => setShowNoteModalToUpdate(true)}>
                          <HiPencil
                            className="text-2xl cursor-pointer"
                            title="Update note"
                          />
                        </span>
                        {showNoteModalToUpdate && (
                          <Modal
                            open={showNoteModalToUpdate}
                            onClose={() => setShowNoteModalToUpdate(false)}
                          >
                            <>
                              <NoteModal
                                setShowNoteModalToUpdate={
                                  setShowNoteModalToUpdate
                                }
                                note={note}
                              />
                            </>
                          </Modal>
                        )}
                        <span
                          onClick={() =>
                            dispatch({
                              type: DELETE_NOTE,
                              payload: { note, currentVideo },
                            })
                          }
                        >
                          <BiSolidTrashAlt
                            className="text-2xl cursor-pointer"
                            title="Delete note"
                          />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <SuggestedVideos currentVideo={currentVideo} />
        </div>
      </div>

      {showNoteModal && (
        <Modal open={showNoteModal} onClose={() => setShowNoteModal(false)}>
          <>
            <NoteModal
              currentVideo={currentVideo}
              setShowNoteModal={setShowNoteModal}
            />
          </>
        </Modal>
      )}
      {showPlaylistModal && (
        <Modal
          open={showPlaylistModal}
          onClose={() => setShowPlaylistModal(false)}
        >
          <>
            <PlaylistModal
              currentVideo={currentVideo}
              setShowPlaylistModal={setShowPlaylistModal}
            />
          </>
        </Modal>
      )}
    </div>
  );
};
