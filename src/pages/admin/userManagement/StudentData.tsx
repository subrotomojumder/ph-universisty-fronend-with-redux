import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";
import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../components/ui/ConfirmationModal";

type TTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNo">;
const StudentData = () => {
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [params, setParams] = useState<TQueryParam[]>([]);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentQuery([
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const tableData = studentData?.data?.map(
    ({ _id, fullName, email, id, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );
  const metaData = studentData?.meta;

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value: string, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ["descend"],
    },
    {
      title: "Roll No.",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button size="small">Details</Button>
            </Link>
            <Link to={`/admin/student-update/${item.key}`}>
              <Button size="small">Update</Button>
            </Link>
            <Button onClick={() => setIsBlockModalOpen(true)} size="small">
              Block
            </Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      console.log(filters);
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });
      setParams(queryParams);
    }
    // console.log({
    //   //  pagination,
    //     filters,
    //   //   sorter,
    //   extra}
    // );
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        current={page}
        defaultCurrent={1}
        showSizeChanger
        onShowSizeChange={(current, pageSize) => {
          setPage(current);
          setLimit(pageSize);
        }}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
      <ConfirmationModal
        isModalOpen={isBlockModalOpen}
        setIsModalOpen={setIsBlockModalOpen}
      />
    </div>
  );
};

export default StudentData;
