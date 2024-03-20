import {
  TCourse,
  TCourseFaculties,
  TRegisteredSemester,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemesters: builder.query({
      query: () => {
        return {
          url: "/semester-registrations",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TRegisteredSemester[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["semester-registration"],
    }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester-registration"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester-registration"],
    }),
    getAllCourses: builder.query({
      query: () => {
        return {
          url: "/courses",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["courses"],
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    assignFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["courses"],
    }),
    getCourseFaculties: builder.query({
      query: (id) => ({
        url: `/courses/${id}/get-faculties`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TCourseFaculties>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["courses"],
    }),
    createOfferCourse: builder.mutation({
      query: (data) => ({
        url: `/offered-courses/create-offered-course`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAssignFacultiesMutation,
  useGetCourseFacultiesQuery,
  useCreateOfferCourseMutation,
} = courseManagementApi;
