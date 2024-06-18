// document.addEventListener("DOMContentLoaded", function () {
        //     var startTime = new Date();
        //     pipwerks.SCORM.init();
        //     getUserName();
        //     var suspendData = pipwerks.SCORM.get("cmi.suspend_data");
        //     document.getElementById("suspendData").value = suspendData;
        //     document.getElementById("getCourseStatus").addEventListener("click", getCourseStatus);
        //     document.getElementById("setFinalScore").addEventListener("click", function (event) {
        //         event.preventDefault();
        //         setFinalScore();
        //     });
        //     document.getElementById("setCourseStatus").addEventListener("click", function () {
        //         var selectedStatus = document.getElementById("courseStatusSelect").value;
        //         setCourseStatus(selectedStatus);
        //     });

        //     document.getElementById("getObjectiveStatus").addEventListener("click", function () {
        //         var objectiveId = document.getElementById("objectiveId").value;
        //         var statusElement = "cmi.objectives." + objectiveId + ".status";
        //         var status = pipwerks.SCORM.get(statusElement);
        //         document.getElementById("objectiveStatus").innerHTML = "Objective Status: " + status;
        //     });

        //     function getUserName() {
        //         var userName = pipwerks.SCORM.get("cmi.core.student_name");
        //         document.getElementById("Username").innerHTML = userName;
        //     }

        //     function completeCourse() {
        //         measureUpTime(startTime);
        //         pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
        //         pipwerks.SCORM.set("cmi.core.exit", "normal");
        //         pipwerks.SCORM.quit();
        //     }

        //     function getCourseStatus() {
        //         var status = pipwerks.SCORM.get("cmi.core.lesson_status");
        //         var score = pipwerks.SCORM.get("cmi.core.score.raw");
        //         document.getElementById("courseStatus").innerHTML = 'Status: ' + status;
        //         document.getElementById("courseScore").innerHTML = 'Score: ' + score;
        //     }

        //     function setFinalScore() {
        //         var finalScore = document.getElementById("finalScore").value;
        //         var suspendData = document.getElementById("suspendData").value;
        //         pipwerks.SCORM.set("cmi.core.score.raw", finalScore);
        //         pipwerks.SCORM.set("cmi.suspend_data", suspendData);
        //     }

        //     function setCourseStatus(status) {
        //         pipwerks.SCORM.set("cmi.core.lesson_status", status);
        //         alert("Course status set to " + status); // Provide feedback
        //     }

        //     function measureUpTime(startTime) {
        //         var endTime = new Date();
        //         var timeDiff = endTime - startTime;
        //         var seconds = Math.round(timeDiff / 1000);
        //         pipwerks.SCORM.set("cmi.core.session_time", formatTime(seconds));
        //     }

        //     function formatTime(seconds) {
        //         return new Date(seconds * 1000).toISOString().substr(11, 8);
        //     }
        // });