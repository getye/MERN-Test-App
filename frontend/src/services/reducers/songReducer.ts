import {
  FETCH_SONGS_SUCCESS,
  ADD_SONG_SUCCESS,
  UPDATE_SONG_SUCCESS,
  DELETE_SONG_SUCCESS,
  UPDATE_FORM_FIELD,
  SEARCH_SONGS_SUCCESS,
} from '../songActions.ts';

// Define the Song type
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

// Define the Action Types
interface FetchSongsSuccessAction {
  type: typeof FETCH_SONGS_SUCCESS;
  payload: Song[];
}

interface AddSongSuccessAction {
  type: typeof ADD_SONG_SUCCESS;
  payload: Song;
}

interface UpdateSongSuccessAction {
  type: typeof UPDATE_SONG_SUCCESS;
  payload: Song;
}

interface DeleteSongSuccessAction {
  type: typeof DELETE_SONG_SUCCESS;
  payload: string; // song id
}

interface UpdateFormFieldAction {
  type: typeof UPDATE_FORM_FIELD;
  payload: { name: string; value: string };
}

interface SearchSongsSuccessAction {
  type: typeof SEARCH_SONGS_SUCCESS;
  payload: Song[];
}

// Combine all Action Types
type SongActionTypes =
  | FetchSongsSuccessAction
  | AddSongSuccessAction
  | UpdateSongSuccessAction
  | DeleteSongSuccessAction
  | UpdateFormFieldAction
  | SearchSongsSuccessAction;

// Define the State Type
interface SongState {
  songs: Song[];
  latestSongAdded: Song | null;
  latestSongUpdated: Song | null;
  latestSongDeleted: Song | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  filteredSongs?: Song[];
}

// Define the Initial State
const initialState: SongState = {
  songs: [],
  latestSongAdded: null,
  latestSongUpdated: null,
  latestSongDeleted: null,
  loading: false,
  error: null,
  success: false,
};

// Reducer Function
const songReducer = (state = initialState, action: SongActionTypes): SongState => {
  switch (action.type) {
    case FETCH_SONGS_SUCCESS:
      return { ...state, songs: action.payload };
    case ADD_SONG_SUCCESS:
      return {
        ...state,
        songs: [...state.songs, action.payload],
        latestSongAdded: action.payload,
      };
    case UPDATE_SONG_SUCCESS:
      return {
        ...state,
        songs: state.songs.map((song) =>
          song._id === action.payload._id ? action.payload : song,
        ),
        latestSongUpdated: action.payload,
      };
    case DELETE_SONG_SUCCESS:
      const deletedSong = state.songs.find(song => song._id === action.payload);
      return {
        ...state,
        songs: state.songs.filter((song) => song._id !== action.payload),
        latestSongDeleted: deletedSong || null,
      };
    case UPDATE_FORM_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case SEARCH_SONGS_SUCCESS:
      return { ...state, filteredSongs: action.payload };
    default:
      return state;
  }
};

export default songReducer;
