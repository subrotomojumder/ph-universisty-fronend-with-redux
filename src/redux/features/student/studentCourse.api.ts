import { TQueryParam, TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["offeredCourse"],
    }),
    getAllEnrolledCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/enrolled-courses/my-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data:response.data,
          meta: response.meta,
        };
      },
      providesTags: ["offeredCourse"],
    }),
    enrollCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/enrolled-courses/create-enrolled-course",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["offeredCourse"],
    }),
  }),
});

export const {
  useGetMyAllOfferedCoursesQuery,
  useEnrollCourseMutation,
  useGetAllEnrolledCoursesQuery,
} = studentCourseApi;
