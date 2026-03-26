/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api";


export const uploadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUploadFile: build.mutation<any, any>({
      query: (data: any) => {
        return {
          url: `/assets/upload`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Upload"],
    }),
  }),
});

export const { useCreateUploadFileMutation } = uploadApi;
