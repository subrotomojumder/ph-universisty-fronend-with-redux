import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const defaultValues = {
    id: "A-0001",
    password: "admin1234",
  };
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("loading....");
    try {
      const res = await login(data).unwrap();
      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ minHeight: "100vh" }}>
      <PHForm
        onSubmit={onSubmit}
        // defaultValues={defaultValues}
      >
        <PHInput type={"text"} name={"id"} label={"User ID :"} />
        <PHInput type={"text"} name={"password"} label={"Password :"} />
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </PHForm>
    </Row>
  );
};

export default Login;
