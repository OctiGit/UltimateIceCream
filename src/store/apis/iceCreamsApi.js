import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const iceCreamsApi = createApi({
  reducerPath: 'iceCreams',
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchIceCreams: builder.query({
        async queryFn() {
          const { data } = await axios.get('/api/menu/stock-ice-creams');
          data.sort((a, b) => {
            if (b.name < a.name) return -1;
            if (b.name > a.name) return 1;
            return 0;
          });
          return { data };
        },
      }),
      fetchIceCream: builder.query({
        async queryFn(id) {
          try {
            const { data } = await axios.get(
              `/api/menu/stock-ice-creams/${id.toString()}`
            );
            return { data };
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
