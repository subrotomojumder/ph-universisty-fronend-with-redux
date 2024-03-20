import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { TResponse } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    // const toastId = toast.loading("loading....");
    const res = (await changePassword(data)) as TResponse<any>;
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ minHeight: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type={"text"} name={"oldPassword"} label={"Old Password"} />
        <PHInput type={"text"} name={"newPassword"} label={"New Password"} />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
