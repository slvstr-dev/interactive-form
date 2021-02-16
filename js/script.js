// Focus on name input on page load
const nameInput = document.getElementById("name");

nameInput.focus();

// Add display conditions to other job role input
const otherInput = document.getElementById("other-job-role");
const jobsInput = document.getElementById("title");

otherInput.style.display = "none";

jobsInput.addEventListener("change", (event) => {
    otherInput.style.display =
        event.target.value === "other" ? "inline-block" : "none";
});

// Add display conditions to design & color combinations
const colorInput = document.getElementById("color");
const designInput = document.getElementById("design");

colorInput.disabled = true;

designInput.addEventListener("change", (event) => {
    const colorOptions = colorInput.children;
    const selectedDesign = event.target.value;

    for (let i = 0; i < colorOptions.length; i++) {
        let colorOptionTheme = colorOptions[i].dataset.theme;

        if (selectedDesign === colorOptionTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute("selected", true);
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].removeAttribute("selected");
        }
    }

    colorInput.disabled = false;
});
