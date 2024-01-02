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
    getAllPosts: builder.mutation({
      query: ({ data }) => ({
        url: "get-all-posts",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePostMutation, useGetAllPostsMutation } = postApi;
