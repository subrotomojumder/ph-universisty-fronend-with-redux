import { TAcademicSemester, TFaculty } from ".";

export type TRegisteredSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

// export type TPreRequisiteCourse = {
//   course: string;
//   isDeleted: boolean;
// };

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: TCourse[];
  isDeleted: boolean;
  __v: number;
};
export type TCourseFaculties = {
  _id: string;
  course: string;
  faculties: TFaculty[];
  __v: number;
};
