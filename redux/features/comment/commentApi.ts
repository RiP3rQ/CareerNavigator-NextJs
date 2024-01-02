import { apiSlice } from "../api/apiSlice";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: ({ data }) => ({
        url: `create-comment`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editComment: builder.mutation({
      query: ({ commentId, data }) => ({
        url: `edit-comment/${commentId}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllPostComments: builder.mutation({
      query: ({ postId }) => ({
        url: `get-post-comments/${postId}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddCommentMutation,
  useEditCommentMutation,
  useGetAllPostCommentsMutation,
} = commentApi;
