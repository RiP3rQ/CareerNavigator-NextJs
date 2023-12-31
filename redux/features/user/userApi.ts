import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({
        firstName,
        lastName,
        email,
        bio,
        website,
        linkedin,
        github,
      }) => ({
        url: "update-me",
        method: "PUT",
        body: { firstName, lastName, email, bio, website, linkedin, github },
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
      query: ({ currentPassword, newPassword }) => ({
        url: "update-password",
        method: "POST",
        body: { currentPassword, newPassword },
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
