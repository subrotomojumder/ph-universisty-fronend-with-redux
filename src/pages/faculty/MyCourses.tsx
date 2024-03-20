import { Button, Col, Flex } from "antd";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourse.api";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { data: facultyCourseData } = useGetAllFacultyCoursesQuery(undefined);
  const navigate = useNavigate();
  const semesterOptions =
    facultyCourseData?.data.map((item) => ({
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
      value: item.semesterRegistration._id,
    })) || [];
  const courseOptions =
    facultyCourseData?.data.map((item) => ({
      label: `${item.course.title}`,
      value: item.course._id,
    })) || [];
//   console.log(facultyCourseData);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };
  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={6}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              name="semesterRegistration"
              label="Semester"
              options={semesterOptions}
            />
            <PHSelect name="course" label="Course" options={courseOptions} />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default MyCourses;
