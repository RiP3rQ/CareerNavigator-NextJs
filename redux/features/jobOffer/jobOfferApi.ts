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
  }),
  overrideExisting: false,
});

export const { useCreateJobOfferMutation, useGetAllJobOffersQuery } =
  jobOfferApi;
