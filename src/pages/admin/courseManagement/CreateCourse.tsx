import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/CourseManagement.api";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses, isLoading: cIsLoading } =
    useGetAllCoursesQuery(undefined);
  const preRequisiteOptions = courses?.data?.map((item) => ({
    label: `${item.title}`,
    value: item._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course create Successful!", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          //   resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput type="text" label="Title" name="title" />
          <PHInput type="text" label="Prefix" name="prefix" />
          <PHInput type="text" label="Code" name="code" />
          <PHInput type="text" label="Credits" name="credits" />
          <PHSelect
            label="Pre Requisite Courses"
            name="preRequisiteCourses"
            mode="multiple"
            disabled={cIsLoading}
            options={preRequisiteOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
