import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUser } from '../auth/authSlice';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jobbox-server-cyan.vercel.app' }),
    tagTypes: ['jobbox', 'Job'],
    endpoints: (builder) => ({

        register: builder.mutation({

            query: (data) => ({
                url: '/user',
                method: 'POST',
                body: data
            }),
            //https://redux-toolkit.js.org/rtk-query/api/createApi#onquerystarted
            //instenst data loading-process  ---- 
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {

                    const res = await queryFulfilled;
                    console.log(res);
                    dispatch(getUser(data?.email))

                }
                catch (error) {
                    console.log(error.message);
                }

            }
        }),

        //jobdata

        jobcollection: builder.mutation({

            query: (data) => ({
                url: '/job',
                method: 'POST',
                body: data
            })

        }),

        applyJob: builder.mutation({
            query: (data) => ({
                url: '/apply',
                method: 'PATCH',
                body: data
            }),
            providesTags: ['jobbox']
        }),
        //getJobCollection

        getjobs: builder.query({

            query: () => ({
                url: '/job'
            }),
            providesTags: ['jobbox']

        }),
        //getSpecific job-Collection
        getJobById: builder.query({
            query: (id) => ({
                url: `/job-details/${id}`
            }),
            providesTags: ['Job']
        }),

        //getJobApply--specific user

        getAppliedJobs: builder.query({

            query: (email) => ({

                url: `/applied-jobs/${email}`


            }),
            providesTags: ['jobbox']
        }),
        //set the question in the database 
        questions: builder.mutation({
            query: (data) => ({
                url: '/query',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Job']
        }),
        //question replay-section 
        reply: builder.mutation({
            query: (data) => ({
                url: '/reply',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Job']
        })

    })
});

export const { useRegisterMutation, useJobcollectionMutation, useGetjobsQuery, useGetJobByIdQuery, useApplyJobMutation, useGetAppliedJobsQuery, useQuestionsMutation, useReplyMutation } = apiSlice;