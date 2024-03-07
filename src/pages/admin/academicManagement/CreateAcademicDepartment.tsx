import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicDepartment, TResponse } from "../../../types";
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/AcademicManagementSchema";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";

const CreateAcademicDepartment = () => {
  const { data: facultyData, isLoading } =
    useGetAllAcademicFacultyQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    try {
      const res = (await addAcademicDepartment(data)) as TResponse<
        TAcademicDepartment[]
      >;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Department Created!", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const facultyOptions = facultyData?.data?.map((faculty) => ({
    label: faculty.name,
    value: faculty._id,
  }));
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput type="text" label="Name" name="name" />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={facultyOptions || []}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
