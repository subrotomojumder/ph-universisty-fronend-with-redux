import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { TRegisteredSemester } from "../../../types";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/CourseManagement.api";
import moment from "moment";
import { useState } from "react";

const items = [
  { key: "UPCOMING", label: "UPCOMING" },
  { key: "ONGOING", label: "ONGOING" },
  { key: "ENDED", label: "ENDED" },
];

type TTableData = Pick<TRegisteredSemester, "status" | "startDate" | "endDate">;

const RegisteredSemesters = () => {
  const [updateRegisterSemester, {}] = useUpdateRegisteredSemesterMutation();
  const [semesterId, setSemesterId] = useState("");
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);
  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );
  const handleStatusStatus = (data) => {
    console.log(semesterId);
    console.log(data.key);
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateRegisterSemester(updateData);
  };
  const menuProps = {
    items,
    onClick: handleStatusStatus,
  };
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "ONGOING") {
          color = "green";
        } else if (item === "UPCOMING") {
          color = "blue";
        } else if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)} size="small">
              Update
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  //   const onChange: TableProps<TTableData>["onChange"] = (
  //     _pagination,
  //     filters,
  //     _sorter,
  //     extra
  //   ) => {
  //     if (extra.action === "filter") {
  //       console.log(filters);
  //       const queryParams: TQueryParam[] = [];
  //       filters.name?.forEach((item) => {
  //         queryParams.push({ name: "name", value: item });
  //       });
  //       filters.year?.forEach((item) => {
  //         queryParams.push({ name: "year", value: item });
  //       });
  //       setParams(queryParams);
  //     }
  //     // console.log({
  //     //   //  pagination,
  //     //     filters,
  //     //   //   sorter,
  //     //   extra}
  //     // );
  //   };
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

export default RegisteredSemesters;
