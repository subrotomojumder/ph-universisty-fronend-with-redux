// import { NavLink } from "react-router-dom";

// const arr = [1, 2, 4, 5];
// const result = arr.reduce((acc, item) => {
//   acc.push(item);
//   return acc;
// }, []);
// // console.log(result);
// export const admins = [
//   {
//     name: "Dashboard",
//     path: "dashboard",
//     element: "AdminDashboard",
//   },
//   {
//     name: "User Management",
//     children: [
//       {
//         name: "Create Admin",
//         path: "create-admin",
//         element: "CreateAdmin",
//       },
//       {
//         name: "Create Faculty",
//         path: "create-faculty",
//         element: "CreateFaculty",
//       },
//       {
//         name: "Create Student",
//         path: "create-student",
//         element: "CreateStudent",
//       },
//     ],
//   },
// ];

// const newArray = admins.reduce((acc, item) => {
//   if (item.path && item.name) {
//     acc.push({
//       key: item.name,
//       label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//     });
//   }
//   if (item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child)=> ({
//         key: child.name,
//         label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//       }))
//     });
//   }
//   return acc;
// }, []);

// console.log(newArray);
const obj = {
  name: "Mezba",
  role: "admin",
  age: 40,
  greet: () => {
    return "hello this";
  },
};
console.log(JSON.stringify(obj));
