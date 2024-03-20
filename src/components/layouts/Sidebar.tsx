import { Layout, Menu } from "antd";
import { sidebarItemsGenerators } from "../../utils/sidebarItemsGenerators";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { useAppSelector } from "../../redux/hooks";
import { TUser, selectCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { studentPaths } from "../../routes/student.route";
const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};
const Sidebar = () => {
  const token = useAppSelector(selectCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  let sideBarItems;
  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sideBarItems = sidebarItemsGenerators(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sideBarItems = sidebarItemsGenerators(facultyPaths, userRole.FACULTY);
      break;
    default:
      sideBarItems = sidebarItemsGenerators(studentPaths, userRole.STUDENT);
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", left: "0", top: "0" }}
    >
      <div
        className="demo-logo-vertical"
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sideBarItems}
      />
    </Sider>
  );
};

export default Sidebar;
