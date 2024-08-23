import { combineReducers } from 'redux';
import songReducer from './songReducer.ts';

// Define the Root State type based on the individual reducers
export interface RootState {
  songs: ReturnType<typeof songReducer>;
}

// Combine Reducers
const rootReducer = combineReducers({
  songs: songReducer,
});

export default rootReducer;
