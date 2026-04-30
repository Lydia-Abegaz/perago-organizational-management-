import { configureStore } from '@reduxjs/toolkit';
import positionReducer from './positionSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    positions: positionReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
