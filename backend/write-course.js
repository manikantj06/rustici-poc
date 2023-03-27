const ScormCloud = require("@rusticisoftware/scormcloud-api-v2-client-javascript");
const fs = require("fs");

const prompt = require("prompt-sync")({ sigint: true });

// ScormCloud API credentials
const APP_ID = "CFEMPE5NBD";
const SECRET_KEY = "tou1MG3iMgHeePjPPhjo52NzK6aplONjz50OWNen";

// Sample values for data
const COURSE_PATH =
  "/Users/manikant/Data/CAW/rustici-poc/backend/employee-health-and-wellness-sample-course-scorm12-0B2a3WZM.zip";
let COURSE_FILE;

const COURSE_ID = "JS_SAMPLE_COURSE";
const LEARNER_ID = "JS_SAMPLE_COURSE_LEARNER";
const REGISTRATION_ID = "JS_SAMPLE_COURSclE_REGISTRATION";

// String used for output formatting
const OUTPUT_BORDER =
  "---------------------------------------------------------\n";

async function createCourseRoot() {
  // Configure HTTP basic authorization: APP_NORMAL
  const APP_NORMAL =
    ScormCloud.ApiClient.instance.authentications["APP_NORMAL"];
  APP_NORMAL.username = APP_ID;
  APP_NORMAL.password = SECRET_KEY;

  createCourse(COURSE_ID, COURSE_FILE, function (courseDetails) {
    console.log("hey");
    // Show details of the newly imported course
    console.log("Newly Imported Course Details: ");
    console.log(courseDetails);

    // Create a registration for the course
    createRegistration(COURSE_ID, LEARNER_ID, REGISTRATION_ID, function () {
      // Create the registration launch link
      buildLaunchLink(REGISTRATION_ID, function (launchLink) {
        // Show the launch link
        console.log(OUTPUT_BORDER);
        console.log(`Launch Link: ${launchLink}`);
        console.log(
          "Navigate to the url above to take the course. " +
            "Hit enter once complete."
          //   : "Click OK on the in-browser prompt once complete.")
        );
        prompt();

        // Get the results for the registration
        getResultForRegistration(
          REGISTRATION_ID,
          function (registrationProgress) {
            // Show details of the registration progress
            console.log(OUTPUT_BORDER);
            console.log("Registration Progress: ");
            console.log(registrationProgress);

            // Get information about all the courses in ScormCloud
            getAllCourses(function (courseList) {
              // Show details of the courses
              console.log(OUTPUT_BORDER);
              console.log("Course List: ");
              courseList.forEach((course) => {
                console.log(course);
              });

              // Get information about all the registrations in ScormCloud
              getAllRegistrations(function (registrationList) {
                // Show details of the registrations
                console.log(OUTPUT_BORDER);
                console.log("Registration List: ");
                registrationList.forEach((registration) => {
                  console.log(registration);
                });

                // Delete all the data created by this sample
                cleanUp(COURSE_ID, REGISTRATION_ID);
              });
            });
          }
        );
      });
    });
  });
}

function logErrorAndCleanUp(error) {
  console.error(error);

  // Delete all the data created by this sample
  cleanUp(COURSE_ID, REGISTRATION_ID);
}

function createCourse(courseId, courseFile, callback) {
  function createCourseLogic() {
    const courseApi = new ScormCloud.CourseApi();
    let jobId;

    // This call will use OAuth with the "write:course" scope
    // if configured.  Otherwise the basic auth credentials will be used
    courseApi.createUploadAndImportCourseJob(
      courseId,
      { file: courseFile },
      function (error, data) {
        if (error) {
          return logErrorAndCleanUp(error.response.text);
        }

        jobId = data.result;

        function getUploadStatus(jobId) {
          // This call will use OAuth with the "read:course" scope
          // if configured.  Otherwise the basic auth credentials will be used
          let interval = setInterval(function () {
            courseApi.getImportJobStatus(jobId, function (error, data) {
              if (error) {
                clearInterval(interval);
                return logErrorAndCleanUp(error.response.text);
              }

              if (
                data.status ==
                ScormCloud.ImportJobResultSchema.StatusEnum.RUNNING
              ) {
                return;
              }

              // If importing has finished (failure or success)
              clearInterval(interval);

              if (
                data.status == ScormCloud.ImportJobResultSchema.StatusEnum.ERROR
              ) {
                return logErrorAndCleanUp(
                  "Course is not properly formatted: " + data.message
                );
              }

              callback(data.importResult.course);
            });
          }, 1000);
        }
        getUploadStatus(jobId);
      }
    );
  }

  // (Optional) Further authenticate via OAuth token access
  // First line is with OAuth, second is without
  // configureOAuth([ "write:course", "read:course" ], createCourseLogic);
  createCourseLogic();
}

function createRegistration(courseId, learnerId, registrationId, callback) {
  function createRegistrationLogic() {
    const registrationApi = new ScormCloud.RegistrationApi();
    const learner = { id: learnerId };
    const registration = {
      courseId: courseId,
      learner: learner,
      registrationId: registrationId,
    };
    registrationApi.createRegistration(registration, {}, function (error) {
      if (error) {
        return logErrorAndCleanUp(error.response.text);
      }

      callback();
    });
  }

  createRegistrationLogic();
}

function buildLaunchLink(registrationId, callback) {
  function buildLaunchLinkLogic() {
    const registrationApi = new ScormCloud.RegistrationApi();
    const settings = { redirectOnExitUrl: "Message" };
    registrationApi.buildRegistrationLaunchLink(
      registrationId,
      settings,
      function (error, data) {
        if (error) {
          return logErrorAndCleanUp(error.response.text);
        }

        callback(data.launchLink);
      }
    );
  }

  buildLaunchLinkLogic();
}

function getResultForRegistration(registrationId, callback) {
  function getResultForRegistrationLogic() {
    const APP_NORMAL =
      ScormCloud.ApiClient.instance.authentications["APP_NORMAL"];
    APP_NORMAL.username = "CFEMPE5NBD";
    APP_NORMAL.password = "tou1MG3iMgHeePjPPhjo52NzK6aplONjz50OWNen";

    const registrationApi = new ScormCloud.RegistrationApi();
    registrationApi.getRegistrationProgress(
      registrationId,
      {},
      function (error, data) {
        if (error) {
          return logErrorAndCleanUp(error.response.text);
        }

        callback(data);
      }
    );
  }

  getResultForRegistrationLogic();
}

function getAllCourses(callback) {
  function getAllCoursesLogic() {
    const courseApi = new ScormCloud.CourseApi();
    const courseList = [];

    function getPaginatedCourses(more) {
      courseApi.getCourses({ more: more }, function (error, data) {
        if (error) {
          return logErrorAndCleanUp(error.response.text);
        }

        courseList.push(...data.courses);

        if (data.more) {
          return getPaginatedCourses(data.more);
        }

        callback(courseList);
      });
    }
    getPaginatedCourses(null);
  }

  getAllCoursesLogic();
}

function getAllRegistrations(callback) {
  function getAllRegistrationsLogic() {
    const registrationApi = new ScormCloud.RegistrationApi();
    const registrationList = [];

    function getPaginatedRegistrations(more) {
      registrationApi.getRegistrations({ more: more }, function (error, data) {
        if (error) {
          return logErrorAndCleanUp(error.response.text);
        }

        registrationList.push(...data.registrations);

        if (data.more) {
          return getPaginatedRegistrations(data.more);
        }

        callback(registrationList);
      });
    }
    getPaginatedRegistrations(null);
  }

  getAllRegistrationsLogic();
}

function cleanUp(courseId, registrationId) {
  function cleanUpLogic() {
    const courseApi = new ScormCloud.CourseApi();
    courseApi.deleteCourse(courseId, function (error) {
      if (error) {
        throw error;
      }
    });

    const registrationApi = new ScormCloud.RegistrationApi();
    registrationApi.deleteRegistration(registrationId, function (error) {
      if (error) {
        throw error;
      }
    });
  }

  cleanUpLogic();
}

COURSE_FILE = fs.createReadStream(COURSE_PATH);

module.exports = {
  createCourseRoot,
};
