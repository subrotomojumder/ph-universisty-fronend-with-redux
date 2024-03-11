import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TAdmin, TResponse } from "../../../types";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";

//   const studentee = {
//     password: "admin1111",
//     admin: {
//       designation: "Admin",
//       name: {
//         firstName: "Subroto",
//         middleName: "Abedin",
//         lastName: "Forhan",
//       },
//       gender: "male",
//       dateOfBirth: "1998-04-24",
//       email: "subrotomojumder03@gmail.com",
//       contactNo: "12356789",
//       emergencyContactNo: "12356789",
//       bloogGroup: "O+",
//       presentAddress: "123 Main St, Cityville",
//       permanentAddress: "456 Oak St, Townsville",
//     },
//   };
const CreateAdmin = () => {
  const [addAdmin] = useAddAdminMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const formData = new FormData();
    const adminData = {
      password: "1212121212",
      admin: { ...data, designation: "Admin" },
    };
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.image);
    try {
      const res = (await addAdmin(formData)) as TResponse<TAdmin[]>;
      //   console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Admin Created!", { id: toastId });
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
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
