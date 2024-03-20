import { Button, Modal, Table, TableColumnsType } from "antd";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/CourseManagement.api";
import { TCourse } from "../../../types";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TTableData = Pick<TCourse, "title" | "code" | "prefix">;

const Courses = () => {
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);
  const tableData = semesterData?.data?.map(({ _id, title, code, prefix }) => ({
    key: _id,
    title: title,
    prefix,
    code: code,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",

      render: (item) => {
        return <AddFacultyModal courseData={item} />;
      },
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};
const AddFacultyModal = ({
  courseData,
}: {
  courseData: TCourse & { key: string };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addFaculties] = useAssignFacultiesMutation();
  const { data: facultyData, isLoading } = useGetAllFacultiesQuery([]);
  const facultyOptions = facultyData?.data?.map((item) => ({
    label: `${item.fullName}`,
    value: item._id,
  }));
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      courseId: courseData.key,
      data,
    };
    addFaculties(facultyData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            label="Faculties"
            name="faculties"
            mode="multiple"
            disabled={isLoading}
            options={facultyOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};
export default Courses;
