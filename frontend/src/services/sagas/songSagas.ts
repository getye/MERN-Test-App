import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_SONGS_REQUEST, FETCH_SONGS_SUCCESS, FETCH_SONGS_FAILURE,
  ADD_SONG_REQUEST, ADD_SONG_SUCCESS, ADD_SONG_FAILURE,
  UPDATE_SONG_REQUEST, UPDATE_SONG_SUCCESS, UPDATE_SONG_FAILURE,
  DELETE_SONG_REQUEST, DELETE_SONG_SUCCESS, DELETE_SONG_FAILURE,
  SEARCH_SONGS, searchSongsSuccess
} from '../songActions.ts';
import { toast } from 'react-toastify';
import { RootState } from '../reducers/index.ts'; 



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
  payload: string; // song id
}

interface SearchSongsAction {
  type: typeof SEARCH_SONGS;
  payload: string; // search term
}


// Define the Song type
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

// Worker saga: will be fired on SEARCH_SONGS action
function* handleSearchSongs(action: SearchSongsAction) {
  try {
    const state: RootState = yield select(); // Get the current state
    const { songs } = state.songs; // Access the songs array
    const searchTerm = action.payload.toLowerCase();

    const filteredSongs = songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm) ||
      song.artist.toLowerCase().includes(searchTerm) ||
      song.album.toLowerCase().includes(searchTerm) ||
      song.genre.toLowerCase().includes(searchTerm)
    );

    yield put(searchSongsSuccess(filteredSongs)); // Dispatch the success action
  } catch (error) {
    console.error("Error searching songs:", error);
    // Handle error if needed
  }
}

function* fetchSongs() {
  try {
    const response: { data: Song[] } = yield call(axios.get, 'http://localhost:5000/viewsongs');
    yield put({ type: FETCH_SONGS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_SONGS_FAILURE, payload: error.message });
  }
}

function* addSong(action: AddSongRequestAction) {
  try {
    const response: { data: Song } = yield call(axios.post, 'http://localhost:5000/addsong', action.payload);
    yield put({ type: ADD_SONG_SUCCESS, payload: response.data });
    toast.success('Song added successfully!');
  } catch (error) {
    yield put({ type: ADD_SONG_FAILURE, payload: error.message });
    toast.error(error.message);
  }
}

function* updateSong(action: UpdateSongRequestAction) {
  try {
    const { id, song } = action.payload;
    const response: { data: Song } = yield call(axios.put, `http://localhost:5000/updatesong/${id}`, song);
    yield put({ type: UPDATE_SONG_SUCCESS, payload: response.data });
    toast.success('Song updated successfully!');
  } catch (error) {
    yield put({ type: UPDATE_SONG_FAILURE, payload: error.message });
  }
}

function* deleteSong(action: DeleteSongRequestAction) {
  try {
    yield call(axios.delete, `http://localhost:5000/songs/${action.payload}`);
    yield put({ type: DELETE_SONG_SUCCESS, payload: action.payload });
    toast.success('Song deleted successfully!');
  } catch (error) {
    yield put({ type: DELETE_SONG_FAILURE, payload: error.message });
  }
}

export default function* songSagas() {
  yield takeEvery(FETCH_SONGS_REQUEST, fetchSongs);
  yield takeEvery(ADD_SONG_REQUEST, addSong);
  yield takeEvery(UPDATE_SONG_REQUEST, updateSong);
  yield takeEvery(DELETE_SONG_REQUEST, deleteSong);
  yield takeLatest(SEARCH_SONGS, handleSearchSongs);
}
