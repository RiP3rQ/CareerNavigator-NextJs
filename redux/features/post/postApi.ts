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
    getPostById: builder.mutation({
      query: ({ postId }) => ({
        url: `get-post-by-id/${postId}`,
        method: "GET",
      }),
    }),
    editPost: builder.mutation({
      query: ({ data, postId }) => ({
        url: `edit-post/${postId}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePostMutation,
  useGetAllPostsMutation,
  useGetPostByIdMutation,
  useEditPostMutation,
} = postApi;
