import { all } from 'redux-saga/effects';
import songSagas from './songSagas.ts'; // Adjust the import path if necessary

export default function* rootSaga() {
  yield all([
    songSagas(), // Ensure songSagas is properly typed and exported
  ]);
}
