import { categories, videos } from "../data/data";
import { actionTypes } from "../utils/constants";

const {
  ADD_TO_WATCH_LATER,
  REMOVE_FROM_WATCH_LATER,
  SET_SEARCH_INPUT,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_VIDEO_TO_PLAYLIST,
} = actionTypes;

export const initialState = {
  categories: categories,
  videos: videos,
  watchLaterVideos: [],
  searchInput: "",
  playlists: [],
};

export const reducerFunction = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_WATCH_LATER:
      return {
        ...state,
        watchLaterVideos: [payload, ...state.watchLaterVideos],
      };
    case REMOVE_FROM_WATCH_LATER:
      return {
        ...state,
        watchLaterVideos: state.watchLaterVideos.filter(
          (video) => video?._id !== payload?._id
        ),
      };
    case SET_SEARCH_INPUT:
      return { ...state, searchInput: payload };
    case CREATE_PLAYLIST:
      return { ...state, playlists: [...state.playlists, payload] };
    case DELETE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist?._id !== payload?._id
        ),
      };
    case ADD_VIDEO_TO_PLAYLIST:
      return {
        ...state,
        playlists: state?.playlists.map((item) =>
          item._id === payload.playlist
            ? [...item.videos, payload.currentVideo]
            : item
        ),
      };
    // case ADD_NOTE:
    //   return { ...state, videos: state?.videos.map((video) => video) };
    default:
      return state;
  }
};
