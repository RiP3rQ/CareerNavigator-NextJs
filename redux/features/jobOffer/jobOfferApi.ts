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
    getAllJobOffers: builder.query({
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
  }),
  overrideExisting: false,
});

export const {
  useCreateJobOfferMutation,
  useGetAllJobOffersQuery,
  useGetSingleJobOfferQuery,
} = jobOfferApi;
