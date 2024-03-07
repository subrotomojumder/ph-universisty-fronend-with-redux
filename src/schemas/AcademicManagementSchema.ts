import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "This field is required!" }),
  year: z.string({ required_error: "This field is required!" }),
  startMonth: z.string({ required_error: "This field is required!" }),
  endMonth: z.string({ required_error: "This field is required!" }),
});
export const academicFacultySchema = z.object({
  name: z.string({ required_error: "This field is required!" }),
});
export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "This field is required!" }),
  academicFaculty: z.string({ required_error: "This field is required!" }),
});
