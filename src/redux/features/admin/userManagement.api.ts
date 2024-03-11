import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["students", "users"],
    }),
    addStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-student",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["students", "users"],
    }),
    addAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-admin",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),
    addFaculty: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-faculty",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentQuery,
  useAddAdminMutation,
  useAddFacultyMutation,
} = userManagementApi;
