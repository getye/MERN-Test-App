import { configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index.ts'; // Adjust the path as necessary
import rootSaga from './sagas/index.ts'; // Adjust the path as necessary

// Create a saga middleware instance
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk middleware if using redux-saga
    }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Define the types for the store's state and dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

// Export the store as default
export default store;
