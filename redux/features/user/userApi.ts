import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ name, email }) => ({
        url: "update-profile",
        method: "POST",
        body: { name, email },
        credentials: "include" as const,
      }),
    }),
    updateAvatar: builder.mutation({
      query: ({ avatar }) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ password, password_confirmation }) => ({
        url: "update-password",
        method: "POST",
        body: { password, password_confirmation },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
} = userApi;
