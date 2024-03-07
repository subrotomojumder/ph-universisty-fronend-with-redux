import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicFaculty, TResponse } from "../../../types";
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/AcademicManagementSchema";
import PHInput from "../../../components/form/PHInput";

const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useAddAcademicFacultyMutation();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      const toastId = toast.loading("Creating...");
      try {
        const res = (await addAcademicFaculty(
          data
        )) as TResponse<TAcademicFaculty[]>;
        if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        } else {
          toast.success("Faculty Created!", { id: toastId });
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
            resolver={zodResolver(academicFacultySchema)}
          >
            <PHInput type="text" label="Name" name="name"/>
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    );
  };

export default CreateAcademicFaculty;