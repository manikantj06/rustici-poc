// Import the module.
const ScormCloud = require("@rusticisoftware/scormcloud-api-v2-client-javascript");
const { log } = require("console");
const { ScormClient } = require("scormcloud-client");
const APP_ID = "CFEMPE5NBD";
const SECRET_KEY = "tou1MG3iMgHeePjPPhjo52NzK6aplONjz50OWNen";
const REGISTRATION_ID = "test-register";
const COURSE_ID = "JS_SAMPLE_COURSE";
const LEARNER_ID = "test-learner";

const learner = {
  id: LEARNER_ID,
  email: "m.j@cawstudios.com",
  firstName: "Manikant",
  lastName: "Jha",
};

async function getAllCourses() {
  const client = new ScormClient(APP_ID, SECRET_KEY, "read");
  const course = await client.getCourses();
  return course;
}

async function getLaunchLink() {
  let client = new ScormClient(APP_ID, SECRET_KEY, "write:registration");
  client.deleteRegistration()
  // client = await client.createRegistration(REGISTRATION_ID, COURSE_ID, learner);
  const link = await client.createLaunchLink(APP_ID, "");
  return link;
}

module.exports = {
  getAllCourses,
  getLaunchLink,
};
