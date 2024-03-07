import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types";

type TTableData = Pick<TAcademicFaculty, "name" | "createdAt">;
const AcademicFaculty = () => {
  //   const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultyQuery(undefined);
  const tableData = facultyData?.data?.map(({ _id, name, createdAt }) => ({
    key: _id,
    name,
    createdAt: new Date(createdAt).toDateString(),
  }));

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

export default AcademicFaculty;
