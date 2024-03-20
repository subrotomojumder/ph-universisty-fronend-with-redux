import { useParams } from "react-router-dom";
import { useAddMarksMutation, useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourse.api";
import { Button, Modal, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";

const MyStudents = () => {
  const { semesterRegisterId, courseId } = useParams();

  const { data: facultyCourseData, isLoading } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistration", value: semesterRegisterId },
    { name: "course", value: courseId },
  ]);
  const tableData = facultyCourseData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <div>
            <AddMarkModal studentInfo={item} />
          </div>
        );
      },
    },
  ];
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};
const AddMarkModal = ({ studentInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [addMarks] = useAddMarksMutation()
  const handleSubmit: SubmitHandler<FieldValues> =async(data) => {
    const studentMarksData = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };
    // console.log(studentMarksData);
    const res = await addMarks(studentMarksData);
    console.log(res);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Assign Marks</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" label="Class Test 1" name="classTest1" />
          <PHInput type="text" label="Class Test 2" name="classTest2" />
          <PHInput type="text" label="MidTerm" name="midTerm" />
          <PHInput type="text" label="FinalTerm" name="finalTerm" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
