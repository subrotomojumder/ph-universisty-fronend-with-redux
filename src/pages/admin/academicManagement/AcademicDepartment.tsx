import { useState } from "react";
import { TAcademicDepartment, TQueryParam } from "../../../types";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table, TableColumnsType } from "antd";

type TTableData = Pick<
  TAcademicDepartment,
  "name" | "academicFaculty" | "createdAt"
>;

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: departmentData,
    isLoading,
    isFetching,
  } = useGetAllAcademicDepartmentQuery(undefined);
  const tableData = departmentData?.data?.map(
    ({ _id, name, createdAt, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
      createdAt: new Date(createdAt).toDateString(),
    })
  );
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
    },
    {
      title: "Faculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Action",
      render: () => {
        return (
          <div>
            <Button size="small">Update</Button>
          </div>
        );
      },
    },
  ];

  //   const onChange: TableProps<TTableData>["onChange"] = (
  //     _pagination,
  //     filters,
  //     _sorter,
  //     extra
  //   ) => {};
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
      />
    </div>
  );
};

export default AcademicDepartment;
