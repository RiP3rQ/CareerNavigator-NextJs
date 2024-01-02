import { apiSlice } from "../api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ data }) => ({
        url: "create-post",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePostMutation } = postApi;
