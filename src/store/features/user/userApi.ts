import { baseApi } from "@/store/api";
import { T_ApiResponse } from "@/types";
import { TUser } from "@/types/total-user/userType";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<T_ApiResponse<TUser>, void>({
      query: () => {
        return {
          url: `/users/me`,
        };
      },
      providesTags: ["Users", "User", "auth"],
    }),
    updateUserInfo: builder.mutation<
      T_ApiResponse<TUser>,
      { name: string; profile: string }
    >({
      query: (details) => {
        return {
          url: `/users/update-profile`,
          method: "PATCH",
          body: details,
        };
      },
      invalidatesTags: ["Users", "User", "auth"],
    }),
  }),
});
export const { useGetUserInfoQuery, useUpdateUserInfoMutation } = userApi;
