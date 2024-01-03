import { apiSlice } from "../api/apiSlice";

export const jobOfferApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createJobOffer: builder.mutation({
      query: ({ data }) => ({
        url: "create-job-offer",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editJobOffer: builder.mutation({
      query: ({ jobOfferId, data }) => ({
        url: `edit-job-offer/${jobOfferId}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteJobOffer: builder.mutation({
      query: ({ jobOfferId }) => ({
        url: `delete-job-offer/${jobOfferId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getAllJobOffers: builder.mutation({
      query: () => ({
        url: "get-all-job-offers",
        method: "GET",
      }),
    }),
    getSingleJobOffer: builder.query({
      query: ({ jobOfferId }) => ({
        url: `get-job-offer/${jobOfferId}`,
        method: "GET",
      }),
    }),
    filterJobOffersBySkills: builder.mutation({
      query: ({ tag }) => ({
        url: `filter-all-job-offer-by-tag/${tag}`,
        method: "GET",
      }),
    }),
    filterJobOffersByTitle: builder.mutation({
      query: ({ title }) => ({
        url: `filter-all-job-offer-by-title/${title}`,
        method: "GET",
      }),
    }),
    applyForJobOffer: builder.mutation({
      query: ({ jobOfferId }) => ({
        url: `apply-for-job-offer/${jobOfferId}`,
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateJobOfferMutation,
  useGetAllJobOffersMutation,
  useGetSingleJobOfferQuery,
  useEditJobOfferMutation,
  useDeleteJobOfferMutation,
  useFilterJobOffersBySkillsMutation,
  useFilterJobOffersByTitleMutation,
  useApplyForJobOfferMutation,
} = jobOfferApi;
