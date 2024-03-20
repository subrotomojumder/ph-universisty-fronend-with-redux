import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
  credentials: "include", // credentials add for backend cookie set
});
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let results = await baseQuery(args, api, extraOptions);
  if (results.error?.status === 404) {
    toast.error(results.error.data.message);
  }
  if (results.error?.status === 403) {
    toast.error(results.error.data.message);
  }
  if (results.error?.status === 401) {
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    }); // new access token request with cookie refreshToken
    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user: user,
          token: data?.data?.accessToken,
        })
      );
      results = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return results;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: [
    "users",
    "students",
    "academic-semesters",
    "academic-faculties",
    "academic-departments",
    "semester-registration",
    "courses",
    "offeredCourse"
  ],
});
