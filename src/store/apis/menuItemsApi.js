import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../Firebase/config';

const menuItemsApi = createApi({
  reducerPath: 'menuItems',
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchMenu: builder.query({
        async queryFn() {
          try {
            const querySnapshot = await getDocs(collection(db, 'menuData'));
            const menuData = querySnapshot.docs.map(doc => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            });
            menuData.sort((a, b) => {
              if (a.iceCream.name < b.iceCream.name) return -1;
              if (a.iceCream.name > b.iceCream.name) return 1;
              return 0;
            });
            return { data: menuData };
          } catch (error) {
            return { error };
          }
        },
        providesTags: ['MenuItems'],
      }),
      fetchMenuItem: builder.query({
        async queryFn(id) {
          try {
            const querySnapshot = await getDocs(collection(db, 'menuData'));
            const menuData = querySnapshot.docs.map(doc => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            });

            const menuItem = menuData.find(item => item.id === id);

            return { data: menuItem };
          } catch (error) {
            return { error };
          }
        },
        providesTags: ['MenuItems'],
      }),
      postMenuItem: builder.mutation({
        async queryFn(menuItem) {
          try {
            const iceCreamsQuerySnapshot = await getDocs(
              collection(db, 'iceCreams')
            );
            const iceCreams = iceCreamsQuerySnapshot.docs.map(doc =>
              doc.data()
            );

            const { iceCream, ...rest } = menuItem;
            const newMenuItem = {
              iceCream: {
                ...iceCreams.find(
                  item => item.id === parseInt(iceCream.id, 10)
                ),
              },
              ...rest,
            };

            await addDoc(collection(db, 'menuData'), newMenuItem);

            return { data: newMenuItem };
          } catch (error) {
            return { error };
          }
        },
        invalidatesTags: ['MenuItems'],
      }),
      putMenuItem: builder.mutation({
        async queryFn(updatedItem) {
          try {
            const iceCreamsQuerySnapshot = await getDocs(
              collection(db, 'iceCreams')
            );
            const iceCreams = iceCreamsQuerySnapshot.docs.map(doc =>
              doc.data()
            );
            const { iceCream, ...rest } = updatedItem;
            const newUpdatedItem = {
              id: updatedItem.id,
              iceCream: {
                ...iceCreams.find(
                  item => item.id === parseInt(iceCream.id, 10)
                ),
              },
              ...rest,
            };

            await updateDoc(
              doc(db, 'menuData', newUpdatedItem.id),
              newUpdatedItem
            );

            return { data: newUpdatedItem };
          } catch (error) {
            return { error };
          }
        },
        invalidatesTags: ['MenuItems'],
      }),
      deleteMenuItem: builder.mutation({
        async queryFn(id) {
          try {
            await deleteDoc(doc(db, 'menuData', id));

            return { data: 'Item deleted' };
          } catch (error) {
            return { error: 'error deleting item' };
          }
        },
        invalidatesTags: ['MenuItems'],
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
