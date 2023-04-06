// Import the module.
const ScormCloud = require("@rusticisoftware/scormcloud-api-v2-client-javascript");
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

async function getAllRegistrations() {
  let client = new ScormClient(APP_ID, SECRET_KEY, "read");
  const registrations = await client.getRegistrations();
  return registrations;
}

async function checkIfRegistrationExists(registrationId) {
  let client = new ScormClient(APP_ID, SECRET_KEY, "read");
  const isAlreadyRegistered = await client.registrationExists(registrationId);
  return isAlreadyRegistered;
}

async function registerUser(user) {
  let client = new ScormClient(APP_ID, SECRET_KEY, "write:registration");
  client.createRegistration(user.registrationId, user.courseId, user.learner);
}

async function deleteRegistration(registrationId) {
  let client = new ScormClient(APP_ID, SECRET_KEY, "write:registration");
  client.deleteRegistration(registrationId);
}

async function getLaunchLink() {
  let client = new ScormClient(APP_ID, SECRET_KEY, "read");
  const isAlreadyRegistered = await checkIfRegistrationExists(REGISTRATION_ID);

  if (!isAlreadyRegistered) {
    await registerUser({
      registrationId: REGISTRATION_ID,
      courseId: COURSE_ID,
      learner,
    });
  }

  const launchLink = await client.createLaunchLink(
    REGISTRATION_ID,
    "google.com"
  );
  return launchLink;
}

module.exports = {
  getAllCourses,
  getLaunchLink,
};
