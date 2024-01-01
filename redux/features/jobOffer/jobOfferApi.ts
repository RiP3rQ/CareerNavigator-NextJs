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
  }),
  overrideExisting: false,
});

export const { useCreateJobOfferMutation } = jobOfferApi;
