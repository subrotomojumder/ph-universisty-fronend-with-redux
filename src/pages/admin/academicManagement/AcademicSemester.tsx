import { useGetAllAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data, isLoading, isError , error} =
    useGetAllAcademicSemesterQuery(undefined);
  console.log({ data, isLoading, isError , error});
  return <div>academic semester</div>;
};

export default AcademicSemester;
