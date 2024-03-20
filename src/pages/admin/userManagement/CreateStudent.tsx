import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse, TStudent } from "../../../types";

// const defaultData = {
//   name: {
//     firstName: "I am ",
//     middleName: "Student",
//     lastName: "Number 1",
//   },
//   gender: "male",
//   //   dateOfBirth: "1990-01-01",
//   // email: "student2@gmail.com",
//   contactNo: "1235678",
//   emergencyContactNo: "987-654-3210",
//   bloogGroup: "A+",
//   presentAddress: "123 Main St, Cityville",
//   permanentAddress: "456 Oak St, Townsville",
//   guardian: {
//     fatherName: "James Doe",
//     fatherOccupation: "Engineer",
//     fatherContactNo: "111-222-3333",
//     motherName: "Mary Doe",
//     motherOccupation: "Teacher",
//     motherContactNo: "444-555-6666",
//   },
//   localGuardian: {
//     name: "Alice Johnson",
//     occupation: "Doctor",
//     contactNo: "777-888-9999",
//     address: "789 Pine St, Villageton",
//   },
//   admissionSemester: "65e94b2e090ce4a39dfc9b90",
//   academicDepartment: "65ea0b204d2fe708a1e147ae",
// };

const CreateStudent = () => {
  const [addStudent] = useAddStudentMutation();
  const { data: semesterData, isLoading: sIsLoading } =
    useGetAllAcademicSemesterQuery(undefined);
  const { data: departmentData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined, { skip: sIsLoading });
  const semesterOptions = semesterData?.data?.map((item) => ({
    label: `${item.name} ${item.year} `,
    value: item._id,
  }));
  const departmentOptions = departmentData?.data?.map((item) => ({
    label: `${item.name}`,
    value: item._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const formData = new FormData();
    const studentData = {
      password: "1212121212",
      student: data,
    };
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);
    try {
      const res = (await addStudent(formData)) as TResponse<TStudent[]>;
      // console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Student Created!", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
    // console.log(formData.get("file")); //formData value get w1
    // console.log([...formData.entries()]); //  formData value get w2
    // console.log(Object.fromEntries(formData)); //  formData value get w3
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          // defaultValues={defaultData}
        >
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
                render={({
                  field: { onChange, value, ...field },
                  // fieldState: { error },
                }) => (
                  <Form.Item label={"Picture"}>
                    <Input
                      type={"file"}
                      value={value?.fileName}
                      id={"image"}
                      size="large"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                    {/* {error && (
                      <small style={{ color: "red" }}>{error.message}</small>
                    )} */}
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
          <Divider>Guardian</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Father Name"
                name="guardian.fatherName"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Father Occupation"
                name="guardian.fatherOccupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Father Contact"
                name="guardian.fatherContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Mother Name"
                name="guardian.motherName"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Mother Occupation"
                name="guardian.motherOccupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Mother Contact"
                name="guardian.motherContactNo"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" label="Name" name="localGuardian.name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Occupation"
                name="localGuardian.occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Contact"
                name="localGuardian.contactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                label="Address"
                name="localGuardian.address"
              />
            </Col>
          </Row>
          <Divider>Academic Info</Divider>
          <Row gutter={10}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Admission Semester"
                name="admissionSemester"
                disabled={sIsLoading}
                options={semesterOptions}
              />
            </Col>
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

export default CreateStudent;
