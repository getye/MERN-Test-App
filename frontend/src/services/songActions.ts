// Action Types
export const FETCH_SONGS_REQUEST = 'FETCH_SONGS_REQUEST';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';

export const ADD_SONG_REQUEST = 'ADD_SONG_REQUEST';
export const ADD_SONG_SUCCESS = 'ADD_SONG_SUCCESS';
export const ADD_SONG_FAILURE = 'ADD_SONG_FAILURE';

export const UPDATE_SONG_REQUEST = 'UPDATE_SONG_REQUEST';
export const UPDATE_SONG_SUCCESS = 'UPDATE_SONG_SUCCESS';
export const UPDATE_SONG_FAILURE = 'UPDATE_SONG_FAILURE';

export const DELETE_SONG_REQUEST = 'DELETE_SONG_REQUEST';
export const DELETE_SONG_SUCCESS = 'DELETE_SONG_SUCCESS';
export const DELETE_SONG_FAILURE = 'DELETE_SONG_FAILURE';

export const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD';

export const SEARCH_SONGS = 'SEARCH_SONGS';
export const SEARCH_SONGS_SUCCESS = 'SEARCH_SONGS_SUCCESS';

// Action Interfaces
interface FetchSongsRequestAction {
  type: typeof FETCH_SONGS_REQUEST;
}

interface AddSongRequestAction {
  type: typeof ADD_SONG_REQUEST;
  payload: Song;
}

interface UpdateSongRequestAction {
  type: typeof UPDATE_SONG_REQUEST;
  payload: { id: string; song: Song };
}

interface DeleteSongRequestAction {
  type: typeof DELETE_SONG_REQUEST;
  payload: string;
}

interface UpdateFormFieldAction {
  type: typeof UPDATE_FORM_FIELD;
  payload: { name: string; value: string };
}

interface SearchSongsAction {
  type: typeof SEARCH_SONGS;
  payload: string;
}

interface SearchSongsSuccessAction {
  type: typeof SEARCH_SONGS_SUCCESS;
  payload: Song[];
}

// Combine all Action Types
export type SongActionTypes =
  | FetchSongsRequestAction
  | AddSongRequestAction
  | UpdateSongRequestAction
  | DeleteSongRequestAction
  | UpdateFormFieldAction
  | SearchSongsAction
  | SearchSongsSuccessAction;

// Action Creators
export const searchSongs = (searchTerm: string): SearchSongsAction => ({
  type: SEARCH_SONGS,
  payload: searchTerm,
});

export const searchSongsSuccess = (filteredSongs: Song[]): SearchSongsSuccessAction => ({
  type: SEARCH_SONGS_SUCCESS,
  payload: filteredSongs,
});

export const fetchSongs = (): FetchSongsRequestAction => ({
  type: FETCH_SONGS_REQUEST,
});

export const addSong = (song: Song): AddSongRequestAction => ({
  type: ADD_SONG_REQUEST,
  payload: song,
});

export const updateSong = (id: string, song: Song): UpdateSongRequestAction => ({
  type: UPDATE_SONG_REQUEST,
  payload: { id, song },
});

export const deleteSong = (id: string): DeleteSongRequestAction => ({
  type: DELETE_SONG_REQUEST,
  payload: id,
});

export const updateFormField = (name: string, value: string): UpdateFormFieldAction => ({
  type: UPDATE_FORM_FIELD,
  payload: { name, value },
});

// Define the Song type (you might need to adjust this based on your actual song structure)
interface Song {
  title: string;
  artist: string;
  album: string;
  genre: string;
}
