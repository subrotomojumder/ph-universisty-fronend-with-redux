import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourse.api";

const MySchedule = () => {
  const { data: enrolledCourseData, isLoading } =
    useGetAllEnrolledCoursesQuery(undefined);
  return (
    <div>
      {enrolledCourseData?.data?.map((item, i) => (
        <div key={i}>
          <p>title: {item.course.title}</p>
          <p>Section : {item.offeredCourse.section}</p>
          <p>
            Days:
            {item.offeredCourse.days.map((day, inx) => (
              <span key={inx}> {day} </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MySchedule;
