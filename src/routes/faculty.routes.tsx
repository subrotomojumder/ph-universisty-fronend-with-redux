import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Course Management",
    children: [
      {
        name: "My Classes",
        path: "offered-course",
        element: <CreateAdmin />,
      },
    ],
  },
];
