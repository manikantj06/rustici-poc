const { ScormClient } = require("scormcloud-client");

// ScormCloud API credentials
const APP_ID = "CFEMPE5NBD";
const SECRET_KEY = "tou1MG3iMgHeePjPPhjo52NzK6aplONjz50OWNen";

const COURSE_ID = "JS_SAMPLE_COURSE";
const LEARNER_ID = "JS_SAMPLE_COURSE_LEARNER";
const REGISTRATION_ID = "JS_SAMPLE_COURSclE_REGISTRATION";

async function createNewCourse(req, res) {
  const client = new ScormClient(APP_ID, SECRET_KEY, "write:course");
  const a = await client.uploadCourseVersionAssetFile(
    COURSE_ID,
    1,
    "../employee-health-and-wellness-sample-course-scorm12-0B2a3WZM.zip",
    "/"
  );
  return a;
}

async function updateCourseTitle(req, res) {
  const client = new ScormClient(APP_ID, SECRET_KEY, "write:course");
  const data = await client.setCourseTitle(COURSE_ID, "New Title Edit 1006");
  return res.status(200);
}

async function deleteCourse(req, res) {
  const client = new ScormClient(APP_ID, SECRET_KEY, "delete:course");
  await client.deleteCourse(COURSE_ID);
  res.status(200);
}

module.exports = {
  deleteCourse,
  createNewCourse,
  updateCourseTitle,
};
