import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  console.log(studentId);

  return <div>student details:  {studentId}</div>;
};

export default StudentDetails;
