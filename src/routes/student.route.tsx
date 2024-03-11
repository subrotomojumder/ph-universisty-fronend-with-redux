import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Offered Course",
        path: "offered-course",
        element: <CreateAdmin />,
      },
    ],
  },
];
