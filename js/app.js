const checkboxes = document.querySelectorAll(".check-progress");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const completeButton = document.getElementById("completeButton");

function calculateProgress() {
    const total = checkboxes.length;
    let checked = 0;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checked++;
        }
    });

    if (total === 0) {
        return 0;
    }

    return Math.round((checked / total) * 100);
}

function updateProgress() {
    const progress = calculateProgress();

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;

    localStorage.setItem("app_attendance_progress", String(progress));

    if (typeof setScormProgress === "function") {
        setScormProgress(progress);
    }
}

function restoreProgress() {
    checkboxes.forEach((checkbox, index) => {
        const value = localStorage.getItem(`check_progress_${index}`);
        checkbox.checked = value === "true";
    });

    updateProgress();
}

checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => {
        localStorage.setItem(`check_progress_${index}`, String(checkbox.checked));
        updateProgress();
    });
});

if (completeButton) {
    completeButton.addEventListener("click", () => {
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = true;
            localStorage.setItem(`check_progress_${index}`, "true");
        });

        updateProgress();

        if (typeof completeScorm === "function") {
            completeScorm();
        }

        alert("Actividad marcada como completada.");
    });
}

restoreProgress();