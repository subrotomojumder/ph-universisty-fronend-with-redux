import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetMyAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourse.api";

type TCourseAcc = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const [enrollCourse] = useEnrollCourseMutation();
  const { data: offeredCourseData, isLoading } =
    useGetMyAllOfferedCoursesQuery(undefined);
  //   console.log(offeredCourseData);
  const singleObject = offeredCourseData?.data?.reduce(
    (acc: TCourseAcc, item) => {
      const key = item.course.title;
      acc[key] = acc[key] || { courseTitle: key, sections: [] };
      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });
      return acc;
    },
    {}
  );

  const modifiedData = Object.values(singleObject ? singleObject : {});
  //   console.log(modifiedData);
  const handleEnroll = async (id: string) => {
    const enrollData = { offeredCourse: id };
    const res = await enrollCourse(enrollData);
    console.log(res);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!modifiedData.length) {
    return <p>No available course.</p>;
  }
  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item, i) => {
        return (
          <Col key={i} span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section, ci) => {
                return (
                  <Row
                    key={ci}
                    justify={"space-between"}
                    align={"middle"}
                    style={{ borderTop: "solid #d4d4d4 1px", padding: "10px" }}
                  >
                    <Col span={5}>Section : {section.section}</Col>
                    <Col span={5}>
                      Days :
                      {section.days.map((day, di) => (
                        <span key={di}>{day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time : {section.startTime}</Col>
                    <Col span={5}>End Time : {section.endTime}</Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
