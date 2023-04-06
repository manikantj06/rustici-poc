const ScormCloud = require("@rusticisoftware/scormcloud-api-v2-client-javascript");
const prompt = require("prompt-sync")({ sigint: true });

// ScormCloud API credentials
const APP_ID = "CFEMPE5NBD";
const SECRET_KEY = "tou1MG3iMgHeePjPPhjo52NzK6aplONjz50OWNen";

const COURSE_ID = "JS_SAMPLE_COURSE";
const LEARNER_ID = "JS_SAMPLE_COURSE_LEARNER";
const REGISTRATION_ID = "JS_SAMPLE_COURSclE_REGISTRATION";
const { ScormClient } = require("scormcloud-client");

async function deleteCourse(req, res) {
  const client = new ScormClient(APP_ID, SECRET_KEY, "delete:course");
  await client.deleteCourse(COURSE_ID);
  res.status(200);
}

module.exports = {
  deleteCourse,
};
