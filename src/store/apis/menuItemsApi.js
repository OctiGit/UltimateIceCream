import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const menuItemsApi = createApi({
  reducerPath: 'menuItems',
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchMenu: builder.query({
        async queryFn() {
          const { data } = await axios.get('/api/menu');
          data.sort((a, b) => {
            if (a.iceCream.name < b.iceCream.name) return -1;
            if (a.iceCream.name > b.iceCream.name) return 1;
            return 0;
          });
          return { data };
        },
        providesTags: (result, error, arg) => {
          const tags = result.map(menuItem => {
            return { type: 'MenuItem', id: menuItem.id.toString() };
          });
          return tags;
        },
      }),
      fetchMenuItem: builder.query({
        async queryFn(id) {
          try {
            const { data } = await axios.get(`/api/menu/${id.toString()}`);
            return { data };
          } catch (error) {
            return { error };
          }
        },
        providesTags: (result, error, id) => {
          return [{ type: 'MenuItem', id: id.toString() }];
        },
      }),
      postMenuItem: builder.mutation({
        async queryFn(menuItem) {
          try {
            const { data } = await axios.post('/api/menu', menuItem);
            return { data };
          } catch (error) {
            return { error };
          }
        },
        invalidatesTags: (results, error, menuItem) => {
          return [{ type: menuItem, id: menuItem.id.toString() }];
        },
      }),
      putMenuItem: builder.mutation({
        async queryFn(menuItem) {
          try {
            const { data } = await axios.put(
              `/api/menu/${menuItem.id.toString()}`,
              menuItem
            );
            return { data };
          } catch (error) {
            return { error };
          }
        },
        invalidatesTags: (result, error, menuItem) => {
          return [{ type: 'MenuItem', id: menuItem.id.toString() }];
        },
      }),
      deleteMenuItem: builder.mutation({
        async queryFn(id) {
          try {
            await axios.delete(`/api/menu/${id.toString()}`);
            return { data: 'Item deleted' };
          } catch (error) {
            return { error: 'error deleting item' };
          }
        },
        invalidatesTags: (result, error, id) => {
          return [{ type: 'MenuItem', id: id.toString() }];
        },
      }),
    };
  },
});

export const {
  useFetchMenuQuery,
  useFetchMenuItemQuery,
  usePostMenuItemMutation,
  usePutMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuItemsApi;
export { menuItemsApi };
