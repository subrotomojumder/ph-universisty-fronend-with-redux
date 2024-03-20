import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { Button, Col,  Flex} from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { semesterStatusOptions } from "../../../constants/semester";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/CourseManagement.api";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [semesterRegistration] = useAddRegisteredSemesterMutation();
  const { data: academicSemesters, isLoading: dIsLoading } =
    useGetAllAcademicSemesterQuery([{ name: "sort", value: "year" }]);
  const academicSemesterOptions = academicSemesters?.data?.map((item) => ({
    label: `${item.name} ${item.year}`,
    value: item._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    try {
      const res = (await semesterRegistration(semesterData)) as TResponse<any>;
      //   console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Registration Successful!", { id: toastId });
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
          <PHSelect
            name="academicSemester"
            label="Academic Semester"
            options={academicSemesterOptions}
          />
          <PHSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker label="Stat Date" name="startDate" />
          <PHDatePicker label="End Date" name="endDate" />
          <PHInput type="text" label="Min Credit" name="minCredit" />
          <PHInput type="text" label="Max Credit" name="maxCredit" />
          {/* <PHInput type="text" label="Name" name="name" /> */}
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
