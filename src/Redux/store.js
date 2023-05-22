import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  applyMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import UserReducer from './slices/userSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [],
};
const rootReducer = combineReducers({
  user: UserReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

// TODO: [HOM-201] Remove Redux Logger in production

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //  .concat(logger),
});

export const persistor = persistStore(store);

export default store;
