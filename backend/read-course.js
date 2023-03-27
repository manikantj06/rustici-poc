// Import the module.
const ScormCloud = require("@rusticisoftware/scormcloud-api-v2-client-javascript");
const APP_ID = "CFEMPE5NBD";
const SECRET_KEY = "tou1MG3iMgHeePjPPhjo52NzK6aplONjz50OWNen";

function getAllCourses(callback) {
  function getAllCoursesLogic() {
    const APP_NORMAL =
      ScormCloud.ApiClient.instance.authentications["APP_NORMAL"];
    APP_NORMAL.username = APP_ID;
    APP_NORMAL.password = SECRET_KEY;

    const courseApi = new ScormCloud.CourseApi();
    const courseIdFilter = "";
    const courseSearchOptions = { courseIdFilter: courseIdFilter };
    courseApi.getCourses(courseSearchOptions, function (error, data) {
      if (error) {
        console.log(error.response.text);
        return;
      }

      callback(data.courses);
    });
  }

  getAllCoursesLogic();
}

module.exports = {
  getAllCourses,
};
