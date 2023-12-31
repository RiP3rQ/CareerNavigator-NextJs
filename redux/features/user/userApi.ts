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
        url: "update-user-password",
        method: "PUT",
        body: { currentPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    updateEducation: builder.mutation({
      query: ({ education }) => ({
        url: "update-user-additional-info",
        method: "PUT",
        body: { education },
        credentials: "include" as const,
      }),
    }),
    deleteEducation: builder.mutation({
      query: ({ educationId }) => ({
        url: `delete-section-in-profile/${educationId}`,
        method: "DELETE",
        body: { section: "education" },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = userApi;
