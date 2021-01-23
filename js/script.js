// Step 3
const nameInput = document.getElementById("name");

nameInput.focus();

// Step 4
const otherInput = document.getElementById("other-job-role");
const jobsInput = document.getElementById("title");

otherInput.style.display = "none";

jobsInput.addEventListener("change", (event) => {
    otherInput.style.display =
        event.target.value === "other" ? "inline-block" : "none";
});

// Step 5
const colorInput = document.getElementById("color");
const designInput = document.getElementById("design");

colorInput.disabled = true;

designInput.addEventListener("change", (event) => {
    const selectedDesign = event.target.value;
    const colorOptions = colorInput.querySelectorAll("[data-theme]");

    for (let i = 0; i < colorOptions.length; i++) {
        colorOptions[i].hidden =
            colorOptions[i].dataset.theme !== selectedDesign;
    }

    colorInput.disabled = false;
});
