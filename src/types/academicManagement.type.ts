export type TAcademicSemester = {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};
export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};
export type TAcademicDepartment = {
  _id: string;
  academicFaculty:  {
    _id: string;
    name: string;
  };
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};
