import { toast } from 'react-hot-toast';
import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import {
  combineReducers,
  configureStore,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseAPI } from './api';
import appReducer, { clearToken } from './reducers/app';
import userReducer, { logout } from './reducers/users';
import { PERSIST_KEY } from '@/utils/constants';
import routes from '@/utils/routes';

interface Payload {
  status?: number;
  data?: {
    error?: string;
  };
}

const rootReducer = combineReducers({
  [baseAPI.reducerPath]: baseAPI.reducer,
  userReducer,
  appReducer,
});

const persistConfig = {
  key: PERSIST_KEY,
  version: 1,
  storage,
  blacklist: [baseAPI.reducerPath, 'userReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const handle401Error = () => {
  if (typeof window !== 'undefined') {
    const isAlreadyOnLogin = window.location.pathname === routes.login.url;
    if (!isAlreadyOnLogin) {
      window.location.href = routes.login.url;
    }
  }
};

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: unknown) => {
    const typedAction = action as { payload?: Payload };

    if (typedAction?.payload?.status === 401) {
      api.dispatch(logout());
      api.dispatch(clearToken());
      handle401Error();

      toast.error(
        typedAction.payload?.data?.error || 'Sorry, something went wrong...',
        { id: 'global_error_msg' },
      );
      return next(action);
    } else {
      if (isRejectedWithValue(typedAction)) {
        const isNotAllowed = typedAction.payload?.data?.error?.includes(
          'you are not allowed to',
        );
        if (!isNotAllowed) {
          toast.error(
            typedAction.payload?.data?.error ||
              'Sorry, something went wrong...',
            { id: 'global_error_msg' },
          );
        }
      }
    }

    return next(action);
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(baseAPI.middleware, rtkQueryErrorLogger);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
