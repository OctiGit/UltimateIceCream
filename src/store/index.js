import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { iceCreamsApi } from './apis/iceCreamsApi';
import { menuItemsApi } from './apis/menuItemsApi';

export const store = configureStore({
  reducer: {
    [iceCreamsApi.reducerPath]: iceCreamsApi.reducer,
    [menuItemsApi.reducerPath]: menuItemsApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(iceCreamsApi.middleware)
      .concat(menuItemsApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchIceCreamsQuery,
  useFetchIceCreamQuery,
} from './apis/iceCreamsApi';
export {
  useFetchMenuQuery,
  useFetchMenuItemQuery,
  usePostMenuItemMutation,
  usePutMenuItemMutation,
  useDeleteMenuItemMutation,
} from './apis/menuItemsApi';
