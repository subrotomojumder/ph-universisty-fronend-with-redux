import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TFaculty, TResponse } from "../../../types";

const CreateFaculty = () => {
  const [addFaculty] = useAddFacultyMutation();
  const { data: departmentData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined);
  const departmentOptions = departmentData?.data?.map((item) => ({
    label: `${item.name}`,
    value: item._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const formData = new FormData();
    const facultyData = {
      password: "1212121212",
      faculty: { ...data, designation: "Lecturer" },
    };
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);
    try {
      const res = (await addFaculty(formData)) as TResponse<TFaculty>;
      //   console.log(res);
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
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Info</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="First Name" name="name.firstName" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="Middle Name" name="name.middleName" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="Last Name" name="name.lastName" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect label="Gender" name="gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker label="Date of birth" name="dateOfBirth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Blood Group"
                name="bloogGroup"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label={"Picture"}>
                    <Input
                      type={"file"}
                      value={value?.fileName}
                      id={"image"}
                      size="large"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="email" label="Email" name="email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="Contact" name="contactNo" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Emergency Contact"
                name="emergencyContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Present Address"
                name="presentAddress"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Permanent Address"
                name="permanentAddress"
              />
            </Col>
          </Row>
          <Divider>Academic Info</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Academic Department"
                name="academicDepartment"
                options={departmentOptions}
                disabled={dIsLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
