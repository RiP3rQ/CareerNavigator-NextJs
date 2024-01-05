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
        linkedIn,
        github,
      }) => ({
        url: "update-me",
        method: "PUT",
        body: { firstName, lastName, email, bio, website, linkedIn, github },
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
    updateExperience: builder.mutation({
      query: ({ experience }) => ({
        url: "update-user-additional-info",
        method: "PUT",
        body: { experience },
        credentials: "include" as const,
      }),
    }),
    deleteExperience: builder.mutation({
      query: ({ experienceId }) => ({
        url: `delete-section-in-profile/${experienceId}`,
        method: "DELETE",
        body: { section: "experience" },
        credentials: "include" as const,
      }),
    }),
    updateSkills: builder.mutation({
      query: ({ skills }) => ({
        url: "update-user-additional-info",
        method: "PUT",
        body: { skills },
        credentials: "include" as const,
      }),
    }),
    deleteSkills: builder.mutation({
      query: ({ skillId }) => ({
        url: `delete-section-in-profile/${skillId}`,
        method: "DELETE",
        body: { section: "skills" },
        credentials: "include" as const,
      }),
    }),
    updateCV: builder.mutation({
      query: ({ CV }) => ({
        url: "update-user-additional-info",
        method: "PUT",
        body: { CV },
        credentials: "include" as const,
      }),
    }),
    deleteCV: builder.mutation({
      query: () => ({
        url: `delete-section-in-profile/1`, // doesn't matter what we pass here
        method: "DELETE",
        body: { section: "CV" },
        credentials: "include" as const,
      }),
    }),
    getPublicProfile: builder.query({
      query: ({ userId }) => ({
        url: `get-public-profile/${userId}`,
        method: "GET",
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
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useUpdateSkillsMutation,
  useDeleteSkillsMutation,
  useUpdateCVMutation,
  useDeleteCVMutation,
  useGetPublicProfileQuery,
} = userApi;
