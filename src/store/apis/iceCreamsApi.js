import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/config';

const iceCreamsApi = createApi({
  reducerPath: 'iceCreams',
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchIceCreams: builder.query({
        async queryFn() {
          try {
            const iceCreamsQuerySnapshot = await getDocs(
              collection(db, 'iceCreams')
            );
            const iceCreams = iceCreamsQuerySnapshot.docs.map(doc =>
              doc.data()
            );
            const menuDataQuerySnapshot = await getDocs(
              collection(db, 'menuData')
            );
            const menuData = menuDataQuerySnapshot.docs.map(doc => doc.data());
            const availableStock = iceCreams.filter(
              iceCream =>
                menuData.find(
                  menuItem => menuItem.iceCream.id === iceCream.id
                ) === undefined
            );

            availableStock.sort((a, b) => {
              if (b.name < a.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });

            return { data: availableStock };
          } catch (error) {
            return { error };
          }
        },
      }),
      fetchIceCream: builder.query({
        async queryFn(id) {
          try {
            const iceCreamsQuerySnapshot = await getDocs(
              collection(db, 'iceCreams')
            );
            const iceCreams = iceCreamsQuerySnapshot.docs.map(doc =>
              doc.data()
            );
            const menuDataQuerySnapshot = await getDocs(
              collection(db, 'menuData')
            );
            const menuData = menuDataQuerySnapshot.docs.map(doc => doc.data());
            const availableStock = iceCreams.filter(
              iceCream =>
                menuData.find(
                  menuItem => menuItem.iceCream.id === iceCream.id
                ) === undefined
            );
            const iceCream = availableStock.find(
              iceCream => iceCream.id === parseInt(id, 10)
            );

            return { data: iceCream };
          } catch (error) {
            return { error };
          }
        },
      }),
    };
  },
});

export const { useFetchIceCreamsQuery, useFetchIceCreamQuery } = iceCreamsApi;
export { iceCreamsApi };
