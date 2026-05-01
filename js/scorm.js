let scormApi = null;

function findScormApi(windowReference) {
    let attempts = 0;

    while (windowReference && attempts < 10) {
        if (windowReference.API) {
            return windowReference.API;
        }

        attempts++;

        if (windowReference.parent && windowReference.parent !== windowReference) {
            windowReference = windowReference.parent;
        } else {
            break;
        }
    }

    return null;
}

function initializeScorm() {
    scormApi = findScormApi(window);

    if (scormApi) {
        scormApi.LMSInitialize("");
        scormApi.LMSSetValue("cmi.core.lesson_status", "incomplete");
        scormApi.LMSCommit("");
    } else {
        localStorage.setItem("scorm_status", "incomplete");
    }
}

function setScormProgress(percent) {
    const progressValue = String(percent);

    if (scormApi) {
        scormApi.LMSSetValue("cmi.core.score.raw", progressValue);
        scormApi.LMSSetValue("cmi.core.lesson_location", `progress-${progressValue}`);
        scormApi.LMSCommit("");
    } else {
        localStorage.setItem("scorm_progress", progressValue);
    }
}

function completeScorm() {
    if (scormApi) {
        scormApi.LMSSetValue("cmi.core.lesson_status", "completed");
        scormApi.LMSSetValue("cmi.core.score.raw", "100");
        scormApi.LMSCommit("");
    } else {
        localStorage.setItem("scorm_status", "completed");
        localStorage.setItem("scorm_progress", "100");
    }
}

function finishScorm() {
    if (scormApi) {
        scormApi.LMSFinish("");
    }
}

window.addEventListener("load", initializeScorm);
window.addEventListener("beforeunload", finishScorm);